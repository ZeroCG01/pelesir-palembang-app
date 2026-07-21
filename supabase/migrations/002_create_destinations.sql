-- Migration 002: Create destinations table
-- Menyimpan semua data destinasi wisata Kota Palembang

CREATE TABLE destinations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(255) NOT NULL,
  slug             VARCHAR(255) UNIQUE NOT NULL,
  description_id   TEXT NOT NULL,             -- Deskripsi Bahasa Indonesia
  description_en   TEXT NOT NULL,             -- Deskripsi Bahasa Inggris
  category         VARCHAR(50) NOT NULL,      -- 'sejarah', 'kuliner', 'alam', 'religi', 'olahraga'
  is_hidden_gem    BOOLEAN DEFAULT FALSE,
  latitude         DECIMAL(10, 8) NOT NULL,
  longitude        DECIMAL(11, 8) NOT NULL,
  address          TEXT,
  operating_hours  VARCHAR(100),
  price_min        INTEGER DEFAULT 0,         -- dalam Rupiah
  price_max        INTEGER,
  rating           DECIMAL(3, 2) DEFAULT 0,
  review_count     INTEGER DEFAULT 0,
  image_urls       TEXT[],                    -- Array of image URLs untuk carousel
  facilities       TEXT[],                    -- Array fasilitas (e.g. 'parkir', 'toilet', 'wifi')
  lrt_accessible   BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes untuk query performance
-- UNIQUE pada slug sudah otomatis membuat unique index, tidak perlu index manual
CREATE INDEX idx_destinations_category ON destinations(category);
CREATE INDEX idx_destinations_rating ON destinations(rating DESC);
CREATE INDEX idx_destinations_hidden_gem ON destinations(is_hidden_gem);
