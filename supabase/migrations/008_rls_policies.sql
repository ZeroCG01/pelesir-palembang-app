-- Migration 008: Row Level Security (RLS) Policies
-- Melindungi akses data agar sesuai dengan kepemilikan user (auth.uid())

-- ============================================================
-- 1. Profiles
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- ============================================================
-- 2. Destinations
-- ============================================================
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view destinations" 
ON destinations FOR SELECT 
TO PUBLIC 
USING (true);

-- ============================================================
-- 3. Reviews
-- ============================================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews" 
ON reviews FOR SELECT 
TO PUBLIC 
USING (true);

CREATE POLICY "Users can insert own reviews" 
ON reviews FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" 
ON reviews FOR UPDATE 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" 
ON reviews FOR DELETE 
USING (auth.uid() = user_id);

-- ============================================================
-- 4. Favorites
-- ============================================================
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites" 
ON favorites FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" 
ON favorites FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" 
ON favorites FOR DELETE 
USING (auth.uid() = user_id);

-- ============================================================
-- 5. Itineraries
-- ============================================================
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own itineraries" 
ON itineraries FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 6. Chatbot Intents
-- ============================================================
ALTER TABLE chatbot_intents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view chatbot intents" 
ON chatbot_intents FOR SELECT 
TO PUBLIC 
USING (true);
