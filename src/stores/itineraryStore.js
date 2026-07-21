import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useItineraryStore = create((set, get) => ({
  itineraries: [],
  activeItinerary: null,
  isLoading: false,

  fetchItineraries: async (userId) => {
    if (!userId) return;
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('itineraries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      set({ 
        itineraries: data,
        activeItinerary: data.length > 0 ? data[0] : null
      });
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  setActiveItinerary: (itineraryId) => {
    const { itineraries } = get();
    const active = itineraries.find(i => i.id === itineraryId) || null;
    set({ activeItinerary: active });
  },

  createItinerary: async (userId, title, startDate, endDate) => {
    if (!userId) return { success: false, error: 'User not logged in' };
    set({ isLoading: true });
    try {
      const newItinerary = {
        user_id: userId,
        title,
        start_date: startDate,
        end_date: endDate,
        destinations: [],
      };
      const { data, error } = await supabase
        .from('itineraries')
        .insert(newItinerary)
        .select()
        .single();
      if (error) throw error;
      set((state) => ({ itineraries: [data, ...state.itineraries] }));
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  addDestination: async (itineraryId, destinationData) => {
    // destinationData is expected to be { destination_id, date, order, duration_minutes }
    try {
      const itinerary = get().itineraries.find(i => i.id === itineraryId);
      if (!itinerary) throw new Error('Itinerary not found');

      const updatedDestinations = [...itinerary.destinations, destinationData];
      const { error } = await supabase
        .from('itineraries')
        .update({ destinations: updatedDestinations })
        .eq('id', itineraryId);
      
      if (error) throw error;
      
      set((state) => ({
        itineraries: state.itineraries.map(i => 
          i.id === itineraryId ? { ...i, destinations: updatedDestinations } : i
        )
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  removeDestination: async (itineraryId, index) => {
    try {
      const itinerary = get().itineraries.find(i => i.id === itineraryId);
      if (!itinerary) throw new Error('Itinerary not found');

      const updatedDestinations = itinerary.destinations.filter((_, i) => i !== index);
      const { error } = await supabase
        .from('itineraries')
        .update({ destinations: updatedDestinations })
        .eq('id', itineraryId);
      
      if (error) throw error;

      set((state) => ({
        itineraries: state.itineraries.map(i => 
          i.id === itineraryId ? { ...i, destinations: updatedDestinations } : i
        )
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteItinerary: async (itineraryId) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.from('itineraries').delete().eq('id', itineraryId);
      if (error) throw error;
      set((state) => ({
        itineraries: state.itineraries.filter(i => i.id !== itineraryId)
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
}));
