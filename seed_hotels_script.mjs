import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DATA_FILE = path.join(__dirname, '..', 'Data Hotel.md');
const FOTO_HOTEL_DIR = path.join(__dirname, '..', 'Foto Hotel');
const SEED_FILE = path.join(__dirname, 'supabase', 'seed_hotels.sql');

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function parsePrice(priceStr) {
  const str = priceStr.toLowerCase();
  const nums = str.replace(/[^\d. -]/g, '').split('-').map(s => {
    let clean = s.replace(/\./g, '').trim();
    return clean ? parseInt(clean) : null;
  }).filter(n => n !== null && !isNaN(n));

  if (nums.length === 0) return { min: 0, max: null };
  if (nums.length === 1) return { min: nums[0], max: nums[0] };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

// Function to find the correct photo folder
function getPhotoDirForHotel(hotelName) {
  const folders = fs.readdirSync(FOTO_HOTEL_DIR).filter(f => fs.statSync(path.join(FOTO_HOTEL_DIR, f)).isDirectory());
  for (const folder of folders) {
    if (hotelName.toLowerCase().includes(folder.toLowerCase())) {
      return folder;
    }
  }
  // Special fallbacks
  if (hotelName.toLowerCase().includes('grand inna daira')) return 'Grand Inna Daira';
  if (hotelName.toLowerCase().includes('swarna dwipa')) return 'Swarna';
  if (hotelName.toLowerCase().includes('zuri')) return 'Zuri';
  if (hotelName.toLowerCase().includes('sintesa')) return 'Sintesa Peninsula';
  return null;
}

async function run() {
  const content = fs.readFileSync(DATA_FILE, 'utf-8');
  
  // Split by "## <number>."
  const blocks = content.split(/\n## \d+\.\s+/).filter(b => b.trim().length > 0);
  
  // The first block is the header, ignore it
  blocks.shift();

  let insertStatements = `
-- ==========================================
-- SEED DATA HOTELS / AKOMODASI
-- Generated automatically
-- ==========================================

-- Hapus data hotel sebelumnya jika ada agar tidak duplikat
DELETE FROM destinations WHERE category = 'akomodasi';

`;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const lines = block.split('\n').map(l => l.trim());
    
    let dest = { 
      name: lines[0].replace(/\*\*/g, '').trim(),
      category: 'akomodasi',
      facilities: [],
      price_min: 0,
      price_max: null,
      lrt: false,
      hidden: false
    };
    
    dest.slug = generateSlug(dest.name);

    let currentSection = '';
    let bintang = '';
    let checkIn = '';
    let checkOut = '';
    let telepon = '';
    
    for (const line of lines) {
      if (line.startsWith('###')) {
        currentSection = line.replace(/#/g, '').trim().toLowerCase();
        continue;
      }
      
      // Informasi Dasar
      if (currentSection.includes('informasi dasar')) {
        if (line.includes('**Bintang**')) {
          bintang = line.split('|')[2].replace(/\*/g, '').trim(); // Gets e.g. "⭐⭐⭐⭐ (4 Bintang)"
        }
        if (line.startsWith('**Deskripsi (ID):**')) dest.descId = line.replace('**Deskripsi (ID):**', '').trim();
        if (line.startsWith('**Description (EN):**')) dest.descEn = line.replace('**Description (EN):**', '').trim();
      }

      // Fasilitas Utama
      if (currentSection.includes('fasilitas utama')) {
        if (line.includes('|') && line.includes('✅')) {
          let facName = line.split('|')[1].trim();
          dest.facilities.push(facName);
        }
      }

      // Operasional & Kontak
      if (currentSection.includes('operasional & kontak')) {
        if (line.includes('**Check-in**')) checkIn = line.split('|')[2].trim();
        if (line.includes('**Check-out**')) checkOut = line.split('|')[2].trim();
        if (line.includes('**Telepon**') || line.includes('**HP / WA**')) {
          telepon = line.split('|')[2].trim();
        }
      }

      // Lokasi & Transportasi
      if (currentSection.includes('lokasi & gps') || currentSection.includes('lokasi & transportasi')) {
        if (line.includes('**Alamat Lengkap**')) dest.address = line.split('|')[2].trim();
        if (line.includes('**Koordinat GPS**')) {
          let coordsStr = line.split('|')[2].replace(/`/g, '').trim();
          let coords = coordsStr.split(',');
          if (coords.length === 2) {
            dest.lat = parseFloat(coords[0].trim());
            dest.lng = parseFloat(coords[1].trim());
          }
        }
        if (line.includes('**Stasiun LRT Terdekat**')) {
          let lrtStr = line.split('|')[2].toLowerCase();
          if (lrtStr.includes('jalan kaki') || lrtStr.includes('berkendara')) {
            dest.lrt = true;
          }
        }
      }

      // Rentang Harga
      if (currentSection.includes('rentang harga')) {
        if (line.includes('**Estimasi Rata-Rata**')) {
          let priceStr = line.split('|')[2].replace(/\*/g, '').trim();
          let prices = parsePrice(priceStr);
          dest.price_min = prices.min;
          dest.price_max = prices.max;
        }
      }
    }

    // Default missing
    if (!dest.descId) dest.descId = 'Deskripsi belum tersedia.';
    if (!dest.descEn) dest.descEn = 'Description not available.';
    if (!dest.lat) dest.lat = -2.99;
    if (!dest.lng) dest.lng = 104.75;

    // Gabungkan info ke deskripsi
    dest.descId = `Bintang: ${bintang} | Check-in: ${checkIn} | Check-out: ${checkOut} | Kontak: ${telepon}\n\n${dest.descId}`;
    dest.descEn = `Stars: ${bintang} | Check-in: ${checkIn} | Check-out: ${checkOut} | Contact: ${telepon}\n\n${dest.descEn}`;

    // Upload Gambar
    let folderName = getPhotoDirForHotel(dest.name);
    let imageUrls = [];

    if (folderName) {
      let hotelPhotoPath = path.join(FOTO_HOTEL_DIR, folderName);
      if (fs.existsSync(hotelPhotoPath)) {
        let images = fs.readdirSync(hotelPhotoPath);
        for (let img of images) {
          let ext = path.extname(img);
          let newFilename = `${dest.slug}-${Date.now()}${ext}`;
          let filePath = path.join(hotelPhotoPath, img);
          let fileData = fs.readFileSync(filePath);
          
          let mime = 'image/jpeg';
          if (ext.toLowerCase() === '.png') mime = 'image/png';
          if (ext.toLowerCase() === '.webp') mime = 'image/webp';

          console.log(`Uploading ${img} for ${dest.name}...`);
          const { data, error } = await supabase.storage
            .from('destination-images')
            .upload(`${dest.slug}/${newFilename}`, fileData, { contentType: mime, upsert: true });

          if (error) {
            console.error(`Error uploading ${img}:`, error.message);
          } else {
            const { data: publicUrlData } = supabase.storage
              .from('destination-images')
              .getPublicUrl(`${dest.slug}/${newFilename}`);
            imageUrls.push(publicUrlData.publicUrl);
          }
        }
      }
    } else {
      console.log(`WARNING: Folder foto untuk hotel ${dest.name} tidak ditemukan.`);
    }

    // SQL Generation
    let facStr = "ARRAY[" + dest.facilities.map(f => `'${f.replace(/'/g, "''")}'`).join(", ") + "]::TEXT[]";
    if (dest.facilities.length === 0) facStr = "ARRAY[]::TEXT[]";

    let imgStr = "ARRAY[" + imageUrls.map(url => `'${url}'`).join(", ") + "]::TEXT[]";
    if (imageUrls.length === 0) imgStr = "ARRAY[]::TEXT[]";

    let pMax = dest.price_max !== null ? dest.price_max : 'NULL';

    insertStatements += `
INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  '${dest.name.replace(/'/g, "''")}',
  '${dest.slug}',
  '${dest.descId.replace(/'/g, "''")}',
  '${dest.descEn.replace(/'/g, "''")}',
  '${dest.category}',
  ${dest.hidden},
  ${dest.lat},
  ${dest.lng},
  ${dest.address ? `'${dest.address.replace(/'/g, "''")}'` : 'NULL'},
  NULL,
  ${dest.price_min},
  ${pMax},
  ${imgStr},
  ${facStr},
  ${dest.lrt}
);
`;
  }

  fs.writeFileSync(SEED_FILE, insertStatements);
  console.log('Seed file created successfully at supabase/seed_hotels.sql');
}

run().catch(console.error);
