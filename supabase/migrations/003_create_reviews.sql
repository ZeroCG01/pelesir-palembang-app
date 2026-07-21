-- Migration 003: Create reviews table
-- Menyimpan ulasan pengguna untuk setiap destinasi

CREATE TABLE reviews (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id   UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  rating           SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment          TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, destination_id)              -- Satu review per user per destinasi
);

CREATE INDEX idx_reviews_destination_id ON reviews(destination_id);
