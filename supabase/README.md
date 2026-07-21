# Supabase — Pelesir Palembang Backend

Folder ini berisi semua konfigurasi database untuk aplikasi Pelesir Palembang.

## Struktur

```
supabase/
├── migrations/          # SQL migration files (urut berdasarkan nomor)
│   ├── 001_create_profiles.sql
│   ├── 002_create_destinations.sql
│   ├── 003_create_reviews.sql
│   ├── 004_create_favorites.sql
│   ├── 005_create_itineraries.sql
│   ├── 006_create_chatbot_intents.sql
│   └── 007_create_functions_triggers.sql
├── seed.sql             # Seed data 30+ destinasi wisata Palembang
├── seed_intents.sql     # Seed data 12 chatbot intents
└── README.md            # Dokumentasi ini
```

## Cara Setup Database dari Awal

1. Pastikan Supabase CLI sudah terinstall: `npm install -g supabase`
2. Login: `supabase login`
3. Link ke project: `supabase link --project-ref <project-id>`
4. Jalankan semua migration: `supabase db push`
5. Jalankan seed data: `psql -f supabase/seed.sql` atau via Supabase SQL Editor

## Urutan Migration

Migration harus dijalankan **berurutan** karena ada foreign key dependencies:

1. `profiles` — depends on `auth.users`
2. `destinations` — standalone
3. `reviews` — depends on `auth.users` + `destinations`
4. `favorites` — depends on `auth.users` + `destinations`
5. `itineraries` — depends on `auth.users`
6. `chatbot_intents` — standalone
7. `functions_triggers` — depends on `profiles`, `destinations`, `reviews`
