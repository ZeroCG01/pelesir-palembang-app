import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useDestinationStore = create((set, get) => ({
  destinations: [],
  isLoading: false,
  error: null,
  
  fetchDestinations: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('id', { ascending: true });
        
      if (error) throw error;
      
      set({ destinations: data || [], isLoading: false });
    } catch (error) {
      console.error('Error fetching destinations:', error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  getDestinationById: (id) => {
    const { destinations } = get();
    // Assuming id can be string or number, convert to string for comparison or match the type.
    return destinations.find(dest => dest.id.toString() === id.toString());
  },

  getCategories: () => {
    const { destinations } = get();
    const categories = destinations.map(dest => dest.category);
    // return unique categories
    return [...new Set(categories)];
  }
}));
