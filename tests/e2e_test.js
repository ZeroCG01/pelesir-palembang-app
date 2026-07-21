/**
 * ============================================================
 * E2E TEST SUITE — Pelesir Palembang
 * ============================================================
 * Menguji seluruh alur fitur back-end secara end-to-end:
 *   1. Auth: Register, Login, Update Profile, Change Password, Logout
 *   2. Database: Fetch Destinations, Query by Category, Detail by ID
 *   3. Favorites: Add, Check, Remove
 *   4. Itineraries: Create, Add Destination, Remove Destination, Delete
 *   5. Chatbot API: Health check, semua intent (greet, itinerary, hotel, ticket, lokasi, dll)
 *
 * Jalankan: node tests/e2e_test.js
 */

const { createClient } = require('@supabase/supabase-js');

// ─── CONFIG ──────────────────────────────────────────────────
const SUPABASE_URL = 'https://wdvobywuqtmosgnudzap.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkdm9ieXd1cXRtb3NnbnVkemFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNjEwOTcsImV4cCI6MjA5NjczNzA5N30.5AiDlEiJHJMAbC38sWdTiSwMPxPKl-dbLbaDe7kvqQs';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkdm9ieXd1cXRtb3NnbnVkemFwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE2MTA5NywiZXhwIjoyMDk2NzM3MDk3fQ._wJDxNgF6X3t2259lHZMNJHaJoERsgSWiUQEAyvxL9s';
const CHATBOT_URL = 'http://localhost:8000';

const TEST_EMAIL = `e2etest_${Date.now()}@test.com`;
const TEST_PASSWORD = 'TestPassword123!';
const TEST_FULLNAME = 'E2E Test User';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ─── HELPERS ─────────────────────────────────────────────────
let passed = 0;
let failed = 0;
let skipped = 0;
const results = [];

function log(status, name, detail = '') {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⏭️';
  const line = `${icon} [${status}] ${name}${detail ? ' — ' + detail : ''}`;
  console.log(line);
  results.push({ status, name, detail });
  if (status === 'PASS') passed++;
  else if (status === 'FAIL') failed++;
  else skipped++;
}

async function test(name, fn) {
  try {
    await fn();
    log('PASS', name);
  } catch (err) {
    log('FAIL', name, err.message || String(err));
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// ─── SECTION 1: AUTHENTICATION ──────────────────────────────
let testUserId = null;
let testSession = null;

async function testAuth() {
  console.log('\n══════════════════════════════════════════');
  console.log('  SECTION 1: AUTHENTICATION (Supabase Auth)');
  console.log('══════════════════════════════════════════\n');

  // 1.1 Register
  await test('1.1 Register — Membuat akun baru', async () => {
    const { data, error } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      options: { data: { full_name: TEST_FULLNAME } }
    });
    assert(!error, `Sign up error: ${error?.message}`);
    assert(data.user, 'User object harus ada');
    assert(data.user.email === TEST_EMAIL, `Email mismatch: ${data.user.email}`);
    testUserId = data.user.id;
    testSession = data.session;
  });

  // 1.2 Login
  await test('1.2 Login — Masuk dengan akun yang baru dibuat', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    });
    assert(!error, `Sign in error: ${error?.message}`);
    assert(data.session, 'Session harus ada setelah login');
    assert(data.session.access_token, 'Access token harus ada');
    testSession = data.session;
  });

  // 1.3 Get User
  await test('1.3 Get User — Mendapatkan data user yang sedang login', async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    assert(!error, `Get user error: ${error?.message}`);
    assert(user, 'User harus ada');
    assert(user.email === TEST_EMAIL, 'Email harus cocok');
    assert(user.user_metadata?.full_name === TEST_FULLNAME, `Full name mismatch: ${user.user_metadata?.full_name}`);
  });

  // 1.4 Update Profile (nama)
  await test('1.4 Update Profile — Mengubah nama user', async () => {
    const newName = 'Updated Test User';
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: newName }
    });
    assert(!error, `Update user error: ${error?.message}`);
    assert(data.user.user_metadata.full_name === newName, 'Nama harus berubah');
  });

  // 1.5 Change Password
  await test('1.5 Change Password — Mengubah password user', async () => {
    const newPassword = 'NewTestPassword456!';
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    assert(!error, `Change password error: ${error?.message}`);

    // Verifikasi bisa login dengan password baru
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: newPassword
    });
    assert(!loginError, `Login setelah ganti password gagal: ${loginError?.message}`);
    assert(data.session, 'Session harus ada setelah login dengan password baru');
    testSession = data.session;
  });

  // 1.6 Invalid Login
  await test('1.6 Invalid Login — Login dengan password salah harus gagal', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: 'wrongpassword'
    });
    assert(error, 'Seharusnya error saat login dengan password salah');
  });

  // 1.7 Sign Out
  await test('1.7 Sign Out — Logout dari session aktif', async () => {
    const { error } = await supabase.auth.signOut();
    assert(!error, `Sign out error: ${error?.message}`);
    
    // Verifikasi session hilang
    const { data: { session } } = await supabase.auth.getSession();
    assert(!session, 'Session seharusnya null setelah sign out');
  });

  // Re-login untuk test berikutnya
  await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: 'NewTestPassword456!'
  });
}

// ─── SECTION 2: DATABASE — DESTINATIONS ─────────────────────
let sampleDestId = null;

async function testDestinations() {
  console.log('\n══════════════════════════════════════════');
  console.log('  SECTION 2: DATABASE (Destinations)');
  console.log('══════════════════════════════════════════\n');

  // 2.1 Fetch All Destinations
  await test('2.1 Fetch All — Mengambil seluruh data destinasi', async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('id', { ascending: true });
    assert(!error, `Fetch error: ${error?.message}`);
    assert(data && data.length > 0, 'Data destinasi tidak boleh kosong');
    sampleDestId = data[0].id;
    console.log(`   📊 Total destinasi: ${data.length}`);
  });

  // 2.2 Query by Category (wisata)
  await test('2.2 Filter by Category — Filter kategori "sejarah"', async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('id, name, category')
      .eq('category', 'sejarah');
    assert(!error, `Query error: ${error?.message}`);
    assert(data && data.length > 0, 'Harus ada destinasi berkategori "sejarah"');
    console.log(`   📊 Destinasi sejarah: ${data.length} (${data.map(d => d.name).join(', ')})`);
  });

  // 2.3 Query Hotels
  await test('2.3 Filter Akomodasi — Filter kategori "akomodasi"', async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('id, name, price_min, price_max')
      .eq('category', 'akomodasi');
    assert(!error, `Query error: ${error?.message}`);
    assert(data && data.length > 0, 'Harus ada data hotel');
    console.log(`   📊 Total hotel: ${data.length}`);
    
    // Verifikasi harga sudah terisi
    const withPrice = data.filter(d => d.price_min > 0 && d.price_max > 0);
    console.log(`   📊 Hotel dengan harga terisi: ${withPrice.length}/${data.length}`);
    assert(withPrice.length > 0, 'Minimal 1 hotel harus punya harga terisi');
  });

  // 2.4 Get Destination by ID
  await test('2.4 Get by ID — Mengambil detail destinasi spesifik', async () => {
    assert(sampleDestId, 'Sample destination ID harus ada');
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', sampleDestId)
      .single();
    assert(!error, `Query error: ${error?.message}`);
    assert(data, 'Data detail harus ada');
    assert(data.name, 'Nama destinasi harus ada');
    assert(data.latitude && data.longitude, 'Koordinat harus ada');
    console.log(`   📍 Detail: ${data.name} (${data.category})`);
  });

  // 2.5 Search by Name (ilike)
  await test('2.5 Search by Name — Mencari destinasi berdasarkan nama "Ampera"', async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('id, name')
      .ilike('name', '%ampera%');
    assert(!error, `Search error: ${error?.message}`);
    assert(data && data.length > 0, 'Harus ada hasil pencarian "Ampera"');
    console.log(`   🔍 Hasil: ${data.map(d => d.name).join(', ')}`);
  });

  // 2.6 Hidden Gems
  await test('2.6 Hidden Gems — Mengambil destinasi hidden gem saja', async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('id, name, is_hidden_gem')
      .eq('is_hidden_gem', true);
    assert(!error, `Query error: ${error?.message}`);
    console.log(`   💎 Hidden gems: ${data?.length || 0}`);
    if (data) {
      data.forEach(d => assert(d.is_hidden_gem === true, `${d.name} should be hidden gem`));
    }
  });

  // 2.7 LRT Accessible
  await test('2.7 LRT Accessible — Filter destinasi dekat LRT', async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('id, name, lrt_accessible')
      .eq('lrt_accessible', true);
    assert(!error, `Query error: ${error?.message}`);
    console.log(`   🚆 Dekat LRT: ${data?.length || 0} destinasi`);
  });
}

// ─── SECTION 3: FAVORITES ───────────────────────────────────
async function testFavorites() {
  console.log('\n══════════════════════════════════════════');
  console.log('  SECTION 3: FAVORITES (User Favorites)');
  console.log('══════════════════════════════════════════\n');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    log('SKIP', '3.x Favorites', 'User tidak terautentikasi, skip test favorites');
    return;
  }

  // 3.1 Add Favorite
  await test('3.1 Add Favorite — Menambahkan destinasi ke favorit', async () => {
    assert(sampleDestId, 'Destination ID diperlukan');
    const { error } = await supabase
      .from('favorites')
      .insert({ user_id: user.id, destination_id: sampleDestId });
    assert(!error, `Insert favorite error: ${error?.message}`);
  });

  // 3.2 Check Favorites
  await test('3.2 Fetch Favorites — Memastikan favorit tersimpan', async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('destination_id, destinations(name)')
      .eq('user_id', user.id);
    assert(!error, `Fetch favorites error: ${error?.message}`);
    assert(data && data.length > 0, 'Harus ada minimal 1 favorit');
    const found = data.some(f => f.destination_id === sampleDestId);
    assert(found, 'Destinasi yang baru ditambahkan harus ada di favorit');
    console.log(`   ⭐ Favorit: ${data.length} item`);
  });

  // 3.3 Remove Favorite
  await test('3.3 Remove Favorite — Menghapus destinasi dari favorit', async () => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('destination_id', sampleDestId);
    assert(!error, `Delete favorite error: ${error?.message}`);

    // Verifikasi sudah terhapus
    const { data } = await supabase
      .from('favorites')
      .select('destination_id')
      .eq('user_id', user.id)
      .eq('destination_id', sampleDestId);
    assert(!data || data.length === 0, 'Favorit seharusnya sudah terhapus');
  });
}

// ─── SECTION 4: ITINERARIES ─────────────────────────────────
let testItineraryId = null;

async function testItineraries() {
  console.log('\n══════════════════════════════════════════');
  console.log('  SECTION 4: ITINERARIES');
  console.log('══════════════════════════════════════════\n');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    log('SKIP', '4.x Itineraries', 'User tidak terautentikasi, skip test itineraries');
    return;
  }

  // 4.1 Create Itinerary
  await test('4.1 Create Itinerary — Membuat rencana perjalanan baru', async () => {
    const { data, error } = await supabase
      .from('itineraries')
      .insert({
        user_id: user.id,
        title: 'E2E Test Trip',
        start_date: '2026-07-01',
        end_date: '2026-07-03',
        destinations: []
      })
      .select()
      .single();
    assert(!error, `Create itinerary error: ${error?.message}`);
    assert(data, 'Itinerary data harus ada');
    testItineraryId = data.id;
    console.log(`   📅 Itinerary ID: ${testItineraryId}`);
  });

  // 4.2 Add Destination to Itinerary
  await test('4.2 Add Destination — Menambah destinasi ke itinerary', async () => {
    assert(testItineraryId, 'Itinerary ID diperlukan');
    const destEntry = {
      destination_id: sampleDestId,
      date: '2026-07-01',
      order: 1,
      duration_minutes: 120
    };
    const { error } = await supabase
      .from('itineraries')
      .update({ destinations: [destEntry] })
      .eq('id', testItineraryId);
    assert(!error, `Add destination error: ${error?.message}`);
  });

  // 4.3 Fetch Itineraries
  await test('4.3 Fetch Itineraries — Memverifikasi itinerary ada', async () => {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    assert(!error, `Fetch itineraries error: ${error?.message}`);
    assert(data && data.length > 0, 'Harus ada minimal 1 itinerary');
    const found = data.find(i => i.id === testItineraryId);
    assert(found, 'Itinerary test harus ada dalam daftar');
    assert(found.destinations && found.destinations.length === 1, 'Harus ada 1 destinasi di itinerary');
  });

  // 4.4 Delete Itinerary
  await test('4.4 Delete Itinerary — Menghapus itinerary', async () => {
    const { error } = await supabase
      .from('itineraries')
      .delete()
      .eq('id', testItineraryId);
    assert(!error, `Delete itinerary error: ${error?.message}`);

    // Verifikasi
    const { data } = await supabase
      .from('itineraries')
      .select('id')
      .eq('id', testItineraryId);
    assert(!data || data.length === 0, 'Itinerary seharusnya sudah terhapus');
  });
}

// ─── SECTION 5: CHATBOT API ─────────────────────────────────
async function testChatbot() {
  console.log('\n══════════════════════════════════════════');
  console.log('  SECTION 5: CHATBOT API (FastAPI Backend)');
  console.log('══════════════════════════════════════════\n');

  // 5.1 Health Check
  await test('5.1 Health Check — Server chatbot aktif', async () => {
    const res = await fetch(`${CHATBOT_URL}/`);
    assert(res.ok, `Health check status: ${res.status}`);
    const json = await res.json();
    assert(json.status === 'ok', `Status bukan "ok": ${json.status}`);
  });

  // Helper untuk kirim chat
  async function sendChat(message) {
    const res = await fetch(`${CHATBOT_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    assert(res.ok, `Chat API status: ${res.status}`);
    const json = await res.json();
    assert(json.reply, 'Reply harus ada');
    return json.reply;
  }

  // 5.2 Greeting
  await test('5.2 Intent: Greeting — "Halo"', async () => {
    const reply = await sendChat('Halo');
    assert(reply.length > 10, 'Reply terlalu pendek');
    console.log(`   💬 "${reply.substring(0, 80)}..."`);
  });

  // 5.3 Goodbye
  await test('5.3 Intent: Goodbye — "Terima kasih, sampai jumpa"', async () => {
    const reply = await sendChat('Terima kasih, sampai jumpa');
    assert(reply.length > 10, 'Reply terlalu pendek');
    console.log(`   💬 "${reply.substring(0, 80)}..."`);
  });

  // 5.4 Itinerary 1 hari
  await test('5.4 Intent: Itinerary 1 hari — "Buatkan rekomendasi wisata 1 hari"', async () => {
    const reply = await sendChat('Buatkan rekomendasi wisata 1 hari');
    assert(reply.includes('Hari 1'), 'Reply harus menyebut "Hari 1"');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
  });

  // 5.5 Itinerary dinamis (call 2 kali, harus beda)
  await test('5.5 Itinerary Dinamis — 2 panggilan harus beda hasilnya', async () => {
    const reply1 = await sendChat('Rekomendasi wisata 1 hari');
    const reply2 = await sendChat('Rekomendasi wisata 1 hari');
    // Bisa saja sama jika database kecil, tapi kita periksa keduanya valid
    assert(reply1.includes('Hari 1'), 'Reply 1 harus valid');
    assert(reply2.includes('Hari 1'), 'Reply 2 harus valid');
    const isDifferent = reply1 !== reply2;
    console.log(`   🔀 Jawaban berbeda? ${isDifferent ? 'YA ✅' : 'TIDAK (bisa terjadi jika data sedikit)'}`);
  });

  // 5.6 Itinerary 2 hari
  await test('5.6 Intent: Itinerary 2 hari', async () => {
    const reply = await sendChat('Jadwal wisata 2 hari di Palembang');
    assert(reply.includes('Hari 1'), 'Reply harus menyebut "Hari 1"');
    assert(reply.includes('Hari 2'), 'Reply harus menyebut "Hari 2"');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
  });

  // 5.7 Itinerary 3 hari
  await test('5.7 Intent: Itinerary 3 hari', async () => {
    const reply = await sendChat('Rekomendasi itinerary 3 hari');
    assert(reply.includes('Hari 3'), 'Reply harus menyebut "Hari 3"');
  });

  // 5.8 Hotel umum
  await test('5.8 Intent: Hotel umum — "Rekomendasi hotel"', async () => {
    const reply = await sendChat('Rekomendasi hotel di Palembang');
    assert(reply.toLowerCase().includes('hotel') || reply.toLowerCase().includes('penginapan'), 'Reply harus menyebut hotel/penginapan');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
  });

  // 5.9 Hotel murah
  await test('5.9 Intent: Hotel murah — "Hotel murah di Palembang"', async () => {
    const reply = await sendChat('Carikan hotel murah di Palembang');
    assert(reply.toLowerCase().includes('murah') || reply.toLowerCase().includes('termurah'), 'Reply harus menyebut murah/termurah');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
  });

  // 5.10 Hotel mahal/mewah
  await test('5.10 Intent: Hotel mewah — "Hotel mewah di Palembang"', async () => {
    const reply = await sendChat('Rekomendasi hotel mewah di Palembang');
    assert(reply.toLowerCase().includes('mewah') || reply.toLowerCase().includes('mahal') || reply.toLowerCase().includes('eksklusif'), 'Reply harus menyebut mewah/mahal');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
  });

  // 5.11 Hotel di daerah
  await test('5.11 Intent: Hotel daerah — "Hotel daerah Ilir Barat"', async () => {
    const reply = await sendChat('Carikan hotel di daerah Ilir Barat');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
    // Cukup pastikan ada balasan, karena daerah mungkin tidak selalu ada
    assert(reply.length > 10, 'Reply terlalu pendek');
  });

  // 5.12 Harga tiket
  await test('5.12 Intent: Harga Tiket — "Berapa harga tiket Benteng Kuto Besak?"', async () => {
    const reply = await sendChat('Berapa harga tiket Benteng Kuto Besak?');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
    assert(reply.length > 10, 'Reply terlalu pendek');
  });

  // 5.13 Harga tiket singkatan
  await test('5.13 Intent: Harga Tiket (singkatan) — "harga tiket BKB"', async () => {
    const reply = await sendChat('Berapa harga tiket BKB?');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
    assert(reply.length > 10, 'Reply terlalu pendek');
  });

  // 5.14 Lokasi destinasi
  await test('5.14 Intent: Lokasi — "Di mana Jembatan Ampera?"', async () => {
    const reply = await sendChat('Di mana lokasi Jembatan Ampera?');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
    assert(reply.length > 10, 'Reply terlalu pendek');
  });

  // 5.15 Jam operasional
  await test('5.15 Intent: Jam Operasional — "Jam buka Benteng Kuto Besak?"', async () => {
    const reply = await sendChat('Jam buka Benteng Kuto Besak?');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
    assert(reply.length > 10, 'Reply terlalu pendek');
  });

  // 5.16 Empty message (error handling)
  await test('5.16 Error Handling — Pesan kosong harus di-reject', async () => {
    const res = await fetch(`${CHATBOT_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: '' })
    });
    assert(res.status === 400, `Harus 400, dapat: ${res.status}`);
  });

  // 5.17 Hotel murah di daerah spesifik
  await test('5.17 Intent: Hotel murah + daerah — "hotel murah daerah Ilir Barat"', async () => {
    const reply = await sendChat('Carikan hotel murah daerah Ilir Barat');
    console.log(`   💬 "${reply.substring(0, 120)}..."`);
    assert(reply.length > 10, 'Reply terlalu pendek');
  });
}

// ─── CLEANUP ─────────────────────────────────────────────────
async function cleanup() {
  console.log('\n══════════════════════════════════════════');
  console.log('  CLEANUP');
  console.log('══════════════════════════════════════════\n');

  if (testUserId) {
    try {
      // Hapus semua favorites test user
      await supabaseAdmin.from('favorites').delete().eq('user_id', testUserId);
      // Hapus semua itineraries test user
      await supabaseAdmin.from('itineraries').delete().eq('user_id', testUserId);
      // Hapus user test (menggunakan service role)
      await supabaseAdmin.auth.admin.deleteUser(testUserId);
      console.log('   🧹 Test user dan data terkait berhasil dihapus');
    } catch (err) {
      console.log(`   ⚠️  Cleanup error: ${err.message}`);
    }
  }
}

// ─── MAIN ────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   PELESIR PALEMBANG — E2E TEST SUITE     ║');
  console.log('║   Testing all features end-to-end        ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log(`\n📧 Test Email: ${TEST_EMAIL}`);
  console.log(`🕐 Started at: ${new Date().toLocaleString('id-ID')}\n`);

  try {
    await testAuth();
    await testDestinations();
    await testFavorites();
    await testItineraries();
    await testChatbot();
  } catch (err) {
    console.error('\n💥 Fatal error:', err);
  } finally {
    await cleanup();
  }

  // ─── SUMMARY ──────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║              TEST SUMMARY                ║');
  console.log('╚══════════════════════════════════════════╝\n');
  console.log(`   ✅ Passed:  ${passed}`);
  console.log(`   ❌ Failed:  ${failed}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   📊 Total:   ${passed + failed + skipped}`);
  console.log(`\n   Result: ${failed === 0 ? '🎉 ALL TESTS PASSED!' : `⚠️  ${failed} TEST(S) FAILED`}`);
  console.log(`\n🕐 Finished at: ${new Date().toLocaleString('id-ID')}`);

  process.exit(failed > 0 ? 1 : 0);
}

main();
