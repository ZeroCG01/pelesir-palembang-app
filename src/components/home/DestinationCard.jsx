import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../stores/themeStore';
import FavoriteButton from '../common/FavoriteButton';

export default function DestinationCard({ 
  id,
  title, 
  imageUri = 'https://via.placeholder.com/400x300?text=No+Image', 
  category, 
  rating, 
  distance, 
  onPress,
  isLarge = false,
  favoriteVariant = 'star',
  isHiddenGem = false
}) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  if (isLarge) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.8}
        className="w-full relative rounded-xl overflow-hidden h-48 shadow-card mb-4"
      >
        <Image 
          source={{ uri: imageUri }} 
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/40" />
        
        <View className="absolute top-2 right-2 rounded-full bg-black/20 backdrop-blur-md">
          <FavoriteButton destinationId={id} size={20} variant={favoriteVariant} />
        </View>

        <View className="absolute bottom-0 left-0 p-4 w-full flex-row justify-between items-end">
          <View>
            {isHiddenGem && (
              <View className="bg-primary px-2 py-1 rounded mb-2 self-start flex-row items-center">
                <MaterialIcons name="diamond" size={12} color="white" />
                <Text className="font-montserrat text-[10px] text-white ml-1">Gem</Text>
              </View>
            )}
            <Text className="font-montserrat-semibold text-[16px] text-white">{title}</Text>
          </View>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      className={`w-[280px] rounded-xl shadow-card border mr-4 overflow-hidden
        ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'}
      `}
    >
      <View className="relative h-40 w-full">
        <Image 
          source={{ uri: imageUri }} 
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-3 left-3 bg-primary px-2 py-1 rounded">
          <Text className="font-montserrat text-[10px] text-white">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}
          </Text>
        </View>
        <View className="absolute top-1 right-1 rounded-full bg-black/30 backdrop-blur-md">
          <FavoriteButton destinationId={id} size={18} variant={favoriteVariant} />
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className={`font-montserrat-bold text-[16px] flex-1 mr-2 ${isDark ? 'text-white' : 'text-body'}`} numberOfLines={1}>
            {title}
          </Text>
          <View className="flex-row items-center">
            <MaterialIcons name="star" size={16} color="#F59E0B" />
            <Text className={`font-montserrat-medium text-[12px] ml-1 ${isDark ? 'text-white' : 'text-body'}`}>
              {rating}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <MaterialIcons name="location-on" size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text className={`font-montserrat text-[12px] ml-1 ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
            {distance}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
