import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useDestinations = (searchQuery = '', activeCategory = 'Semua') => {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let query = supabase.from('destinations').select('*');

      // Filter by category
      if (activeCategory !== 'Semua' && activeCategory !== 'Populer' && activeCategory !== 'Hidden Gems') {
        query = query.eq('category', activeCategory);
      }

      // Filter by popular or hidden gem based on generic flags if exist
      if (activeCategory === 'Populer') {
        // Assume rating > 4.5 is popular for now
        query = query.gte('rating', 4.5);
      }
      if (activeCategory === 'Hidden Gems') {
        // Assume few reviews but high rating
        query = query.lt('review_count', 50).gte('rating', 4.0);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Filter by search query manually (or via ilike in supabase)
      let filteredData = data || [];
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredData = filteredData.filter(
          (d) => 
            d.name?.toLowerCase().includes(lowerQuery) || 
            d.description_id?.toLowerCase().includes(lowerQuery) ||
            d.description_en?.toLowerCase().includes(lowerQuery)
        );
      }

      setDestinations(filteredData);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search handled mostly in UI, here we just react to state changes
    fetchDestinations();
  }, [searchQuery, activeCategory]);

  return { destinations, isLoading, error, refetch: fetchDestinations };
};

export default useDestinations;
