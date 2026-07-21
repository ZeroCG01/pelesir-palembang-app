import React, { useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea } from '../../components/layout/SafeArea';
import { useThemeStore } from '../../stores/themeStore';
import { useTranslation } from 'react-i18next';
import DestinationCard from '../../components/home/DestinationCard';
import { useFavoriteStore } from '../../stores/favoriteStore';

export default function FavoritesView({ onBack }) {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  const { favorites, isLoading, fetchFavorites } = useFavoriteStore();

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <SafeArea style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#F5F5F5' }}>
      <View className="flex-row items-center px-6 py-4 border-b border-border dark:border-gray-800">
        <TouchableOpacity 
          className="mr-4 w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="#0078A8" />
        </TouchableOpacity>
        <Text className="font-montserrat-bold text-xl text-body dark:text-white">
          {t('fav_title')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="mb-6">
          <Text className={`font-montserrat-bold text-[28px] ${isDark ? 'text-white' : 'text-body'} mb-1`}>
            {t('fav_heading')}
          </Text>
          <Text className={`font-montserrat text-[14px] ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
            {favorites.length} {t('fav_count')}
          </Text>
        </View>

        {isLoading ? (
          <View className="py-10 items-center justify-center">
            <ActivityIndicator size="large" color="#FD6B1C" />
          </View>
        ) : (
          <View className="flex-col gap-4">
            {favorites.length === 0 ? (
              <Text className={`font-montserrat text-[14px] italic ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
                {t('fav_empty')}
              </Text>
            ) : (
              favorites.map((dest) => (
                <DestinationCard 
                  key={dest.id}
                  id={dest.id}
                  title={dest.name}
                  imageUri={dest.image_urls?.[0]}
                  category={dest.category}
                  rating={dest.rating?.toString() || '0'}
                  distance={t('fav_saved')}
                  isLarge={true}
                  isHiddenGem={dest.is_hidden_gem}
                  favoriteVariant="trash"
                  onPress={() => router.push(`/destination/${dest.id}`)}
                />
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeArea>
  );
}
