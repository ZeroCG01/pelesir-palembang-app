-- Migration 005: Create itineraries table
-- Menyimpan rencana perjalanan pengguna dengan format JSONB

CREATE TABLE itineraries (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title            VARCHAR(255) NOT NULL,
  start_date       DATE NOT NULL,
  end_date         DATE NOT NULL,
  destinations     JSONB NOT NULL DEFAULT '[]',  -- Array of {destination_id, date, order, duration_minutes}
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_itineraries_user_id ON itineraries(user_id);
