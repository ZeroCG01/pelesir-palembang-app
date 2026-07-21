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

const DATA_FILE = path.join(__dirname, '..', 'Data Detail Tempat Wisata Palembang.md');
const IMG_DIR = path.join(__dirname, '..', 'gambar_tempat_wisata');
const SEED_FILE = path.join(__dirname, 'supabase', 'seed.sql');

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function parsePrice(priceStr) {
  const str = priceStr.toLowerCase();
  if (str.includes('gratis') || str.includes('sukarela')) {
    let max = null;
    const nums = str.match(/\d+(\.\d+)?/g);
    if (nums) {
       // if there are prices mentioned alongside gratis
       let vals = nums.map(n => parseInt(n.replace(/\./g, '')));
       max = Math.max(...vals);
       if (max < 100) max *= 1000;
       return { min: 0, max };
    }
    return { min: 0, max: null };
  }
  
  const nums = str.replace(/[^\d. -]/g, '').split('-').map(s => {
    let clean = s.replace(/\./g, '').trim();
    return clean ? parseInt(clean) : null;
  }).filter(n => n !== null && !isNaN(n));

  if (nums.length === 0) return { min: 0, max: null };
  if (nums.length === 1) return { min: nums[0], max: nums[0] };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

async function run() {
  const content = fs.readFileSync(DATA_FILE, 'utf-8');
  
  // Split by numbered list "1. ", "2. ", etc
  const blocks = content.split(/\n\d+\.\s+/).filter(b => b.trim().length > 0);
  
  // Remove the intro block
  blocks.shift();

  let insertStatements = `
-- ==========================================
-- SEED DATA DESTINATIONS
-- Generated automatically
-- ==========================================

DELETE FROM destinations;

`;

  let images = fs.readdirSync(IMG_DIR);

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    
    let dest = { number: i+1 };
    
    // First line is name
    let nameLine = lines[0];
    if (nameLine.includes('**Nama**:')) {
      dest.name = nameLine.replace('**Nama**:', '').trim();
    } else {
      dest.name = nameLine.replace(/\*\*/g, '').trim();
    }
    
    dest.slug = generateSlug(dest.name);

    for (const line of lines) {
      if (line.includes('**Kategori**:')) dest.category = line.replace(/.*?\*\*Kategori\*\*:/, '').trim().toLowerCase();
      if (line.includes('**Deskripsi (ID)**:')) dest.descId = line.replace(/.*?\*\*Deskripsi \(ID\)\*\*:/, '').trim();
      if (line.includes('**Deskripsi (EN)**:')) dest.descEn = line.replace(/.*?\*\*Deskripsi \(EN\)\*\*:/, '').trim();
      if (line.includes('**Koordinat GPS**:')) {
        let coords = line.replace(/.*?\*\*Koordinat GPS\*\*:/, '').trim().split(',');
        if (coords.length === 2) {
          dest.lat = parseFloat(coords[0].trim());
          dest.lng = parseFloat(coords[1].trim());
        }
      }
      if (line.startsWith('- Alamat:')) dest.address = line.replace('- Alamat:', '').trim();
      if (line.includes('**Jam Operasional**:')) dest.hours = line.replace(/.*?\*\*Jam Operasional\*\*:/, '').trim();
      if (line.includes('**Harga Tiket**:')) {
        let rawPrice = line.replace(/.*?\*\*Harga Tiket\*\*:/, '').trim();
        let prices = parsePrice(rawPrice);
        dest.price_min = prices.min;
        dest.price_max = prices.max;
      }
      if (line.includes('**Fasilitas**:')) {
        dest.facilities = line.replace(/.*?\*\*Fasilitas\*\*:/, '').trim().split(',').map(s => s.trim().replace(/^and\s+/i, ''));
      }
      if (line.includes('`lrt_accessible`:')) dest.lrt = line.toUpperCase().includes('TRUE');
      if (line.includes('`is_hidden_gem`:')) dest.hidden = line.toUpperCase().includes('TRUE');
    }

    // Default missing
    if (!dest.category) dest.category = 'sejarah';
    if (!dest.descId) dest.descId = 'Deskripsi belum tersedia.';
    if (!dest.descEn) dest.descEn = 'Description not available.';
    if (!dest.lat) dest.lat = -2.99;
    if (!dest.lng) dest.lng = 104.75;
    if (!dest.facilities) dest.facilities = [];

    // Find images matching the number
    // Look for images starting with `${dest.number}. `
    let destImages = images.filter(img => img.startsWith(`${dest.number}. `));
    
    let imageUrls = [];

    for (let img of destImages) {
      let ext = path.extname(img);
      let newFilename = `${dest.slug}-${Date.now()}${ext}`;
      let filePath = path.join(IMG_DIR, img);
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
  ${dest.hours ? `'${dest.hours.replace(/'/g, "''")}'` : 'NULL'},
  ${dest.price_min},
  ${pMax},
  ${imgStr},
  ${facStr},
  ${dest.lrt}
);
`;
  }

  fs.writeFileSync(SEED_FILE, insertStatements);
  console.log('Seed file created successfully at supabase/seed.sql');
}

run().catch(console.error);
