-- Migration 004: Create favorites table
-- Menyimpan destinasi favorit pengguna (toggle: INSERT/DELETE)

CREATE TABLE favorites (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id   UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, destination_id)              -- Prevent duplicate favorites
);

CREATE INDEX idx_favorites_user_id ON favorites(user_id);
