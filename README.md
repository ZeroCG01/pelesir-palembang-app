# 🏛️ Pelesir Palembang - Mobile Tourism App

<p align="center">
  <img src="./assets/images/icon.png" alt="Pelesir Palembang Logo" width="120" style="border-radius: 20px;" />
</p>

<p align="center">
  <b>Aplikasi Panduan Wisata Cerdas Kota Palembang berbasis React Native, Expo, dan Integrasi AI Chatbot (TanyaKito).</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-NativeWind-38B2AC?logo=tailwind-css&logoColor=white" alt="NativeWind" />
  <img src="https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/AI%20Chatbot-FastAPI%20%26%20XLM--RoBERTa-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
</p>

---

## 📖 Tentang Proyek

**Pelesir Palembang** adalah aplikasi mobile pariwisata yang dirancang untuk mempermudah wisatawan lokal maupun mancanegara dalam mengeksplorasi destinasi wisata, kebudayaan, sejarah, dan kuliner khas Kota Palembang. 

Aplikasi ini dilengkapi dengan asisten pintar **TanyaKito**—sebuah chatbot percakapan interaktif berbasis NLP *Hybrid* (fine-tuned XLM-RoBERTa + LLM fallback) yang dapat memberikan rekomendasi wisata, estimasi harga tiket, rute perjalanan, hingga pembuatan itinerary kustom secara instan.

---

## ✨ Fitur Utama

- 🗺️ **Interactive Tourism Map**: Peta interaktif berbasis `react-native-maps` untuk menjelajahi titik destinasi wisata, filter kategori, dan integrasi rute navigasi.
- 💬 **TanyaKito AI Assistant**: Chatbot percakapan cerdas yang mendukung *rich response* (kartu destinasi interaktif, tombol aksi navigasi, serta quick replies).
- 📅 **Itinerary Planner**: Fitur penyusunan rencana perjalanan terstruktur (pagi, siang, sore) sesuai preferensi waktu dan kategori wisata.
- 🔍 **Katalog & Detail Destinasi**: Direktori lengkap wisata sejarah, religi, alam, dan kuliner disertai galeri foto, jam buka, harga tiket, dan ulasan pengguna.
- 🔐 **Autentikasi & Profil Pengguna**: Sistem autentikasi aman dengan Supabase Auth (Email, Google Auth), manajemen profil, dan penyimpanan destinasi favorit (bookmark).
- 🌐 **Dukungan Multi-bahasa**: Internasionalisasi (i18n) siap pakai untuk bahasa Indonesia dan Inggris.

---

## 🛠️ Tech Stack

### Frontend & Mobile
- **Core Framework**: [React Native](https://reactnative.dev/) (v0.81.5) & [Expo](https://expo.dev/) (SDK 54)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing v6)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS v3 for React Native)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Maps**: [react-native-maps](https://github.com/react-native-maps/react-native-maps) & `react-native-maps-directions`
- **Internationalization**: [react-i18next](https://react.i18next.com/)

### Backend & Cloud Services
- **BaaS Platform**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Auth, & Storage)
- **AI Microservice**: Python, FastAPI, XLM-RoBERTa (Hugging Face) & OpenRouter API (Repositori terpisah: [`pelesir-palembang-chatbot`](https://github.com/ZeroCG01/pelesir-palembang-chatbot))

---

## 📁 Struktur Direktori

```text
pelesir-palembang/
├── app/                      # Direktori utama Expo Router (Screen & Navigasi)
│   ├── (auth)/               # Layar autentikasi (Login, Register, Onboarding, Forgot Password)
│   ├── (tabs)/               # Navigasi tab utama
│   │   ├── chatbot.jsx       # Chatbot TanyaKito (Rich responses & Quick replies)
│   │   ├── home.jsx          # Beranda & rekomendasi destinasi
│   │   ├── map.jsx           # Peta interaktif destinasi wisata
│   │   ├── itinerary/        # Pengelolaan jadwal perjalanan
│   │   └── profile/          # Profil pengguna & pengaturan
│   ├── destination/          # Halaman detail destinasi & ulasan
│   └── _layout.jsx           # Root layout & context providers
├── assets/                   # Aset gambar, ikon, dan font kustom (Montserrat)
├── src/
│   ├── components/           # Komponen UI modular (common, destination, cards, dsb.)
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Konfigurasi client Supabase
│   ├── locales/              # File kamus terjemahan bahasa (i18n)
│   ├── services/             # Integrasi API (Chatbot service, Supabase query)
│   ├── stores/               # Global state stores (Zustand)
│   └── utils/                # Fungsi utilitas & helper
├── supabase/                 # Skrip SQL migration & seed data
├── app.config.js             # Konfigurasi aplikasi Expo & metadata Android/iOS
└── tailwind.config.js        # Konfigurasi styling NativeWind
```

---

## 🚀 Memulai Instalasi Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) (versi LTS 18 atau 20 disarankan)
- [Git](https://git-scm.com/)
- Expo Go App pada smartphone fisik Android/iOS, atau Android Studio Emulator

### 1. Kloning Repositori
```bash
git clone https://github.com/ZeroCG01/pelesir-palembang-app.git
cd pelesir-palembang-app
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Lalu lengkapi nilainya:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_FASTAPI_URL=http://localhost:8000
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Menjalankan Aplikasi
Mulai server development Expo:
```bash
npx expo start
```
- Tekan **`a`** untuk membuka di Emulator Android.
- Tekan **`w`** untuk membuka di Web browser.
- Pindai kode QR menggunakan aplikasi **Expo Go** di smartphone Android Anda.

---

## 🤝 Repositori Terkait
- **AI Chatbot Service**: [pelesir-palembang-chatbot](https://github.com/ZeroCG01/pelesir-palembang-chatbot)

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi [MIT](LICENSE).
