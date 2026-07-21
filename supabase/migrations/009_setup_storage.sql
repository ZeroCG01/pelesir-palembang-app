-- Migration 009: Setup Storage Buckets & Policies
-- Konfigurasi CDN penyimpanan foto destinasi dan avatar pengguna

-- ============================================================
-- 1. Create Buckets
-- ============================================================

-- Bucket untuk destination-images
-- Max size: 5MB (5242880 bytes), Public: true
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'destination-images', 
  'destination-images', 
  true, 
  5242880, 
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Bucket untuk avatars
-- Max size: 2MB (2097152 bytes), Public: true
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars', 
  'avatars', 
  true, 
  2097152, 
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ============================================================
-- 2. Storage Policies for destination-images
-- ============================================================

-- Semua orang bisa melihat/download foto destinasi
CREATE POLICY "Public Access Destination Images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'destination-images');

-- INSERT/UPDATE/DELETE tidak kita definisikan untuk destination-images,
-- artinya karena RLS aktif (default di Supabase Storage),
-- maka secara otomatis HANYA Service Role (Admin) yang bisa upload/delete.

-- ============================================================
-- 3. Storage Policies for avatars
-- ============================================================

-- Semua orang bisa melihat/download avatar
CREATE POLICY "Public Access Avatars" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

-- User HANYA bisa upload avatar ke dalam folder dengan nama UID-nya sendiri
CREATE POLICY "Users can upload their own avatar" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- User HANYA bisa update/replace avatar miliknya sendiri
CREATE POLICY "Users can update their own avatar" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- User HANYA bisa menghapus avatar miliknya sendiri
CREATE POLICY "Users can delete their own avatar" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
