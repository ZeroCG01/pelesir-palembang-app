import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeArea } from '../../src/components/layout/SafeArea';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../src/stores/themeStore';
import { useTranslation } from 'react-i18next';
import { useItineraryStore } from '../../src/stores/itineraryStore';
import { useAuthStore } from '../../src/stores/authStore';

export default function ItineraryBuilderScreen() {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  const { activeItinerary, fetchItineraries, isLoading } = useItineraryStore();
  const { session } = useAuthStore();

  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    if (session?.user?.id) {
      fetchItineraries(session.user.id);
    }
  }, [session]);

  const days = [
    { id: 1, label: 'Hari 1', date: '12', month: 'Okt' },
    { id: 2, label: 'Hari 2', date: '13', month: 'Okt' },
    { id: 3, label: 'Hari 3', date: '14', month: 'Okt' },
  ];

  const timelineItems = activeItinerary?.destinations || [];

  return (
    <SafeArea className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-surface'}`}>
      {/* Top App Bar */}
      <View className={`w-full flex-row justify-between items-center px-4 h-14 border-b ${isDark ? 'border-dark-border bg-dark-bg' : 'border-border bg-white'}`}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 rounded-full">
          <MaterialIcons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text className="font-montserrat-bold text-[18px] text-primary">
          Rencana Perjalanan
        </Text>
        <TouchableOpacity className="p-2 -mr-2 rounded-full">
          <MaterialIcons name="more-vert" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-end mb-6">
          <View>
            <Text className={`font-montserrat-bold text-[28px] ${isDark ? 'text-white' : 'text-body'} leading-tight`}>
              Rencana{'\n'}Perjalanan
            </Text>
            <Text className={`font-montserrat text-[12px] mt-1 ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
              My Itinerary
            </Text>
          </View>
          <TouchableOpacity className="bg-[#FD6B1C] w-12 h-12 rounded-full items-center justify-center shadow-sm">
            <MaterialIcons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Date Selector */}
        <View className="mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row py-1">
            {days.map((day) => {
              const isActive = activeDay === day.id;
              return (
                <TouchableOpacity
                  key={day.id}
                  onPress={() => setActiveDay(day.id)}
                  className={`items-center justify-center p-3 rounded-xl min-w-[72px] mr-3 border
                    ${isActive 
                      ? 'bg-primary border-primary shadow-sm' 
                      : (isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border')}
                  `}
                >
                  <Text className={`font-montserrat-medium text-[14px] uppercase ${isActive ? 'text-white' : (isDark ? 'text-gray-400' : 'text-body-secondary')}`}>
                    {day.label}
                  </Text>
                  <Text className={`font-montserrat-bold text-[22px] mt-1 ${isActive ? 'text-white' : (isDark ? 'text-white' : 'text-body')}`}>
                    {day.date}
                  </Text>
                  <Text className={`font-montserrat text-[12px] ${isActive ? 'text-white/80' : (isDark ? 'text-gray-500' : 'text-gray-400')}`}>
                    {day.month}
                  </Text>
                </TouchableOpacity>
              );
            })}
            
            <TouchableOpacity className={`items-center justify-center p-3 rounded-xl border border-dashed border-primary min-w-[72px] mr-4 ${isDark ? 'bg-[#FD6B1C]/10' : 'bg-primary/5'}`}>
              <MaterialIcons name="add" size={20} color="#FD6B1C" className="mb-1" />
              <Text className="font-montserrat-bold text-[12px] text-primary">Hari</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Timeline View */}
        <View className="flex-col">
          {timelineItems.map((item, index) => {
            const isLast = index === timelineItems.length - 1;
            return (
              <View key={item.id} className="flex-row mb-6 relative">
                {/* Time */}
                <View className="w-12 pt-4 items-end pr-2">
                  <Text className="font-montserrat-bold text-[14px] text-primary">{item.time}</Text>
                </View>

                {/* Node & Line */}
                <View className="w-6 items-center relative">
                  <View className={`absolute top-6 bottom-[-24px] w-[2px] ${isDark ? 'bg-dark-border' : 'bg-border'} z-0`} />
                  <View className={`absolute top-5 w-4 h-4 rounded-full bg-primary border-[3px] ${isDark ? 'border-dark-bg' : 'border-surface'} z-10`} />
                </View>

                {/* Card */}
                <View className={`flex-1 flex-row p-2 rounded-xl shadow-sm border items-center ml-2
                  ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'}
                `}>
                  {/* Thumbnail */}
                  <View className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden mr-3">
                    <Image source={{ uri: item.imageUri }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  
                  {/* Details */}
                  <View className="flex-1 justify-center pr-6">
                    <Text className={`font-montserrat-bold text-[16px] mb-1 ${isDark ? 'text-white' : 'text-body'}`} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View className="flex-row items-center mb-1">
                      <MaterialIcons name={item.icon} size={14} color={isDark ? '#AAAAAA' : '#666666'} />
                      <Text className={`font-montserrat text-[12px] ml-1 ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
                        {item.category}
                      </Text>
                    </View>
                    <Text className="font-montserrat-semibold text-[12px] text-primary">
                      Estimasi: {item.duration}
                    </Text>
                  </View>

                  {/* Remove Action */}
                  <TouchableOpacity 
                    className="absolute top-2 right-2 p-1"
                    onPress={() => useItineraryStore.getState().removeDestination(activeItinerary.id, index)}
                  >
                    <MaterialIcons name="close" size={20} color={isDark ? '#AAAAAA' : '#666666'} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {/* Add Button Node */}
          <View className="flex-row mt-2 relative">
            <View className="w-12 pt-4 items-end pr-2"></View>
            <View className="w-6 items-center relative">
              <View className={`absolute top-0 h-6 w-[2px] ${isDark ? 'bg-dark-border' : 'bg-border'} z-0`} />
            </View>
            <View className="flex-1 items-start ml-2 pt-2">
              <TouchableOpacity className="flex-row items-center bg-[#FD6B1C] px-6 py-3 rounded-full shadow-sm">
                <MaterialIcons name="add" size={20} color="white" />
                <Text className="font-montserrat-semibold text-[14px] text-white ml-2">Tambah Destinasi</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View className={`absolute bottom-0 w-full px-4 py-4 border-t ${isDark ? 'bg-dark-bg/90 border-dark-border' : 'bg-surface/90 border-border'} backdrop-blur-md`}>
        <TouchableOpacity className="w-full bg-[#a43e00] py-4 rounded-xl items-center flex-row justify-center shadow-sm">
          <MaterialIcons name="save" size={20} color="white" />
          <Text className="font-montserrat-semibold text-[16px] text-white ml-2">Simpan Itinerary</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}
