
-- ==========================================
-- SEED DATA HOTELS / AKOMODASI
-- Generated automatically
-- ==========================================

-- Hapus data hotel sebelumnya jika ada agar tidak duplikat
DELETE FROM destinations WHERE category = 'akomodasi';


INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Novotel Palembang',
  'novotel-palembang',
  'Bintang: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 15:00 | Check-out: 12:00 | Kontak: +62 711 369777

Hotel bintang 4 bergaya modern di jantung kota Palembang, cocok untuk tamu bisnis maupun wisata keluarga. Dilengkapi fasilitas konferensi berkapasitas hingga 2.000 orang, 2 restoran, 4 bar, kolam renang outdoor, fitness center, dan jogging track. Dekat dengan Palembang Trade Center (PTC) dan berjarak hanya 10 menit berkendara menuju padang golf 18 hole.',
  'Stars: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 15:00 | Check-out: 12:00 | Contact: +62 711 369777

A modern 4-star hotel in the heart of Palembang, ideal for business and leisure travelers. Features extensive conference facilities for up to 2,000 guests, two restaurants, four bars, an outdoor pool, fitness center, and jogging track. Conveniently located near Palembang Trade Center (PTC) and walking distance to a shopping mall.',
  'akomodasi',
  false,
  -2.9491287215143074,
  104.76441863766114,
  'Jl. R. Sukamto No. 8A, 8 Ilir, Kec. Ilir Timur II, Palembang, Sumatera Selatan 30127',
  NULL,
  1100000,
  1100000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/novotel-palembang/novotel-palembang-1781881372920.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/novotel-palembang/novotel-palembang-1781881373487.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/novotel-palembang/novotel-palembang-1781881373629.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/novotel-palembang/novotel-palembang-1781881373790.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool (Outdoor)', 'Gym / Fitness Center', 'Jogging Track', 'Breakfast', '24/7 Front Desk', 'Parking', 'Restaurant & Bar', 'Spa & Sauna', 'Meeting / Ballroom', 'Airport Shuttle', 'Room Service']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Aryaduta Palembang',
  'hotel-aryaduta-palembang',
  'Bintang: ⭐⭐⭐⭐ (4–5 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: +62 711 383838

Hotel mewah 18 lantai yang berlokasi strategis tepat di sebelah Palembang Square Mall (mall terbesar di Palembang), serta berdekatan dengan Palembang Indah Mall. Menawarkan 169 kamar premium dengan pemandangan Sungai Musi, dilengkapi spa, kolam renang outdoor, restoran The Kitchen, dan 3 bar. Tamu bisa berjalan kaki ke LRT Stasiun Bumi Sriwijaya.',
  'Stars: ⭐⭐⭐⭐ (4–5 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: +62 711 383838

An upscale 18-floor hotel adjacent to Palembang Square Mall, the city''s largest shopping center, and close to Palembang Indah Mall. Features 169 premium rooms with Musi River views, a full-service spa, outdoor pool, The Kitchen restaurant serving Indonesian and international cuisine, and 3 bars. Walking distance to Bumi Sriwijaya LRT Station.',
  'akomodasi',
  false,
  -2.9771115534460115,
  104.7408740664971,
  'Jl. POM IX, Palembang Square, Kec. Ilir Barat I, Palembang, Sumatera Selatan 30137',
  NULL,
  500000,
  500000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aryaduta-palembang/hotel-aryaduta-palembang-1781881373946.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aryaduta-palembang/hotel-aryaduta-palembang-1781881374113.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aryaduta-palembang/hotel-aryaduta-palembang-1781881374270.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aryaduta-palembang/hotel-aryaduta-palembang-1781881374395.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aryaduta-palembang/hotel-aryaduta-palembang-1781881375511.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool (Outdoor)', 'Gym / Fitness Center', 'Spa & Sauna', 'Breakfast', '24/7 Front Desk', 'Parking', 'Restaurant & Bar', 'Golf Course', 'Meeting / Ballroom', 'Airport Shuttle', 'Room Service']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Excelton Palembang',
  'hotel-excelton-palembang',
  'Bintang: ⭐⭐⭐⭐⭐ (5 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: 0711416609

Hotel bintang 5 modern setinggi 10 lantai yang terletak di kawasan strategis Ilir Barat I, dekat pusat pemerintahan dan pusat perbelanjaan. Dikenal dengan kolam renang di rooftop, sarapan buffet berkualitas tinggi dengan pilihan kuliner khas Palembang, serta interior yang elegan. Berjarak sekitar 5 menit dari stasiun LRT.',
  'Stars: ⭐⭐⭐⭐⭐ (5 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: 0711416609

A modern 5-star 10-floor hotel in Ilir Barat I district, close to government offices and shopping centers. Known for its rooftop swimming pool with panoramic city views, high-quality buffet breakfast featuring local Palembang specialties, and elegant interiors. Approximately 5 minutes from the LRT station.',
  'akomodasi',
  false,
  -2.9705578816530096,
  104.73057289348202,
  'Jl. Demang Lebar Daun No. 58, Demang Lebar Daun, Kec. Ilir Barat I, Palembang, Sumatera Selatan 30137',
  NULL,
  800000,
  800000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-excelton-palembang/hotel-excelton-palembang-1781881375673.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-excelton-palembang/hotel-excelton-palembang-1781881375847.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-excelton-palembang/hotel-excelton-palembang-1781881376033.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-excelton-palembang/hotel-excelton-palembang-1781881376249.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-excelton-palembang/hotel-excelton-palembang-1781881376388.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool (Indoor & Outdoor / Rooftop View)', 'Gym / Fitness Center', 'Spa', 'Breakfast (Buffet)', '24/7 Front Desk', 'Parking', 'Restaurant (Perfecto Restaurant)', 'Poolside Bar', 'Meeting / Club Lounge', 'Airport Shuttle', 'Room Service', 'Concierge']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Grand Inna Daira Palembang',
  'hotel-grand-inna-daira-palembang',
  'Bintang: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: 0711364222

Hotel bintang 4 bersejarah di pusat kota Palembang yang berlokasi tepat di Jalan Sudirman, jantung kawasan bisnis dan pemerintahan. Memiliki 163 kamar, ballroom berkapasitas 800 tamu, dan 9 ruang meeting. Nuansa klasik berpadu layanan ramah khas hotel berbintang. Sangat dekat dengan Stasiun LRT Ampera.',
  'Stars: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: 0711364222

A historic 4-star hotel on Jalan Sudirman, Palembang''s main business and government corridor. Offers 163 rooms, a grand ballroom for up to 800 guests, and 9 meeting rooms. Classic character combined with warm service. Very close to Ampera LRT Station — just 8 minutes on foot.',
  'akomodasi',
  false,
  -2.973393253088339,
  104.7520782241687,
  'Jl. Jenderal Sudirman No. 153–154, Sungai Pangeran, Kec. Ilir Timur I, Palembang, Sumatera Selatan 30126',
  NULL,
  400000,
  400000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-grand-inna-daira-palembang/hotel-grand-inna-daira-palembang-1781881376568.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-grand-inna-daira-palembang/hotel-grand-inna-daira-palembang-1781881376710.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-grand-inna-daira-palembang/hotel-grand-inna-daira-palembang-1781881376878.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-grand-inna-daira-palembang/hotel-grand-inna-daira-palembang-1781881377019.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-grand-inna-daira-palembang/hotel-grand-inna-daira-palembang-1781881377160.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool (Outdoor)', 'Gym / Fitness Center', 'Spa & Sauna', 'Breakfast', '24/7 Front Desk', 'Parking', 'Restaurant & Bar', 'Kids Playground', 'Meeting / Ballroom', 'Airport Shuttle', 'Room Service', 'Karaoke']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Sintesa Peninsula Palembang',
  'hotel-sintesa-peninsula-palembang',
  'Bintang: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: +62 811 787 6087

Hotel bintang 4 kontemporer di kawasan residensial bergengsi Palembang, berjarak 5 menit berkendara dari Palembang Trade Center. Dengan 84 kamar elegan mulai dari Deluxe hingga Presidential Suite, hotel ini cocok untuk tamu bisnis maupun wisata. Dilengkapi Gardenia Coffee Shop, Orchid Lounge, dan 9 ruang pertemuan di lantai 9.',
  'Stars: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: +62 811 787 6087

A contemporary 4-star hotel in a prestigious residential area of Palembang, just a 5-minute drive from Palembang Trade Center. Features 84 elegant rooms from Deluxe to Presidential Suite. Ideal for business and leisure guests, with Gardenia Coffee Shop, Orchid Lounge, and 9 meeting rooms on the 9th floor.',
  'akomodasi',
  false,
  -2.950786621704358,
  104.7838094799894,
  'Jl. H. Abdul Rozak No.168, 2 Ilir, Kec. Ilir Tim. II, Kota Palembang, Sumatera Selatan 30163',
  NULL,
  850000,
  850000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-sintesa-peninsula-palembang/hotel-sintesa-peninsula-palembang-1781881377310.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-sintesa-peninsula-palembang/hotel-sintesa-peninsula-palembang-1781881377468.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-sintesa-peninsula-palembang/hotel-sintesa-peninsula-palembang-1781881377710.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-sintesa-peninsula-palembang/hotel-sintesa-peninsula-palembang-1781881377840.webp']::TEXT[],
  ARRAY['Free WiFi', 'Spa / Massage', 'Breakfast (Buffet)', '24/7 Front Desk', 'Parking', 'Restaurant & Bar', 'Meeting Rooms', 'Airport Shuttle', 'Room Service', 'Concierge & Tour Desk']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Aston Palembang',
  'hotel-aston-palembang',
  'Bintang: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: 082178332807

Hotel bisnis dan konferensi bintang 4 yang berdiri megah di pusat kota Palembang, hanya 240 meter dari Palembang Square. Memiliki 11 lantai dengan interior klasik bernuansa netral, kolam renang outdoor, gym, spa, sauna, dan steam room. Restoran Belido menyajikan masakan Barat dan seafood. Cocok untuk tamu korporat maupun wisatawan.',
  'Stars: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: 082178332807

A stylish 4-star business and conference hotel in Palembang''s city center, just 240 meters from Palembang Square. Features 11 floors with classic neutral interiors, outdoor pool, gym, spa, sauna, and steam rooms. Belido Restaurant offers Western and seafood dishes. Ideal for corporate and leisure travelers alike.',
  'akomodasi',
  false,
  -2.9546909387301445,
  104.74723862601965,
  'Jl. Jend. Basuki Rachmat No.189, Talang Aman, Kec. Kemuning, Kota Palembang, Sumatera Selatan 30126',
  NULL,
  450000,
  450000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aston-palembang/hotel-aston-palembang-1781881377962.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aston-palembang/hotel-aston-palembang-1781881378095.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aston-palembang/hotel-aston-palembang-1781881378221.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aston-palembang/hotel-aston-palembang-1781881378346.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aston-palembang/hotel-aston-palembang-1781881378771.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-aston-palembang/hotel-aston-palembang-1781881379011.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool (2 area)', 'Gym / Fitness Center', 'Spa, Sauna & Steam Room', 'Breakfast', '24/7 Front Desk', 'Parking', 'Restaurant (Belido)', 'Business Center', 'Meeting / Ballroom', 'Airport Shuttle', 'Room Service']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Santika Radial Palembang',
  'hotel-santika-radial-palembang',
  'Bintang: ⭐⭐⭐ (3 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: 07115556655

Hotel bintang 3 modern 16 lantai di kawasan Jalan Radial, pusat kota Palembang. Dikelilingi restoran pempek, pusat perbelanjaan, dan berjarak jalan kaki singkat dari Stasiun LRT Dishub. Restoran Laksa menyajikan sarapan buffet harian dengan menu lokal dan internasional. Cocok untuk tamu bisnis maupun keluarga.',
  'Stars: ⭐⭐⭐ (3 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: 07115556655

A modern 16-floor 3-star hotel on Jalan Radial in Palembang''s city center. Surrounded by pempek restaurants, shopping malls, and a short walk from Dishub LRT Station. Laksa Restaurant offers daily buffet breakfast with local and international menus. Great for business and family travelers.',
  'akomodasi',
  false,
  -2.9809486535960614,
  104.74817077998954,
  'Jl. Brigjen HM Dhani Effendi (Jl. Radial) No. 1688, 24 Ilir, Kec. Bukit Kecil, Palembang, Sumatera Selatan 30127',
  NULL,
  620000,
  620000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-santika-radial-palembang/hotel-santika-radial-palembang-1781881379409.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-santika-radial-palembang/hotel-santika-radial-palembang-1781881379533.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-santika-radial-palembang/hotel-santika-radial-palembang-1781881379679.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-santika-radial-palembang/hotel-santika-radial-palembang-1781881379826.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-santika-radial-palembang/hotel-santika-radial-palembang-1781881380086.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool (Outdoor)', 'Gym / Fitness Center', 'Breakfast (Buffet)', '24/7 Front Desk', 'Parking', 'Restaurant', 'Meeting Rooms', 'Airport Shuttle', 'Room Service', 'Garden']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Harper Palembang',
  'hotel-harper-palembang',
  'Bintang: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: 07116208118

Hotel bintang 4 dengan gaya rustic-modern yang homey, berlokasi di kawasan Jl. R. Sukamto. Menampilkan 163 kamar yang nyaman, rooftop infinity pool dengan pemandangan kota dan Jembatan Ampera, mural Instagramable, sky lounge, dan ballroom berkapasitas 1.600 tamu. Cocok untuk staycation keluarga maupun tamu bisnis.',
  'Stars: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: 07116208118

A 4-star hotel with a rustic-modern, homey character on Jl. R. Sukamto. Features 163 comfortable rooms, a rooftop infinity pool with city and Ampera Bridge views, Instagram-worthy murals, a sky lounge, and a ballroom for up to 1,600 guests. Pet-friendly and perfect for both family staycations and business trips.',
  'akomodasi',
  false,
  -2.9526112510976303,
  104.75738083951201,
  'Jl. R. Sukamto No. 139–140, 8 Ilir, Kec. Ilir Timur I, Palembang, Sumatera Selatan 30114',
  NULL,
  480000,
  480000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-harper-palembang/hotel-harper-palembang-1781881380195.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-harper-palembang/hotel-harper-palembang-1781881380340.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-harper-palembang/hotel-harper-palembang-1781881380482.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-harper-palembang/hotel-harper-palembang-1781881380625.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-harper-palembang/hotel-harper-palembang-1781881380781.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool (Rooftop Infinity)', 'Gym / Fitness Center', 'Breakfast (Buffet)', '24/7 Front Desk', 'Parking', 'Restaurant & Bar / Sky Lounge', 'Meeting / Ballroom', 'Airport Shuttle', 'Room Service', 'Pet Friendly', 'Garden']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Luminor Palembang',
  'hotel-luminor-palembang',
  'Bintang: ⭐⭐⭐⭐ (4 Bintang — versi resmi Traveloka) / ⭐⭐⭐ (3 Bintang — beberapa OTA) | Check-in: 14:00 | Check-out: 12:00 | Kontak: +62 711 371 000

Hotel relatif baru beroperasi November 2022 dengan eksterior bergaya Eropa klasik di Jl. Sudirman, pusat Kota Palembang. Interior modern dengan warna pastel, cocok untuk generasi muda. Menawarkan 7 lantai, restoran all-day dining, dan berbagai tipe kamar hingga Suite Room 74 m². Tidak memiliki kolam renang, namun dekat dengan berbagai pusat perbelanjaan.',
  'Stars: ⭐⭐⭐⭐ (4 Bintang — versi resmi Traveloka) / ⭐⭐⭐ (3 Bintang — beberapa OTA) | Check-in: 14:00 | Check-out: 12:00 | Contact: +62 711 371 000

A relatively new hotel (opened November 2022) with a vintage European-style exterior on Jl. Sudirman. Modern pastel interiors appeal to younger travelers. Features 7 floors, an all-day dining restaurant, and room types up to a 74 m² Suite. No swimming pool, but conveniently close to Palembang Icon Mall and Palembang Square.',
  'akomodasi',
  false,
  -2.9717169970043895,
  104.75107699533287,
  'Jl. Jend. Sudirman No. 1111A, Sungai Pangeran, Kec. Ilir Timur I, Palembang, Sumatera Selatan 30128',
  NULL,
  550000,
  550000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-luminor-palembang/hotel-luminor-palembang-1781881380902.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-luminor-palembang/hotel-luminor-palembang-1781881381067.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-luminor-palembang/hotel-luminor-palembang-1781881381202.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-luminor-palembang/hotel-luminor-palembang-1781881381338.webp']::TEXT[],
  ARRAY['Free WiFi', 'Breakfast (Halal)', '24/7 Front Desk', 'Parking', 'Restaurant (All-Day Dining)', 'Bar', 'Meeting Rooms', 'Airport Shuttle', 'Room Service', 'Concierge']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Batiqa Palembang',
  'hotel-batiqa-palembang',
  'Bintang: ⭐⭐⭐½ (3,5 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: +62 711 5229600

Hotel bisnis bintang 3,5 bergaya desainer di kawasan Ilir Barat I. Berlokasi dekat Kambang Iwak Park, Benteng Kuto Besak, dan Jembatan Ampera. FRESQA Bistro menawarkan menu lokal, internasional, dan hidangan Jepang spesial. Tersedia 160 kamar, fitness center, spa, dan area taman. Sarapan gratis sudah termasuk pada paket tertentu.',
  'Stars: ⭐⭐⭐½ (3,5 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: +62 711 5229600

A designer-styled 3.5-star business hotel in Ilir Barat I, close to Kambang Iwak Park, Benteng Kuto Besak, and Ampera Bridge. FRESQA Bistro offers local, international, and special Japanese cuisine. Features 160 rooms, a fitness center, spa, and garden area. Breakfast included in select room packages.',
  'akomodasi',
  false,
  -2.9844351684353163,
  104.74415429533298,
  'Jl. Kapten A. Rivai No. 219, 26 Ilir D. I, Kec. Ilir Barat I, Palembang, Sumatera Selatan 30121',
  NULL,
  500000,
  500000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-batiqa-palembang/hotel-batiqa-palembang-1781881381466.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-batiqa-palembang/hotel-batiqa-palembang-1781881381615.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-batiqa-palembang/hotel-batiqa-palembang-1781881381751.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-batiqa-palembang/hotel-batiqa-palembang-1781881381892.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-batiqa-palembang/hotel-batiqa-palembang-1781881382013.webp']::TEXT[],
  ARRAY['Free WiFi (in-room)', 'Gym / Fitness Center', 'Spa & Massage', 'Breakfast (Gratis pada paket tertentu)', '24/7 Front Desk', 'Parking', 'Restaurant (FRESQA Bistro)', 'Garden & Terrace', 'Meeting Rooms', 'Airport Shuttle', 'Room Service']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel ibis Palembang Sanggar',
  'hotel-ibis-palembang-sanggar',
  'Bintang: ⭐⭐⭐ (3 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: +62 711 744 6888

Hotel ekonomis bersertifikat Green Key di kawasan Ilir Timur I, hanya 10 menit dari Jembatan Ampera dan 10 menit dari Palembang Indah Mall. Menawarkan 156 kamar modern, restoran all-day dining, infinity pool rooftop dengan pemandangan kota, gym, 8 ruang meeting, dan kids'' club. Berjarak ±9 menit jalan kaki dari stasiun LRT terdekat.',
  'Stars: ⭐⭐⭐ (3 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: +62 711 744 6888

A Green Key certified budget hotel in Ilir Timur I, just 10 minutes from Ampera Bridge and Palembang Indah Mall. Features 156 modern rooms, an all-day dining restaurant, a rooftop infinity pool with city views, gym, 8 meeting rooms, and a kids'' club. Approximately 9 minutes on foot from the nearest LRT station.',
  'akomodasi',
  false,
  -2.982267125333701,
  104.7607046106763,
  'Jl. Letkol Iskandar No. 1, 15 Ilir, Kec. Ilir Timur I, Palembang, Sumatera Selatan 30111',
  NULL,
  500000,
  500000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-ibis-palembang-sanggar/hotel-ibis-palembang-sanggar-1781881382139.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-ibis-palembang-sanggar/hotel-ibis-palembang-sanggar-1781881382286.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-ibis-palembang-sanggar/hotel-ibis-palembang-sanggar-1781881382411.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-ibis-palembang-sanggar/hotel-ibis-palembang-sanggar-1781881382547.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-ibis-palembang-sanggar/hotel-ibis-palembang-sanggar-1781881382695.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool (Rooftop Infinity)', 'Gym / Fitness Center', 'Breakfast (Buffet, Halal)', '24/7 Front Desk', 'Parking', 'Restaurant (ibis Kitchen) & Pool Bar', 'Rooftop / Sunbathing Area', 'Kids'' Club', 'Meeting Rooms (8 ruang)', 'Airport Shuttle', 'Room Service']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Amaris Hotel Palembang',
  'amaris-hotel-palembang',
  'Bintang: ⭐⭐⭐ (3 Bintang — dikategorikan budget/ekonomis) | Check-in: 14:00 | Check-out: 12:00 | Kontak: 07115710999

Hotel budget modern di Jl. Demang Lebar Daun yang terletak strategis antara pusat bisnis dan kawasan residensial Palembang. Dikenal dengan sarapan buffet variatif (termasuk pempek dan laksa khas Palembang), kebersihan kamar yang terjaga, dan aksesibilitas tinggi — sangat dekat dengan Stasiun LRT Demang. Cocok untuk pebisnis maupun backpacker.',
  'Stars: ⭐⭐⭐ (3 Bintang — dikategorikan budget/ekonomis) | Check-in: 14:00 | Check-out: 12:00 | Contact: 07115710999

A modern budget hotel on Jl. Demang Lebar Daun, strategically located between Palembang''s business and residential areas. Known for its varied buffet breakfast (including local Palembang pempek and laksa), clean rooms, and high accessibility — very close to Demang LRT Station. Great for business travelers and backpackers.',
  'akomodasi',
  false,
  -2.962757123079863,
  104.73618412416872,
  'Jl. Demang Lebar Daun No. 1836, 20 Ilir D. IV, Kec. Ilir Timur I, Palembang, Sumatera Selatan 30137',
  NULL,
  340000,
  340000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/amaris-hotel-palembang/amaris-hotel-palembang-1781881383227.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/amaris-hotel-palembang/amaris-hotel-palembang-1781881383386.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/amaris-hotel-palembang/amaris-hotel-palembang-1781881383525.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/amaris-hotel-palembang/amaris-hotel-palembang-1781881383699.webp']::TEXT[],
  ARRAY['Free WiFi (in-room)', 'Breakfast (Buffet)', '24/7 Front Desk', 'Parking', 'Restaurant', 'Terrace', 'Meeting Rooms (8 ruang + Ballroom)', 'Airport Shuttle', 'Concierge & Luggage Storage']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'favehotel Palembang',
  'favehotel-palembang',
  'Bintang: ⭐⭐⭐ (3 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: 07115730000

Hotel bintang 3 bergaya edgy-modern di Jl. Basuki Rachmat, posisi strategis antara Bandara Sultan Mahmud Badaruddin II dan CBD Palembang. Memiliki 163 kamar bersih dengan desain kontemporer, kolam renang outdoor, gym, Lime Restaurant, spa, dan area meeting. Berjarak dekat dengan Stasiun LRT Garuda Dempo (±1,1 km).',
  'Stars: ⭐⭐⭐ (3 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: 07115730000

A 3-star edgy-modern hotel on Jl. Basuki Rachmat, strategically positioned between Sultan Mahmud Badaruddin II Airport and Palembang''s CBD. Features 163 clean contemporary-design rooms, an outdoor pool, gym, Lime Restaurant, spa, and meeting facilities. Close to Garuda Dempo LRT Station (±1.1 km).',
  'akomodasi',
  false,
  -2.955864329191927,
  104.74618977998945,
  'Jl. Jendral Basuki Rachmat No. 1681, RT 15/RW 06, Pahlawan, Kec. Kemuning, Palembang, Sumatera Selatan 30128',
  NULL,
  540000,
  540000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/favehotel-palembang/favehotel-palembang-1781881383886.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/favehotel-palembang/favehotel-palembang-1781881384049.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/favehotel-palembang/favehotel-palembang-1781881384177.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/favehotel-palembang/favehotel-palembang-1781881384320.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/favehotel-palembang/favehotel-palembang-1781881384459.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool (Outdoor)', 'Gym / Fitness Center', 'Spa / Massage', 'Breakfast (Buffet)', '24/7 Front Desk', 'Parking', 'Restaurant & Bar', 'Meeting / Conference Rooms', 'Airport Shuttle', 'Room Service']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hotel Swarna Dwipa Palembang',
  'hotel-swarna-dwipa-palembang',
  'Bintang: ⭐⭐⭐ (3 Bintang) | Check-in: 14:00 | Check-out: 13:00 _(berbeda dari standar)_ | Kontak: 0711313322

Salah satu hotel paling senior di Palembang dengan nuansa klasik 90-an yang nostalgis, berlokasi di Kec. Bukit Kecil tepat di depan Kambang Iwak (taman kota ikonik). Menawarkan 68 kamar, kolam renang, ballroom, dan restoran. Cocok untuk tamu yang menginginkan pengalaman menginap klasik di tengah kota dengan suasana taman kota yang hijau.',
  'Stars: ⭐⭐⭐ (3 Bintang) | Check-in: 14:00 | Check-out: 13:00 _(berbeda dari standar)_ | Contact: 0711313322

One of Palembang''s most established hotels with a nostalgic classic ambiance, located in Bukit Kecil district right in front of Kambang Iwak (the city''s iconic lake park). Offers 68 rooms, a swimming pool, ballroom, and restaurant. Perfect for guests seeking a classic city-center stay with a green park atmosphere.',
  'akomodasi',
  false,
  -2.9903602982484023,
  104.74725790882549,
  'Jl. Tasik No. 2, Kec. Bukit Kecil, Palembang, Sumatera Selatan 30136',
  NULL,
  350000,
  350000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-swarna-dwipa-palembang/hotel-swarna-dwipa-palembang-1781881384607.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-swarna-dwipa-palembang/hotel-swarna-dwipa-palembang-1781881384831.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-swarna-dwipa-palembang/hotel-swarna-dwipa-palembang-1781881384950.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-swarna-dwipa-palembang/hotel-swarna-dwipa-palembang-1781881385105.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hotel-swarna-dwipa-palembang/hotel-swarna-dwipa-palembang-1781881385278.webp']::TEXT[],
  ARRAY['Free WiFi', 'Swimming Pool', 'Breakfast', '24/7 Front Desk', 'Parking', 'Restaurant', 'Ballroom & Meeting Rooms', 'Room Service', 'Laundry']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'The Zuri Palembang',
  'the-zuri-palembang',
  'Bintang: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Kontak: 07115556389

Hotel bintang 4 tertinggi di Palembang (23 lantai) yang terintegrasi langsung dengan Transmart — pusat perbelanjaan dan hiburan terbesar di kawasan Bukit Kecil. Menawarkan 214 kamar modern, infinity pool di lantai 25 (Zuri On Top) dengan panorama kota dan Jembatan Ampera, sky bar & lounge, gym 24 jam, Grand Ballroom 2.000 pax, dan taman bermain indoor terbesar di Sumatera Selatan.',
  'Stars: ⭐⭐⭐⭐ (4 Bintang) | Check-in: 14:00 | Check-out: 12:00 | Contact: 07115556389

Palembang''s tallest 4-star hotel (23 floors), directly integrated with Transmart — the largest shopping and entertainment complex in Bukit Kecil. Features 214 modern rooms, a rooftop infinity pool on the 25th floor (Zuri On Top) with panoramic city and Ampera Bridge views, a sky bar & lounge, 24-hour gym, 2,000-pax Grand Ballroom, and the largest indoor amusement park in South Sumatra at the doorstep.',
  'akomodasi',
  false,
  -2.9824106253503238,
  104.74665291067625,
  'Jl. Radial No. 1371, Area Transmart, 26 Ilir, Kec. Bukit Kecil, Palembang, Sumatera Selatan 30135',
  NULL,
  650000,
  650000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/the-zuri-palembang/the-zuri-palembang-1781881385672.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/the-zuri-palembang/the-zuri-palembang-1781881385820.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/the-zuri-palembang/the-zuri-palembang-1781881385934.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/the-zuri-palembang/the-zuri-palembang-1781881386052.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/the-zuri-palembang/the-zuri-palembang-1781881386208.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/the-zuri-palembang/the-zuri-palembang-1781881386718.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/the-zuri-palembang/the-zuri-palembang-1781881386846.webp']::TEXT[],
  ARRAY['Free WiFi (300 Mbps)', 'Swimming Pool (Rooftop Infinity, Anak)', 'Gym / Fitness Center (24 jam)', 'Spa / Massage', 'Breakfast (Buffet)', '24/7 Front Desk', 'Parking', 'Restaurant & Sky Bar / Lounge', 'Mall On-Site (Transmart)', 'Meeting / Grand Ballroom (2.000 pax)', 'Airport Shuttle', 'Room Service', 'Hair Salon', 'Musholla / Praying Room']::TEXT[],
  true
);
