
-- ==========================================
-- SEED DATA DESTINATIONS
-- Generated automatically
-- ==========================================

DELETE FROM destinations;


INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Kawasan Benteng Kuto Besak (BKB)',
  'kawasan-benteng-kuto-besak-bkb',
  'Benteng Kuto Besak adalah benteng bersejarah yang terletak di tepi Sungai Musi dan menjadi salah satu ikon kota Palembang. Benteng ini dibangun pada masa Kesultanan Palembang Darussalam dan menjadi pusat pemerintahan pada masanya.',
  'Kuto Besak Fort is a historical fort located on the banks of the Musi River and has become one of the icons of Palembang city. This fort was built during the Palembang Darussalam Sultanate and served as the center of government at that time.',
  'sejarah',
  false,
  -2.9914,
  104.7592,
  'Jalan Sultan Mahmud Badarudin, 19 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30113',
  'Setiap Hari, 08.00 - 21.00 WIB (area dalam), 24 jam (area luar)',
  0,
  5000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/kawasan-benteng-kuto-besak-bkb/kawasan-benteng-kuto-besak-bkb-1781439680725.png']::TEXT[],
  ARRAY['Area duduk', 'pedagang kaki lima', 'spot foto', 'area acara']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Jembatan Ampera',
  'jembatan-ampera',
  'Jembatan Ampera adalah ikon utama kota Palembang yang membentang di atas Sungai Musi. Dibangun pada era Orde Lama, jembatan ini awalnya dapat diangkat bagian tengahnya untuk memberi ruang bagi kapal besar yang melintas.',
  'Ampera Bridge is the main icon of Palembang city stretching over the Musi River. Built during the Old Order era, the middle section of this bridge could originally be lifted to make room for large passing ships.',
  'sejarah',
  false,
  -2.9916400715717937,
  104.7634990568582,
  'Kota Palembang, Sumatra Selatan',
  'Setiap Hari, 24 Jam (Jembatan & Area Sekitar)',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/jembatan-ampera/jembatan-ampera-1781439681380.png', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/jembatan-ampera/jembatan-ampera-1781439681545.png']::TEXT[],
  ARRAY['Area foto', 'pedagang kuliner', 'perahu wisata Sungai Musi']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Museum Sultan Mahmud Badaruddin II',
  'museum-sultan-mahmud-badaruddin-ii',
  'Museum Sultan Mahmud Badaruddin II merupakan museum sejarah yang menempati bangunan peninggalan kolonial Belanda di tepi Sungai Musi. Museum ini menyimpan berbagai koleksi tentang Kesultanan Palembang, budaya Melayu, hingga benda bersejarah era kolonial.',
  'Sultan Mahmud Badaruddin II Museum is a historical museum occupying a Dutch colonial heritage building on the banks of the Musi River. This museum stores various collections about the Palembang Sultanate, Malay culture, and colonial-era historical objects.',
  'sejarah',
  false,
  -2.9901637132573136,
  104.76140476566752,
  NULL,
  'Selasa – Minggu, 08.00 - 15.00',
  1000,
  1000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/museum-sultan-mahmud-badaruddin-ii/museum-sultan-mahmud-badaruddin-ii-1781439681996.png']::TEXT[],
  ARRAY['Area parkir', 'pemandu wisata', 'toilet', 'ruang pameran', 'area foto']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Museum Balaputra Dewa',
  'museum-balaputra-dewa',
  'Museum Balaputra Dewa merupakan museum arkeologi dan budaya yang menampilkan berbagai koleksi sejarah Sumatera Selatan. Di dalamnya terdapat koleksi arca batu, prasasti, keramik, tekstil, hingga miniatur rumah adat Limas yang menjadi ikon Palembang.',
  'Balaputra Dewa Museum is an archaeological and cultural museum displaying various historical collections of South Sumatra. Inside, there are collections of stone statues, inscriptions, ceramics, textiles, and a miniature of the traditional Limas house which is an icon of Palembang.',
  'sejarah',
  false,
  -2.9505979234904522,
  104.73030814247701,
  'Sukaramai, Jl. Srijaya No.I, Srijaya, Kec. Alang-Alang Lebar, Kota Palembang, Sumatera Selatan 30151',
  'Selasa – Minggu, 08.00 – 15.30',
  2000,
  5000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/museum-balaputra-dewa/museum-balaputra-dewa-1781439682235.png', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/museum-balaputra-dewa/museum-balaputra-dewa-1781439682447.png']::TEXT[],
  ARRAY['Area parkir', 'pemandu lokal', 'ruang pameran', 'area foto']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Monumen Perjuangan Rakyat (Monpera)',
  'monumen-perjuangan-rakyat-monpera',
  'Monumen Perjuangan Rakyat (Monpera) adalah monumen yang dibangun untuk mengenang perjuangan rakyat Palembang melawan penjajahan. Bangunan dengan bentuk unik ini terletak di pusat kota dan menjadi salah satu landmark penting.',
  'The People''s Struggle Monument (Monpera) is a monument built to commemorate the struggle of the Palembang people against colonialism. This uniquely shaped building is located in the city center and serves as an important landmark.',
  'sejarah',
  false,
  -2.9890638549119433,
  104.76041643993265,
  'Jl. Merdeka No.1, 19 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30113',
  'Setiap Hari, 08.00 – 16.00',
  2000,
  2000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/monumen-perjuangan-rakyat-monpera/monumen-perjuangan-rakyat-monpera-1781439682759.png']::TEXT[],
  ARRAY['Area parkir', 'ruang pameran kecil', 'area foto', 'ruang terbuka']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Kampung Kapitan',
  'kampung-kapitan',
  'Kampung Kapitan merupakan kawasan permukiman tua di tepi Sungai Musi yang dulunya dihuni oleh keturunan Tionghoa. Di sini masih berdiri rumah-rumah panggung kayu dengan arsitektur khas, yang menjadi saksi akulturasi budaya Tionghoa dan Palembang.',
  'Kampung Kapitan is an old residential area on the banks of the Musi River formerly inhabited by Chinese descendants. Wooden stilt houses with distinctive architecture still stand here, serving as witnesses to the acculturation of Chinese and Palembang cultures.',
  'sejarah',
  true,
  -2.994635118979601,
  104.76342872963198,
  'Jl. KH Abdullah Azhari, 7 Ulu, Kecamatan Seberang Ulu I, Kota Palembang, Sumatera Selatan 30111',
  'Setiap Hari, 08.00 – 17.00',
  5000,
  5000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/kampung-kapitan/kampung-kapitan-1781439682932.png']::TEXT[],
  ARRAY['Pemandu lokal', 'area foto', 'akses perahu dari Sungai Musi']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Taman Purbakala Kerajaan Sriwijaya',
  'taman-purbakala-kerajaan-sriwijaya',
  'Taman Purbakala merupakan kawasan yang menyimpan berbagai peninggalan arkeologi dari masa Sriwijaya. Di area ini terdapat sisa-sisa struktur bangunan, arca, dan temuan lain yang menunjukkan kejayaan Palembang di masa lampau.',
  'The Archaeological Park is an area that preserves various archaeological remains from the Srivijaya era. In this area, there are remnants of building structures, statues, and other findings that show the glory of Palembang in the past.',
  'sejarah',
  false,
  -3.01481791722503,
  104.73448256876853,
  'Jl. Syakyakirti, Karang Anyar, Kec. Gandus, Kota Palembang, Sumatera Selatan',
  'Setiap Hari, 08.00 – 18.00',
  5000,
  5000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/taman-purbakala-kerajaan-sriwijaya/taman-purbakala-kerajaan-sriwijaya-1781439683123.png']::TEXT[],
  ARRAY['Area parkir', 'ruang terbuka hijau', 'papan informasi', 'area foto']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Makam Ki Gede Ing Suro',
  'makam-ki-gede-ing-suro',
  'Kompleks pemakaman tokoh pendiri Kesultanan Palembang yang menjadi salah satu situs cagar budaya penting.',
  'The burial complex of the founder of the Palembang Sultanate, which is one of the important cultural heritage sites.',
  'sejarah',
  true,
  -2.977660723899985,
  104.79207226876827,
  'Lorong R.H.Umar No.694, 1 Ilir, Kec. Ilir Tim. II, Kota Palembang, Sumatera Selatan 30111',
  '08:00 - 17:00 WIB',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/makam-ki-gede-ing-suro/makam-ki-gede-ing-suro-1781439683305.jpeg', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/makam-ki-gede-ing-suro/makam-ki-gede-ing-suro-1781439683462.jpg']::TEXT[],
  ARRAY['Area ziarah', 'musala', 'fasilitas wudu', 'area parkir']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Museum AK. Gani',
  'museum-ak-gani',
  'Museum yang didedikasikan untuk menyimpan peninggalan dan memorabilia Pahlawan Nasional dr. A.K. Gani.',
  'A museum dedicated to preserving the heritage and memorabilia of National Hero dr. A.K. Gani.',
  'sejarah',
  true,
  -2.9806,
  104.761,
  'Jl. MP. Mangkunegara No.1F, Suka Maju, Kec. Sako, Kota Palembang, Sumatera Selatan 30961',
  '09:00 - 17:00 WIB (Sabtu, Minggu, dan Senin Tutup)',
  1000,
  2000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/museum-ak-gani/museum-ak-gani-1781439683597.jpg', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/museum-ak-gani/museum-ak-gani-1781439683774.jpg', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/museum-ak-gani/museum-ak-gani-1781439683911.jpg']::TEXT[],
  ARRAY['Ruang diorama', 'koleksi foto', 'toilet']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Lorong Basah Night Culinary Market',
  'lorong-basah-night-culinary-market',
  'Lorong Basah Night Culinary adalah destinasi kuliner malam yang populer di Palembang. Di sepanjang lorong ini berjajar kios dan gerobak yang menjual berbagai makanan, mulai dari kuliner khas Palembang hingga jajanan modern.',
  'Lorong Basah Night Culinary is a popular night culinary destination in Palembang. Along this alley, stalls and carts line up selling various foods, ranging from typical Palembang culinary delights to modern snacks.',
  'kuliner',
  false,
  -2.987273037506015,
  104.76246313705757,
  '16 Ilir, Kec. Ilir Tim. I, Kota Palembang, Sumatera Selatan 30111',
  'Setiap Hari, 18.00 – 02.00',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/lorong-basah-night-culinary-market/lorong-basah-night-culinary-market-1781439684018.png']::TEXT[],
  ARRAY['Area duduk', 'aneka kios makanan', 'spot foto malam hari']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Pempek Candy',
  'pempek-candy',
  'Salah satu merek pempek paling legendaris dan populer di Palembang yang sering dijadikan pusat oleh-oleh.',
  'One of the most legendary and popular pempek brands in Palembang, often visited as a souvenir center.',
  'kuliner',
  false,
  -2.9742027943068847,
  104.75272331930618,
  'Jl. Jend. Sudirman No.149/8, Sungai Pangeran, Kec. Ilir Tim. I, Kota Palembang, Sumatera Selatan 30126',
  '06:30 - 22:00 WIB',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/pempek-candy/pempek-candy-1781439684195.jpg']::TEXT[],
  ARRAY['Ruang makan ber-AC', 'layanan bungkus/paket', 'area parkir', 'toilet']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Kawasan Pasar 16 Ilir',
  'kawasan-pasar-16-ilir',
  'Pusat perdagangan tertua di Palembang yang juga kaya akan jajanan tradisional dan kuliner kaki lima khas Sumatera Selatan.',
  'The oldest trade center in Palembang which is also rich in traditional snacks and typical South Sumatran street food.',
  'kuliner',
  false,
  -2.989151012216657,
  104.76380943993274,
  'Jl. Ps. 16 Ilir, 16 Ilir, Kec. Ilir Tim. I, Kota Palembang, Sumatera Selatan 30111',
  '09:00 - 17:00 WIB',
  0,
  NULL,
  ARRAY[]::TEXT[],
  ARRAY['Kios pedagang', 'jajanan kaki lima', 'akses dekat dermaga']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Pempek Lala 26 Ilir',
  'pempek-lala-26-ilir',
  'Kedai pempek primadona yang berlokasi di Kampung Pempek 26 Ilir, terkenal dengan harga terjangkau dan rasa yang autentik.',
  'A prima donna pempek stall located in the 26 Ilir Pempek Village, famous for its affordable prices and authentic taste.',
  'kuliner',
  false,
  -2.990767555649223,
  104.75500549575456,
  'Jl. Mujahidin No.23, Talang Semut, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30113',
  '08:00 - 20:00 WIB',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/pempek-lala-26-ilir/pempek-lala-26-ilir-1781439684352.webp']::TEXT[],
  ARRAY['Area makan sederhana', 'layanan bawa pulang', 'kasir']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Restoran River Side',
  'restoran-river-side',
  'Restoran hidangan laut dan kuliner Nusantara yang menawarkan pemandangan langsung ke Jembatan Ampera di tepi Sungai Musi.',
  'A seafood and archipelago culinary restaurant offering a direct view of the Ampera Bridge on the banks of the Musi River.',
  'kuliner',
  false,
  -2.9930221129692645,
  104.75893051109708,
  'Kompleks Benteng Kuto Besak, Jl. Palembang Darussalam, 19 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30113',
  '10:00 - 22:00 WIB',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/restoran-river-side/restoran-river-side-1781439684505.jpg', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/restoran-river-side/restoran-river-side-1781439684624.jpg']::TEXT[],
  ARRAY['Area makan tepi sungai', 'ruang VIP', 'musala', 'parkir']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'RM Sri Melayu',
  'rm-sri-melayu',
  'Rumah makan legendaris yang mengkhususkan diri pada masakan tradisional Melayu Palembang, terutama Pindang Patin.',
  'A legendary restaurant specializing in traditional Palembang Malay cuisine, especially Pindang Patin.',
  'kuliner',
  false,
  -2.971844666484414,
  104.72892209390487,
  'Jl. Demang Lebar Daun No.1, Demang Lebar Daun, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan 30137',
  '10:00 - 22:00 WIB',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/rm-sri-melayu/rm-sri-melayu-1781439684785.jpg']::TEXT[],
  ARRAY['Ruang makan luas', 'taman', 'musala', 'area parkir', 'toilet']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Toko Kopi Har',
  'toko-kopi-har',
  'Kedai kopi bersejarah di Palembang yang menyajikan kopi robusta khas dan roti bakar sejak puluhan tahun silam.',
  'A historic coffee shop in Palembang serving signature robusta coffee and toast since decades ago.',
  'kuliner',
  true,
  -2.9621577504927528,
  104.75870145342557,
  'Jl. Mayor Salim Batubara, Sekip Jaya, Kec. Kemuning, Kota Palembang, Sumatera Selatan 30127',
  '08:00 - 20:00 WIB',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/toko-kopi-har/toko-kopi-har-1781439685006.png']::TEXT[],
  ARRAY['Meja makan klasik', 'area merokok', 'kipas angin']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Martabak HAR',
  'martabak-har',
  'Martabak HAR adalah kuliner legendaris khas Palembang perpaduan budaya India dan lokal yang didirikan oleh Haji Abdul Rozak. Berbeda dari martabak biasa, sajian telur ayam atau bebek ini dinikmati dengan siraman kuah kari kental kaya rempah berisi potongan kentang dan daging.',
  'Martabak HAR is a legendary Palembang culinary delight blending Indian and local cultures, founded by Haji Abdul Rozak. Unlike regular martabak, this chicken or duck egg dish is enjoyed with a splash of thick, spiced curry sauce containing chunks of potato and meat.',
  'kuliner',
  false,
  -2.987238887079842,
  104.76074735077935,
  'Jl. Jend. Sudirman No.120/39, 17 Ilir, Kec. Ilir Tim. I, Kota Palembang, Sumatera Selatan 30111',
  '06:00 - 23:45 WIB',
  0,
  37000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/martabak-har/martabak-har-1781439685253.jpg']::TEXT[],
  ARRAY['Ruang makan', 'layanan bungkus', 'kasir', 'area parkir.']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Bayt Al-Quran Al-Akbar',
  'bayt-al-quran-al-akbar',
  'Bayt Al-Quran Al-Akbar dikenal sebagai tempat yang menyimpan Al-Quran raksasa yang diukir pada lembaran kayu. Ukiran ayat-ayat suci yang detail dan megah menjadikannya salah satu destinasi religi paling unik di Palembang.',
  'Bayt Al-Quran Al-Akbar is known as the place that stores a giant Al-Quran carved on wooden sheets. The detailed and majestic carvings of the holy verses make it one of the most unique religious destinations in Palembang.',
  'religi',
  true,
  -3.0112485305671957,
  104.70402331067646,
  'Jl. Moh. Amin, Gandus, Kec. Gandus, Kota Palembang, Sumatera Selatan 30149',
  'Setiap Hari, 09.00 – 17.00',
  15000,
  20000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/bayt-al-quran-al-akbar/bayt-al-quran-al-akbar-1781439685386.png']::TEXT[],
  ARRAY['Area parkir', 'pemandu', 'ruang pameran', 'area foto']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Pulau Kemaro',
  'pulau-kemaro',
  'Pulau Kemaro adalah sebuah pulau kecil di Sungai Musi yang terkenal dengan pagoda sembilan lantai, vihara, dan legenda cinta Tan Bun An dan Siti Fatimah.',
  'Kemaro Island is a small island in the Musi River famous for its nine-story pagoda, vihara, and the love legend of Tan Bun An and Siti Fatimah.',
  'religi',
  false,
  -2.9776252821256746,
  104.81741409520923,
  '1 Ilir, Kec. Ilir Tim. II, Kota Palembang, Sumatera Selatan',
  'Setiap Hari, 09.00 – 19.00',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/pulau-kemaro/pulau-kemaro-1781439685634.png']::TEXT[],
  ARRAY['Vihara', 'pagoda', 'area foto', 'tempat duduk', 'pedagang makanan']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Masjid Agung',
  'masjid-agung',
  'Masjid terbesar di Sumatera Selatan yang arsitekturnya memadukan gaya budaya Indonesia, Tiongkok, dan Eropa.',
  'The largest mosque in South Sumatra whose architecture combines Indonesian, Chinese, and European cultural styles.',
  'religi',
  false,
  -2.987820660963241,
  104.7602029686563,
  'Jl. Jend. Sudirman, 19 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30111',
  '24 Jam',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/masjid-agung/masjid-agung-1781439685817.jpg']::TEXT[],
  ARRAY['Ruang salat utama luas', 'perpustakaan', 'pelataran', 'tempat wudu', 'area parkir']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Masjid Cheng Ho',
  'masjid-cheng-ho',
  'Masjid unik di kawasan Jakabaring yang memadukan arsitektur Islam dengan ornamen khas Tiongkok, didedikasikan untuk Laksamana Cheng Ho.',
  'A unique mosque in Jakabaring combining Islamic architecture with Chinese ornaments, dedicated to Admiral Zheng He.',
  'religi',
  false,
  -3.024288491323015,
  104.78004935300487,
  'Jl. Cheng Ho 1, 15 Ulu, Kecamatan Seberang Ulu I, Kota Palembang, Sumatera Selatan 30267',
  '24 Jam',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/masjid-cheng-ho/masjid-cheng-ho-1781439685943.jpg']::TEXT[],
  ARRAY['Ruang ibadah', 'area parkir', 'tempat wudu', 'toilet']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Masjid Ki Marogan',
  'masjid-ki-marogan',
  'Masjid tertua kedua di Palembang yang dibangun oleh ulama besar Ki Marogan, berlokasi di pertemuan Sungai Musi dan Sungai Ogan.',
  'The second oldest mosque in Palembang built by the great scholar Ki Marogan, located at the confluence of the Musi and Ogan Rivers.',
  'religi',
  true,
  -3.014949796960968,
  104.75000655115385,
  'Jl. Kimarogan, Kertapati, Kec. Kertapati, Kota Palembang, Sumatera Selatan 30421',
  '24 Jam',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/masjid-ki-marogan/masjid-ki-marogan-1781439686101.jpg', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/masjid-ki-marogan/masjid-ki-marogan-1781439686263.jpg']::TEXT[],
  ARRAY['Tempat wudu tepi sungai', 'ruang ibadah kayu klasik', 'area makam']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Bukit Siguntang',
  'bukit-siguntang',
  'Bukit Siguntang adalah bukit bersejarah yang diyakini sebagai salah satu lokasi penting Kerajaan Sriwijaya. Di kawasan ini terdapat makam-makam tokoh yang dihormati, serta beberapa artefak yang berkaitan dengan masa kejayaan Sriwijaya.',
  'Bukit Siguntang is a historical hill believed to be one of the important locations of the Srivijaya Kingdom. In this area, there are tombs of respected figures, as well as several artifacts related to the golden age of Srivijaya.',
  'alam',
  false,
  -2.9955280391051544,
  104.72494006701021,
  NULL,
  'Setiap Hari, 08.00 – 16.00',
  3000,
  5000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/bukit-siguntang/bukit-siguntang-1781439686405.png']::TEXT[],
  ARRAY['Area parkir', 'tangga menuju puncak bukit', 'papan informasi sejarah']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Hutan Wisata Punti Kayu',
  'hutan-wisata-punti-kayu',
  'Taman wisata alam hutan pinus terbesar di tengah Kota Palembang, ideal untuk rekreasi keluarga dan kegiatan luar ruang.',
  'The largest pine forest nature park in the middle of Palembang City, ideal for family recreation and outdoor activities.',
  'alam',
  false,
  -2.9434027446993976,
  104.72884014452893,
  'Jl. Kolonel H. Barlian, Srijaya, Kec. Alang-Alang Lebar, Kota Palembang, Sumatera Selatan 30961',
  '24 Jam',
  25000,
  30000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/hutan-wisata-punti-kayu/hutan-wisata-punti-kayu-1781439686614.webp']::TEXT[],
  ARRAY['Wahana permainan', 'kebun binatang mini', 'spot foto', 'gazebo', 'area parkir']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Kambang Iwak Besak',
  'kambang-iwak-besak',
  'Taman kota dengan danau buatan peninggalan Belanda yang rindang, populer untuk olahraga ringan (jogging) dan bersantai.',
  'A city park with a shady artificial lake left from the Dutch era, popular for light sports (jogging) and relaxing.',
  'alam',
  false,
  -2.9896183550247306,
  104.74646179533302,
  'Jl. Tasik, Talang Semut, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30121',
  '24 Jam',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/kambang-iwak-besak/kambang-iwak-besak-1781439686777.jpg', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/kambang-iwak-besak/kambang-iwak-besak-1781439686937.jpg']::TEXT[],
  ARRAY['Jogging track', 'area bermain anak', 'alat olahraga publik', 'pedagang makanan keliling']::TEXT[],
  false
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Danau OPI',
  'danau-opi',
  'Danau luas di kawasan Jakabaring yang menjadi tempat bersantai warga, menawarkan penyewaan perahu bebek dan kuliner tepi danau.',
  'A large lake in the Jakabaring area serving as a relaxing spot for locals, offering paddle boat rentals and lakeside culinary.',
  'alam',
  false,
  -3.0482266784461136,
  104.78846499533324,
  'OPI Water Fun Jakabaring, Sungai Kedukan, Kec. Rambutan, Kab. Banyuasin, Sumatera Selatan 30967',
  '24 Jam',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/danau-opi/danau-opi-1781439687059.webp', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/danau-opi/danau-opi-1781439687191.webp']::TEXT[],
  ARRAY['Penyewaan perahu bebek', 'kursi santai', 'warung makanan lokal']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Taman Sekanak Lambidaro',
  'taman-sekanak-lambidaro',
  'Ruang terbuka hijau baru di pinggiran sungai yang telah direvitalisasi, menawarkan jalur pedestrian cantik dan suasana asri di tengah kota.',
  'A new green open space on the revitalized riverbanks, offering beautiful pedestrian paths and a lush atmosphere in the middle of the city.',
  'alam',
  true,
  -2.9848006105945193,
  104.7524455815461,
  'Jl. Radial, 26 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30200',
  '24 Jam',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/taman-sekanak-lambidaro/taman-sekanak-lambidaro-1781439687308.jpg', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/taman-sekanak-lambidaro/taman-sekanak-lambidaro-1781439687475.jpg']::TEXT[],
  ARRAY['Jalur pedestrian tepi sungai', 'kursi taman', 'lampu hias malam hari']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Jakabaring Sport City',
  'jakabaring-sport-city',
  'Jakabaring Sport City adalah kompleks olahraga terbesar di Palembang yang menjadi lokasi berbagai event nasional dan internasional. Di dalamnya terdapat stadion sepak bola, arena renang, lintasan atletik, dan berbagai fasilitas olahraga lainnya.',
  'Jakabaring Sport City is the largest sports complex in Palembang which has hosted various national and international events. Inside, there is a football stadium, swimming arena, athletics track, and various other sports facilities.',
  'olahraga',
  false,
  -3.01792045419491,
  104.79193543982133,
  'Jl. Gubernur H. A Bastari, 15 Ulu, Kecamatan Seberang Ulu I, Kota Palembang, Sumatera Selatan 30267',
  'Setiap Hari, 06.00 – 21.00',
  2000,
  2000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/jakabaring-sport-city/jakabaring-sport-city-1781439687625.png', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/jakabaring-sport-city/jakabaring-sport-city-1781439687743.png']::TEXT[],
  ARRAY['Stadion', 'arena renang', 'lintasan atletik', 'danau', 'area jogging']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'OPI Water Fun',
  'opi-water-fun',
  'Taman hiburan air komersial di kawasan Jakabaring yang menawarkan berbagai wahana permainan air dan kolam renang keluarga.',
  'A commercial water theme park in the Jakabaring area offering various water rides and family swimming pools.',
  'olahraga',
  false,
  -3.0356872351289,
  104.78903130882563,
  'Komplek OPI Mall Jl. Gubernur HA. Bastari Jakabaring, Sungai Kedukan, Kec. Rambutan, Kab. Banyuasin, Sumatera Selatan 30967',
  '09:00 - 17:00 WIB',
  40000,
  60000,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/opi-water-fun/opi-water-fun-1781439687889.jpg', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/opi-water-fun/opi-water-fun-1781439688200.jpg']::TEXT[],
  ARRAY['Beragam seluncuran air', 'kolam arus', 'ruang ganti', 'penyewaan ban', 'kantin']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Ampera Skate Park',
  'ampera-skate-park',
  'Taman olahraga ekstrem (skateboard dan BMX) yang berlokasi persis di bawah bayang-bayang kemegahan Jembatan Ampera.',
  'An extreme sports park (skateboard and BMX) located right under the shadow of the magnificent Ampera Bridge.',
  'olahraga',
  true,
  -2.9890625406954774,
  104.76154802601977,
  '2Q66+7HW, Jl. Palembang Darussalam, 19 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan 30111',
  '24 Jam',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/ampera-skate-park/ampera-skate-park-1781439688325.jpg', 'https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/ampera-skate-park/ampera-skate-park-1781439688477.jpg']::TEXT[],
  ARRAY['Ramp dan obstacle skate', 'area kumpul komunitas', 'penerangan malam']::TEXT[],
  true
);

INSERT INTO destinations (
  name, slug, description_id, description_en, category, is_hidden_gem,
  latitude, longitude, address, operating_hours, price_min, price_max,
  image_urls, facilities, lrt_accessible
) VALUES (
  'Palembang Sport and Convention Center (PSCC)',
  'palembang-sport-and-convention-center-pscc',
  'Arena olahraga tertutup multifungsi di pusat kota yang biasa digunakan untuk pertandingan voli, basket, dan acara konser.',
  'A multifunctional indoor sports arena in the city center commonly used for volleyball, basketball matches, and concert events.',
  'olahraga',
  false,
  -2.9780941777652603,
  104.74534683639635,
  'Palembang Icon Mall, Lantai Ground, Jl. POM IX No.1, Lorok Pakjo, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan 30137',
  'Menyesuaikan jadwal acara (Event Based)',
  0,
  NULL,
  ARRAY['https://wdvobywuqtmosgnudzap.supabase.co/storage/v1/object/public/destination-images/palembang-sport-and-convention-center-pscc/palembang-sport-and-convention-center-pscc-1781439688589.jpg']::TEXT[],
  ARRAY['Tribun penonton ber-AC', 'lapangan indoor standar internasional', 'area parkir terkoneksi mall']::TEXT[],
  true
);
