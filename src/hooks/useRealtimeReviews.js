import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useRealtimeReviews = (destinationId) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitialReviews = async () => {
    if (!destinationId) return;
    setIsLoading(true);
    
    try {
      // Fetch reviews without joining profiles because reviews references auth.users not public.profiles
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          comment,
          created_at,
          user_id
        `)
        .eq('destination_id', destinationId)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      if (!reviewsData || reviewsData.length === 0) {
        setReviews([]);
        return;
      }

      // Extract unique user_ids
      const userIds = [...new Set(reviewsData.map(r => r.user_id))];

      // Fetch profiles for those user_ids
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);
      
      if (profilesError) throw profilesError;

      // Merge profiles into reviews
      const profileMap = {};
      if (profilesData) {
        profilesData.forEach(p => {
          profileMap[p.id] = p;
        });
      }

      const mergedData = reviewsData.map(r => ({
        ...r,
        user: profileMap[r.user_id] || null
      }));

      setReviews(mergedData);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialReviews();

    // Subscribe to realtime changes on 'reviews' table for this destination
    const channel = supabase.channel('custom-filter-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reviews', filter: `destination_id=eq.${destinationId}` },
        (payload) => {
          console.log('Realtime Review update received!', payload);
          // Easiest way to handle all CUD operations is to refetch
          // In a heavily loaded app, we might want to manually patch the array instead
          fetchInitialReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [destinationId]);

  const submitReview = async (rating, comment, userId) => {
    if (!destinationId || !userId) return { success: false, message: 'Data tidak valid' };
    
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          destination_id: destinationId,
          user_id: userId,
          rating: rating,
          comment: comment
        });
        
      if (error) {
        if (error.code === '23505') {
          return { success: false, message: 'Anda sudah memberikan ulasan untuk tempat ini sebelumnya.' };
        }
        throw error;
      }
      
      // Update local state immediately (useful if Supabase realtime is disabled)
      await fetchInitialReviews();
      
      return { success: true };
    } catch (err) {
      console.warn('Error submitting review:', err.message);
      return { success: false, message: 'Terjadi kesalahan sistem. Silakan coba lagi.' };
    }
  };

  return { reviews, isLoading, refetch: fetchInitialReviews, submitReview };
};

export default useRealtimeReviews;
