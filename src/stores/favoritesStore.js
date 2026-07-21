import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useToastStore } from './toastStore';

export const useFavoritesStore = create((set, get) => ({
  favorites: [], // Array of destination_id
  isLoading: false,

  fetchFavorites: async (userId) => {
    if (!userId) {
      set({ favorites: [] });
      return;
    }
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('destination_id')
        .eq('user_id', userId);

      if (error) throw error;
      
      const favIds = data.map(f => f.destination_id);
      set({ favorites: favIds });
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (destinationId, userId) => {
    if (!userId) return false; // Harusnya ditangani di level UI dengan modal login

    const { favorites } = get();
    const isFavorited = favorites.includes(destinationId);
    
    // Optimistic UI update
    if (isFavorited) {
      set({ favorites: favorites.filter(id => id !== destinationId) });
      useToastStore.getState().showToast('Dihapus dari favorit', 'info');
    } else {
      set({ favorites: [...favorites, destinationId] });
      useToastStore.getState().showToast('Ditambahkan ke favorit', 'success');
    }

    // Backend sync
    try {
      if (isFavorited) {
        // Hapus dari Supabase
        const { error } = await supabase
          .from('favorites')
          .delete()
          .match({ user_id: userId, destination_id: destinationId });
          
        if (error) throw error;
      } else {
        // Tambah ke Supabase
        const { error } = await supabase
          .from('favorites')
          .insert([{ user_id: userId, destination_id: destinationId }]);
          
        if (error && error.code !== '23505') throw error;
      }
      return true;
    } catch (error) {
      console.warn('Error toggling favorite:', error.message);
      // Revert optimistic update on failure
      set({ favorites });
      useToastStore.getState().showToast('Gagal mengubah favorit', 'error');
      return false;
    }
  },

  isFavorite: (destinationId) => {
    return get().favorites.includes(destinationId);
  }
}));
