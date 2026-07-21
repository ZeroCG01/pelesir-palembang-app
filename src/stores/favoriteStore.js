import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export const useFavoriteStore = create((set, get) => ({
  favorites: [], 
  favoriteIds: new Set(), 
  isLoading: false,
  error: null,

  fetchFavorites: async () => {
    const { session } = useAuthStore.getState();
    if (!session?.user) return;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          destination_id,
          destinations (*)
        `)
        .eq('user_id', session.user.id);

      if (error) throw error;

      // Ensure we don't map null destinations if there's a dangling reference
      const validData = data.filter(f => f.destinations);
      const favoriteDests = validData.map(f => f.destinations);
      const favoriteIds = new Set(validData.map(f => f.destination_id));

      set({ favorites: favoriteDests, favoriteIds, isLoading: false });
    } catch (error) {
      console.error('Error fetching favorites:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  toggleFavorite: async (destinationId) => {
    const { session } = useAuthStore.getState();
    if (!session?.user) return;

    const { favoriteIds, fetchFavorites } = get();
    // Convert to string for safe comparison, though Supabase UUIDs are strings
    const isFavorited = Array.from(favoriteIds).some(id => id.toString() === destinationId.toString());

    try {
      if (isFavorited) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', session.user.id)
          .eq('destination_id', destinationId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: session.user.id,
            destination_id: destinationId
          });
        if (error) throw error;
      }

      await fetchFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  },

  isFavorite: (destinationId) => {
    if (!destinationId) return false;
    const { favoriteIds } = get();
    return Array.from(favoriteIds).some(id => id.toString() === destinationId.toString());
  }
}));
