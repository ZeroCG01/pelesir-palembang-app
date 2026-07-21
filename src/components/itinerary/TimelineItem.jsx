import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

export const TimelineItem = ({ 
  destination, 
  dayNumber,
  index,
  onRemove, 
  isLast = false,
  onTimeChange 
}) => {
  const router = useRouter();
  const imageUrl = destination?.image_urls?.[0] || 'https://via.placeholder.com/150';
  const time = destination?.time || '08:00';
  const [showPicker, setShowPicker] = useState(false);

  // parse time "08:00" to Date object
  const dateObj = new Date();
  const [hours, minutes] = time.split(':');
  dateObj.setHours(parseInt(hours || 8, 10));
  dateObj.setMinutes(parseInt(minutes || 0, 10));

  const handleTimeChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      const h = selectedDate.getHours().toString().padStart(2, '0');
      const m = selectedDate.getMinutes().toString().padStart(2, '0');
      if (onTimeChange) onTimeChange(dayNumber, index, `${h}:${m}`);
    }
  };

  return (
    <View className="flex-row mb-6 relative">
      {/* Time Editor */}
      <TouchableOpacity 
        className="w-12 items-end mt-[18px]" 
        onPress={() => setShowPicker(true)}
      >
        <Text className="font-montserrat-bold text-primary text-sm">{time}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dateObj}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {/* Timeline Line & Dot */}
      <View className="items-center mx-3 mt-5">
        <View className="w-3 h-3 rounded-full bg-primary z-10" />
        {!isLast && <View className="w-[2px] h-[120%] bg-[#E5E7EB] dark:bg-gray-700 absolute top-3" />}
      </View>

      {/* Content Card */}
      <View className="flex-1 bg-white dark:bg-[#202020] rounded-2xl p-3 flex-row shadow-sm border border-gray-100 dark:border-gray-800 relative">
        <Image 
          source={{ uri: imageUrl }}
          className="w-20 h-20 rounded-xl bg-gray-200"
          contentFit="cover"
        />
        
        <View className="flex-1 ml-3 pr-8 justify-center">
          <Text className="font-montserrat-bold text-[15px] text-body dark:text-white mb-1" numberOfLines={2}>
            {destination?.name || 'Destinasi Tidak Dikenal'}
          </Text>
          <View className="flex-row items-center mb-1">
            <Ionicons name="location-outline" size={12} color="#888" />
            <Text className="font-montserrat text-[11px] text-gray-500 dark:text-gray-400 ml-1">
              {destination?.category ? destination.category.charAt(0).toUpperCase() + destination.category.slice(1) : 'Landmark Utama'}
            </Text>
          </View>
          <Text className="font-montserrat-semibold text-[11px] text-primary">
            Estimasi: 1-2 Jam
          </Text>
        </View>

        {/* Remove Button */}
        <TouchableOpacity 
          className="absolute top-2 right-2 p-1"
          onPress={onRemove}
        >
          <Ionicons name="close" size={18} color="#888" />
        </TouchableOpacity>

        {/* Detail Button */}
        <TouchableOpacity 
          className="absolute bottom-2 right-2 p-1 bg-primary/10 rounded-full"
          onPress={() => router.push(`/destination/${destination?.id}`)}
        >
          <Ionicons name="arrow-forward" size={18} color="#FD6B1C" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimelineItem;
