import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../src/lib/supabase';
import { useAuthStore } from '../../../src/stores/authStore';
import { useToastStore } from '../../../src/stores/toastStore';
import { useItineraryStore } from '../../../src/stores/itineraryStore';
import Button from '../common/Button';

export const ItineraryPickerModal = ({ visible, onClose, destination }) => {
  const { user } = useAuthStore();
  const { showToast } = useToastStore();
  
  const [itineraries, setItineraries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk step 2: pilih hari ke berapa
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (visible && user?.id) {
      fetchItineraries();
      setSelectedItinerary(null);
    }
  }, [visible, user?.id]);

  const fetchItineraries = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('itineraries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setItineraries(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectItinerary = (itinerary) => {
    const start = new Date(itinerary.start_date);
    const end = new Date(itinerary.end_date);
    const dayArray = [];
    let dayNum = 1;
    let current = new Date(start);
    
    while (current <= end) {
      dayArray.push(dayNum);
      current.setDate(current.getDate() + 1);
      dayNum++;
    }
    
    setDays(dayArray);
    setSelectedItinerary(itinerary);
  };

  const handleAddToDay = async (dayNum) => {
    try {
      setIsLoading(true);
      const newDestinations = { ...(selectedItinerary.destinations || {}) };
      
      if (!newDestinations[dayNum]) {
        newDestinations[dayNum] = [];
      }
      
      // Simpan data destinasi mini ke JSONB
      newDestinations[dayNum].push({
        id: destination.id,
        name: destination.name,
        image_url: destination.image_urls?.[0] || 'https://via.placeholder.com/150',
        category: destination.category
      });

      const { error } = await supabase
        .from('itineraries')
        .update({ destinations: newDestinations })
        .eq('id', selectedItinerary.id);

      if (error) throw error;

      // Update global store to reflect changes immediately
      const { fetchItineraries } = useItineraryStore.getState();
      await fetchItineraries(user.id);

      showToast(`Berhasil ditambahkan ke Hari ke-${dayNum}`, 'success');
      onClose();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Gagal menyimpan ke itinerary');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white dark:bg-dark-bg rounded-t-3xl min-h-[50%] p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-montserrat-bold text-xl text-body dark:text-white">
              {selectedItinerary ? 'Pilih Hari' : 'Pilih Itinerary'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#888" />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View className="py-10 items-center">
              <ActivityIndicator size="large" color="#FD6B1C" />
            </View>
          ) : selectedItinerary ? (
            // Step 2: Pilih Hari
            <View>
              <Text className="font-montserrat text-body dark:text-gray-300 mb-4">
                Tambahkan <Text className="font-montserrat-bold">{destination?.name}</Text> ke itinerary <Text className="font-montserrat-bold">{selectedItinerary.title}</Text> pada:
              </Text>
              
              <FlatList 
                data={days}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    className="p-4 border border-border dark:border-gray-800 rounded-lg mb-3 flex-row justify-between items-center bg-gray-50 dark:bg-dark-card"
                    onPress={() => handleAddToDay(item)}
                  >
                    <Text className="font-montserrat-bold text-body dark:text-white">Hari ke-{item}</Text>
                    <Ionicons name="add-circle" size={24} color="#FD6B1C" />
                  </TouchableOpacity>
                )}
                style={{ maxHeight: 300 }}
              />
              <Button title="Kembali" variant="outline" onPress={() => setSelectedItinerary(null)} className="mt-4" />
            </View>
          ) : (
            // Step 1: Pilih Itinerary
            <View>
              {itineraries.length === 0 ? (
                <View className="items-center py-6">
                  <Text className="font-montserrat text-gray-500 text-center mb-4">
                    Anda belum memiliki itinerary apapun.
                  </Text>
                  {/* Gunakan router untuk navigasi jika diperlukan, 
                      tapi dari dalam modal butuh penanganan khusus.
                      Disini kita bisa menyuruh tutup modal dan buka tab itinerary */}
                </View>
              ) : (
                <FlatList 
                  data={itineraries}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      className="p-4 border-b border-gray-100 dark:border-gray-800 flex-row justify-between items-center"
                      onPress={() => handleSelectItinerary(item)}
                    >
                      <View>
                        <Text className="font-montserrat-bold text-body dark:text-white text-base">{item.title}</Text>
                        <Text className="font-montserrat text-xs text-gray-500">{item.start_date} s/d {item.end_date}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#888" />
                    </TouchableOpacity>
                  )}
                  style={{ maxHeight: 300 }}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ItineraryPickerModal;
