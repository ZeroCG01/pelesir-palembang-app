import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Modal, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea } from '../../../src/components/layout/SafeArea';
import TimelineItem from '../../../src/components/itinerary/TimelineItem';
import { supabase } from '../../../src/lib/supabase';
import { useToastStore } from '../../../src/stores/toastStore';
import { useAuthStore } from '../../../src/stores/authStore';
import { useItineraryStore } from '../../../src/stores/itineraryStore';
import { useDestinationStore } from '../../../src/stores/destinationStore';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../../src/stores/languageStore';
import { Image } from 'expo-image';

export default function ItineraryDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { showToast } = useToastStore();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const [selectedDay, setSelectedDay] = useState(1);
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [activeAddDay, setActiveAddDay] = useState(null);
  const { destinations: allDestinations, fetchDestinations } = useDestinationStore();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDetail = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('itineraries')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      
      // Ensure destinations object exists and is sorted by time
      if (!data.destinations) {
        data.destinations = {};
      } else {
        Object.keys(data.destinations).forEach(day => {
          data.destinations[day].sort((a, b) => {
            const timeA = a.time || '00:00';
            const timeB = b.time || '00:00';
            return timeA.localeCompare(timeB);
          });
        });
      }
      setItinerary(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', t('itinerary_detail_error'));
      router.back();
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDetail(!itinerary); // only show loading indicator if it's the first load
    }, [id])
  );

  // Kalkulasi hari berdasarkan start_date dan end_date
  const getDaysArray = () => {
    if (!itinerary) return [];
    const start = new Date(itinerary.start_date);
    const end = new Date(itinerary.end_date);
    const days = [];
    let current = new Date(start);
    
    const locale = language === 'en' ? 'en-US' : 'id-ID';
    let dayNum = 1;
    while (current <= end) {
      const parts = current.toLocaleDateString(locale, { day: 'numeric', month: 'short' }).split(' ');
      days.push({
        dayNumber: dayNum,
        dateStr: `${parts[0]}\n${parts[1]}`
      });
      current.setDate(current.getDate() + 1);
      dayNum++;
    }
    return days;
  };

  const handleRemoveDestination = async (dayNumber, index) => {
    try {
      const newDestinations = { ...itinerary.destinations };
      if (newDestinations[dayNumber]) {
        newDestinations[dayNumber].splice(index, 1);
        
        // Optimistic UI
        setItinerary({ ...itinerary, destinations: newDestinations });

        // Update DB
        const { error } = await supabase
          .from('itineraries')
          .update({ destinations: newDestinations })
          .eq('id', itinerary.id);

        if (error) throw error;

        // Sync to global store
        if (user?.id) {
          useItineraryStore.getState().fetchItineraries(user.id);
        }

        showToast(t('itinerary_dest_removed'), 'info');
      }
    } catch (error) {
      console.error(error);
      showToast(t('itinerary_dest_remove_error'), 'error');
      fetchDetail(); // rollback
    }
  };

  const handleTimeChange = async (dayNumber, index, newTime) => {
    try {
      const newDestinations = { ...itinerary.destinations };
      if (newDestinations[dayNumber]) {
        newDestinations[dayNumber][index].time = newTime;
        
        // Sort array by time so it automatically swaps places based on time
        newDestinations[dayNumber].sort((a, b) => {
          const timeA = a.time || '00:00';
          const timeB = b.time || '00:00';
          return timeA.localeCompare(timeB);
        });
        
        // Optimistic UI
        setItinerary({ ...itinerary, destinations: newDestinations });

        // Update DB
        const { error } = await supabase
          .from('itineraries')
          .update({ destinations: newDestinations })
          .eq('id', itinerary.id);

        if (error) throw error;
      }
    } catch (error) {
      console.error(error);
      showToast('Gagal mengubah waktu', 'error');
      fetchDetail(); // rollback
    }
  };

  const handleAddDay = async () => {
    try {
      const end = new Date(itinerary.end_date);
      end.setDate(end.getDate() + 1);
      const newEndDate = end.toISOString().slice(0, 10);

      // Optimistic UI
      setItinerary({ ...itinerary, end_date: newEndDate });

      // Update DB
      const { error } = await supabase
        .from('itineraries')
        .update({ end_date: newEndDate })
        .eq('id', itinerary.id);

      if (error) throw error;
      showToast('Hari berhasil ditambahkan', 'success');
    } catch (error) {
      console.error(error);
      showToast('Gagal menambahkan hari', 'error');
      fetchDetail(); // rollback
    }
  };

  const handleAddDestination = (dayNumber) => {
    setActiveAddDay(dayNumber);
    setIsAddModalVisible(true);
  };

  const handleSelectDestination = async (dest) => {
    try {
      const newDestinations = { ...itinerary.destinations };
      if (!newDestinations[activeAddDay]) newDestinations[activeAddDay] = [];
      
      // Default time for new destination is 12:00
      newDestinations[activeAddDay].push({
        ...dest,
        time: '12:00'
      });
      
      // Sort array by time
      newDestinations[activeAddDay].sort((a, b) => {
        const timeA = a.time || '00:00';
        const timeB = b.time || '00:00';
        return timeA.localeCompare(timeB);
      });
      
      // Optimistic UI
      setItinerary({ ...itinerary, destinations: newDestinations });
      
      // Update DB
      const { error } = await supabase
        .from('itineraries')
        .update({ destinations: newDestinations })
        .eq('id', itinerary.id);

      if (error) throw error;
      showToast(t('itinerary_dest_added') || 'Destinasi ditambahkan', 'success');
    } catch (err) {
      console.error(err);
      showToast(t('itinerary_dest_add_error') || 'Gagal menambahkan destinasi', 'error');
      fetchDetail();
    } finally {
      setIsAddModalVisible(false);
      setActiveAddDay(null);
    }
  };

  if (isLoading || !itinerary) {
    return (
      <SafeArea className="flex-1 bg-white dark:bg-dark-bg justify-center items-center">
        <ActivityIndicator size="large" color="#FD6B1C" />
      </SafeArea>
    );
  }

  const days = getDaysArray();
  const currentDayDestinations = itinerary.destinations[selectedDay] || [];

  return (
    <SafeArea className="flex-1 bg-white dark:bg-dark-bg">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 bg-white dark:bg-dark-bg z-10">
        <View className="flex-1">
          <Text className="font-montserrat-bold text-[28px] text-body dark:text-white leading-tight" numberOfLines={2}>
            Rencana{'\n'}Perjalanan
          </Text>
          <Text className="font-montserrat text-sm text-gray-500 mt-1">
            {itinerary?.title || 'My Itinerary'}
          </Text>
        </View>
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center"
          onPress={() => {
            Alert.alert(
              t('itinerary_delete_title') || 'Hapus Rencana?',
              t('itinerary_delete_confirm') || 'Rencana perjalanan ini akan dihapus permanen.',
              [
                { text: t('itinerary_cancel') || 'Batal', style: 'cancel' },
                { 
                  text: t('itinerary_delete') || 'Hapus', 
                  style: 'destructive',
                  onPress: async () => {
                    const { error } = await supabase.from('itineraries').delete().eq('id', itinerary.id);
                    if (!error) {
                      useItineraryStore.getState().fetchItineraries(user.id);
                      router.replace('/(tabs)/itinerary');
                    }
                  }
                }
              ]
            );
          }}
        >
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Day Selector */}
      <View className="mt-4 mb-6">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        >
          {days.map((day) => {
            const isActive = selectedDay === day.dayNumber;
            return (
              <TouchableOpacity
                key={day.dayNumber}
                onPress={() => setSelectedDay(day.dayNumber)}
                className={`w-[72px] h-[90px] rounded-2xl items-center justify-center border ${
                  isActive 
                    ? 'bg-primary border-primary' 
                    : 'bg-white dark:bg-dark-bg border-gray-300 dark:border-gray-700'
                }`}
              >
                <Text className={`font-montserrat-medium text-xs mb-1 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                  HARI {day.dayNumber}
                </Text>
                <Text className={`font-montserrat-bold text-2xl ${isActive ? 'text-white' : 'text-body dark:text-white'}`}>
                  {day.dateStr.split('\n')[0]}
                </Text>
                <Text className={`font-montserrat text-xs ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                  {day.dateStr.split('\n')[1]}
                </Text>
              </TouchableOpacity>
            );
          })}
          
          <TouchableOpacity
            onPress={handleAddDay}
            className="w-[72px] h-[90px] rounded-2xl items-center justify-center border border-dashed border-primary bg-primary/5 dark:bg-primary/10"
          >
            <Ionicons name="add" size={24} color="#FD6B1C" />
            <Text className="font-montserrat-bold text-xs text-primary mt-1">
              Hari
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Timeline List */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
        {currentDayDestinations.length > 0 ? (
          currentDayDestinations.map((dest, idx) => (
            <TimelineItem 
              key={idx} 
              destination={dest}
              dayNumber={selectedDay}
              index={idx}
              isLast={idx === currentDayDestinations.length - 1}
              onRemove={() => handleRemoveDestination(selectedDay, idx)}
              onTimeChange={handleTimeChange}
            />
          ))
        ) : (
          <View className="items-center justify-center py-10">
            <Text className="font-montserrat text-gray-500 text-center">
              Belum ada jadwal di hari ini.{'\n'}Silakan tambah destinasi.
            </Text>
          </View>
        )}

        <TouchableOpacity 
          className="flex-row items-center justify-center bg-primary py-4 rounded-pill mt-4 shadow-sm"
          onPress={() => handleAddDestination(selectedDay)}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="font-montserrat-bold text-white ml-2 text-base">Tambah Destinasi</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sticky Save Button */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-dark-bg/90 pb-8 pt-4">
        <TouchableOpacity 
          className="w-full bg-[#B24A00] dark:bg-[#903a00] py-4 rounded-xl flex-row items-center justify-center shadow-sm"
          onPress={() => {
            showToast('Itinerary berhasil disimpan!', 'success');
            router.replace('/(tabs)/itinerary');
          }}
        >
          <Ionicons name="save-outline" size={20} color="white" />
          <Text className="font-montserrat-bold text-white text-base ml-2">
            Simpan Itinerary
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search/Add Destination Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <SafeArea className="flex-1 bg-white dark:bg-dark-bg">
          <View className="px-6 py-4 border-b border-border dark:border-gray-800 flex-row justify-between items-center bg-white dark:bg-dark-bg">
            <Text className="font-montserrat-bold text-xl text-body dark:text-white">Pilih Destinasi</Text>
            <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
              <Ionicons name="close" size={28} color="#888" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={allDestinations}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity 
                className="flex-row bg-white dark:bg-[#202020] p-3 rounded-2xl mb-4 border border-border dark:border-gray-800"
                onPress={() => handleSelectDestination(item)}
              >
                <Image 
                  source={{ uri: item.image_urls?.[0] || 'https://via.placeholder.com/150' }}
                  className="w-20 h-20 rounded-xl bg-gray-200"
                  contentFit="cover"
                />
                <View className="flex-1 ml-3 justify-center">
                  <Text className="font-montserrat-bold text-base text-body dark:text-white mb-1">{item.name}</Text>
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="location-outline" size={14} color="#888" />
                    <Text className="font-montserrat text-xs text-gray-500 ml-1">
                      {item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'Landmark'}
                    </Text>
                  </View>
                </View>
                <View className="justify-center px-2">
                  <Ionicons name="add-circle" size={28} color="#FD6B1C" />
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className="py-10 items-center">
                <Text className="font-montserrat text-gray-500 dark:text-gray-400">Tidak ada destinasi ditemukan.</Text>
              </View>
            }
          />
        </SafeArea>
      </Modal>
    </SafeArea>
  );
}
