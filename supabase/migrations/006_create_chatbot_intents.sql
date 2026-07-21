-- Migration 006: Create chatbot_intents table
-- Referensi intent chatbot untuk training dan response mapping

CREATE TABLE chatbot_intents (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intent_name          VARCHAR(100) NOT NULL UNIQUE,
  description_id       TEXT,
  description_en       TEXT,
  sample_responses_id  TEXT[],          -- Array respons dalam Bahasa Indonesia
  sample_responses_en  TEXT[]           -- Array respons dalam Bahasa Inggris
);
