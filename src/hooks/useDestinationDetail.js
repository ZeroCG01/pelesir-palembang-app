import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useDestinationDetail = (id) => {
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('destinations')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        setDestination(data);
      } catch (err) {
        console.error('Error fetching destination detail:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { destination, isLoading, error };
};

export default useDestinationDetail;
