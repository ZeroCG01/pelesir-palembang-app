-- ==========================================
-- SEED DATA CHATBOT INTENTS
-- ==========================================

DELETE FROM chatbot_intents;

INSERT INTO chatbot_intents (
  intent_name, description_id, description_en, sample_responses_id, sample_responses_en
) VALUES
('greeting', 
 'Menyapa pengguna', 
 'Greeting the user',
 ARRAY['Halo! Selamat datang di Pelesir Palembang. Ada yang bisa saya bantu hari ini?', 'Hai! Mau jalan-jalan ke mana kita di Palembang hari ini?'],
 ARRAY['Hello! Welcome to Pelesir Palembang. How can I help you today?', 'Hi! Where would you like to explore in Palembang today?']
),
('farewell', 
 'Mengucapkan selamat tinggal', 
 'Saying goodbye',
 ARRAY['Sampai jumpa! Semoga harimu menyenangkan di Palembang.', 'Dah! Jangan ragu bertanya lagi jika butuh bantuan wisata.'],
 ARRAY['Goodbye! Have a great day in Palembang.', 'Bye! Feel free to ask if you need more travel tips.']
),
('ask_food_recommendation', 
 'Meminta rekomendasi makanan/kuliner', 
 'Asking for food recommendations',
 ARRAY['Tentu! Kalau ke Palembang wajib coba Pempek Candy atau ke kawasan Lorong Basah Night Culinary.', 'Untuk kuliner, saya sangat merekomendasikan Pempek Lala 26 Ilir atau Pindang Patin di RM Sri Melayu.'],
 ARRAY['Sure! In Palembang, you must try Pempek Candy or visit Lorong Basah Night Culinary.', 'For culinary, I highly recommend Pempek Lala 26 Ilir or Pindang Patin at RM Sri Melayu.']
),
('ask_historical_places', 
 'Meminta rekomendasi tempat sejarah', 
 'Asking for historical places',
 ARRAY['Palembang kaya akan sejarah. Kamu bisa mengunjungi Benteng Kuto Besak (BKB), Museum Balaputra Dewa, atau Monpera.', 'Coba kunjungi Museum Sultan Mahmud Badaruddin II yang dekat dengan Jembatan Ampera!'],
 ARRAY['Palembang is rich in history. You can visit Kuto Besak Fort, Balaputra Dewa Museum, or Monpera.', 'Try visiting Sultan Mahmud Badaruddin II Museum which is close to the Ampera Bridge!']
),
('ask_lrt_access', 
 'Menanyakan destinasi yang bisa diakses LRT', 
 'Asking for LRT accessible destinations',
 ARRAY['Banyak kok! Misalnya Jembatan Ampera, Jakabaring Sport City, dan Pasar 16 Ilir. Semuanya bisa dicapai dengan LRT.', 'Kamu bisa ke Punti Kayu atau OPI Water Fun dengan mudah menggunakan LRT Palembang.'],
 ARRAY['Plenty! For example, Ampera Bridge, Jakabaring Sport City, and 16 Ilir Market. They are all accessible by LRT.', 'You can easily go to Punti Kayu or OPI Water Fun using the Palembang LRT.']
),
('ask_hidden_gem', 
 'Meminta rekomendasi tempat tersembunyi', 
 'Asking for hidden gems',
 ARRAY['Untuk hidden gem, coba kunjungi Kampung Kapitan atau Taman Sekanak Lambidaro yang baru direvitalisasi.', 'Makam Ki Gede Ing Suro atau Toko Kopi Har bisa jadi pilihan unik yang belum banyak turis tahu.'],
 ARRAY['For hidden gems, try visiting Kampung Kapitan or the newly revitalized Sekanak Lambidaro Park.', 'The Tomb of Ki Gede Ing Suro or Har Coffee Shop are unique choices not many tourists know about.']
),
('ask_operating_hours', 
 'Menanyakan jam operasional tempat wisata', 
 'Asking for operating hours',
 ARRAY['Setiap destinasi punya jam operasional berbeda. Coba sebutkan nama tempat spesifik yang ingin kamu kunjungi!', 'Bisa sebutkan nama tempat wisatanya? Nanti saya cek jam bukanya.'],
 ARRAY['Each destination has different operating hours. Could you specify the place you want to visit?', 'Can you tell me the name of the place? I will check its opening hours for you.']
),
('ask_ticket_price', 
 'Menanyakan harga tiket', 
 'Asking for ticket prices',
 ARRAY['Harga tiket bervariasi dari gratis hingga Rp60.000. Kamu mau tahu harga tiket untuk tempat apa?', 'Beberapa tempat seperti Ampera gratis, tapi untuk museum atau waterpark berbayar. Ada destinasi spesifik yang dicari?'],
 ARRAY['Ticket prices vary from free to Rp60,000. Which place would you like to know the price for?', 'Some places like Ampera are free, but museums and waterparks charge an entry fee. Any specific destination in mind?']
),
('ask_distance', 
 'Menanyakan jarak atau rute', 
 'Asking for distance or route',
 ARRAY['Saya bisa merekomendasikan rute dari fitur Peta di aplikasi ini. Gunakan menu "Peta" untuk melihat jarak pastinya!', 'Gunakan fitur rute di layar utama aplikasi untuk melihat jarak dari lokasimu saat ini.'],
 ARRAY['I can recommend routes using the Map feature in this app. Use the "Map" menu to see the exact distance!', 'Use the routing feature on the main screen to see the distance from your current location.']
),
('about_app', 
 'Menanyakan tentang aplikasi', 
 'Asking about the app',
 ARRAY['Aplikasi "Pelesir Palembang" ini dibuat untuk membantumu menemukan destinasi terbaik, merencanakan rute liburan, dan menjelajahi budaya Kota Palembang.', 'Aplikasi ini memiliki fitur peta, itinerari, dan chatbot ini untuk menjadi pemandu wisata digitalmu.'],
 ARRAY['The "Pelesir Palembang" app is built to help you find the best destinations, plan your trips, and explore Palembang''s culture.', 'This app features maps, itineraries, and this chatbot to be your digital tour guide.']
),
('about_palembang', 
 'Menanyakan tentang kota Palembang', 
 'Asking about Palembang city',
 ARRAY['Palembang adalah kota tertua di Indonesia, terkenal sebagai ibu kota Kerajaan Sriwijaya di masa lalu, serta surganya kuliner Pempek!', 'Palembang dijuluki Venice of the East karena memiliki banyak sungai, terutama Sungai Musi yang megah.'],
 ARRAY['Palembang is the oldest city in Indonesia, famously known as the capital of the Srivijaya Empire in the past, and a paradise for Pempek!', 'Palembang is dubbed the Venice of the East because of its many rivers, especially the majestic Musi River.']
),
('fallback', 
 'Intent tidak dimengerti', 
 'Intent not understood',
 ARRAY['Maaf, saya kurang mengerti pertanyaanmu. Bisa gunakan kata lain?', 'Hmm, saya masih belajar. Mungkin kamu bisa bertanya seputar rekomendasi tempat wisata atau kuliner di Palembang?'],
 ARRAY['Sorry, I don''t quite understand your question. Could you rephrase it?', 'Hmm, I am still learning. Maybe you can ask for tourist or culinary recommendations in Palembang?']
);
