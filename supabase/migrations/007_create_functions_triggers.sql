-- Migration 007: Create functions & triggers
-- Logika otomatis di level database

-- ============================================================
-- 1. Function: update_destination_rating()
--    Otomatis recalculate rating & review_count di destinations
--    setiap ada INSERT/UPDATE/DELETE di tabel reviews
-- ============================================================
CREATE OR REPLACE FUNCTION update_destination_rating()
RETURNS TRIGGER AS $$
DECLARE
  target_id UUID;
BEGIN
  -- Gunakan OLD.destination_id saat DELETE, NEW.destination_id saat INSERT/UPDATE
  IF TG_OP = 'DELETE' THEN
    target_id := OLD.destination_id;
  ELSE
    target_id := NEW.destination_id;
  END IF;

  UPDATE destinations
  SET rating = COALESCE((SELECT AVG(rating) FROM reviews WHERE destination_id = target_id), 0),
      review_count = (SELECT COUNT(*) FROM reviews WHERE destination_id = target_id)
  WHERE id = target_id;

  -- Return OLD untuk DELETE, NEW untuk INSERT/UPDATE
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- SECURITY DEFINER diperlukan karena RLS tabel destinations hanya izinkan admin untuk write

CREATE TRIGGER on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_destination_rating();

-- ============================================================
-- 2. Function: update_updated_at()
--    Otomatis set updated_at = NOW() setiap ada UPDATE pada row
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Pasang trigger updated_at pada tabel yang membutuhkan
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_destinations
  BEFORE UPDATE ON destinations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_reviews
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_itineraries
  BEFORE UPDATE ON itineraries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
