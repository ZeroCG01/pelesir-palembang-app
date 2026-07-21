import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { SafeArea } from '../../src/components/layout/SafeArea';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../src/stores/themeStore';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../src/components/home/SearchBar';
import FilterChips from '../../src/components/home/FilterChips';
import DestinationCard from '../../src/components/home/DestinationCard';
import { useDestinationStore } from '../../src/stores/destinationStore';
import { useAuthStore } from '../../src/stores/authStore';

// Fisher-Yates shuffle (returns a new array, does not mutate)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HomeScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  const { destinations, isLoading, fetchDestinations } = useDestinationStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Determine user's first name
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || t('home_guest');
  const firstName = fullName.includes('@') ? fullName.split('@')[0] : fullName.split(' ')[0];

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Simple filtering
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesCategory = false;
    if (selectedCategory === 'all') {
      matchesCategory = true;
    } else if (selectedCategory === 'populer') {
      matchesCategory = dest.is_hidden_gem === false;
    } else if (selectedCategory === 'hidden_gem') {
      matchesCategory = dest.is_hidden_gem === true;
    } else {
      matchesCategory = dest.category === selectedCategory;
    }
    return matchesSearch && matchesCategory;
  });

  // Shuffle once when destinations data changes (ie on app load), not on every re-render
  const popularDestinations = useMemo(() => {
    const popular = filteredDestinations.filter(d => d.is_hidden_gem === false);
    return shuffleArray(popular).slice(0, 5);
  }, [destinations, selectedCategory, searchQuery]);

  const displayHiddenGems = useMemo(() => {
    const gems = filteredDestinations.filter(d => d.is_hidden_gem === true);
    const shuffled = shuffleArray(gems.length > 0 ? gems : filteredDestinations);
    return shuffled.slice(0, 5);
  }, [destinations, selectedCategory, searchQuery]);

  return (
    <SafeArea className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
      {/* Top App Bar */}
      <View className="w-full flex-row justify-between items-center px-4 h-14 mt-2">
        <View className="w-10" />
        <Text className="font-montserrat-extrabold text-[20px] text-primary">
          Pelesir Palembang
        </Text>
        <TouchableOpacity className="p-2 -mr-2 rounded-full" onPress={toggleTheme}>
          <MaterialIcons name={isDark ? "light-mode" : "dark-mode"} size={24} color="#FD6B1C" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }} // Space for Bottom Tabs
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Section */}
        <View className="px-4 pt-4 pb-6 flex-row justify-between items-start">
          <View>
            <Text className={`font-montserrat-bold text-[28px] ${isDark ? 'text-white' : 'text-body'}`}>
              {t('home_greeting', { name: firstName })}
            </Text>
            <Text className={`font-montserrat text-[16px] mt-1 ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
              {t('home_greeting_sub')}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-6">
          <SearchBar 
            placeholder={t('home_search_placeholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Chips */}
        <View className="pl-4 mb-8">
          <FilterChips 
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </View>

        {isLoading ? (
          <View className="py-10 items-center justify-center">
            <ActivityIndicator size="large" color="#FD6B1C" />
          </View>
        ) : (searchQuery.trim() !== '' || selectedCategory !== 'all') ? (
          <View className="px-4 mb-8">
            <Text className={`font-montserrat-bold text-[18px] mb-4 ${isDark ? 'text-white' : 'text-body'}`}>
              {t('home_search_results')} ({filteredDestinations.length})
            </Text>
            <View className="flex-col gap-4">
              {filteredDestinations.map((dest) => (
                <DestinationCard 
                  key={dest.id}
                  id={dest.id}
                  title={dest.name}
                  imageUri={dest.image_urls?.[0]}
                  category={dest.category}
                  rating={dest.rating?.toString()}
                  distance="1.2 km dari Anda"
                  isLarge={true}
                  isHiddenGem={dest.is_hidden_gem}
                  onPress={() => router.push(`/destination/${dest.id}`)}
                />
              ))}
              {filteredDestinations.length === 0 && (
                 <Text className={`font-montserrat text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} italic text-center py-10`}>
                   {t('home_no_search_results')}
                 </Text>
              )}
            </View>
          </View>
        ) : (
          <>
            {/* Popular Destinations */}
            <View className="pl-4 mb-8">
              <Text className={`font-montserrat-bold text-[22px] mb-4 ${isDark ? 'text-white' : 'text-body'}`}>
                {t('home_popular_destinations')}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
                {popularDestinations.map((dest) => (
                  <DestinationCard 
                    key={dest.id}
                    id={dest.id}
                    title={dest.name}
                    imageUri={dest.image_urls?.[0]}
                    category={dest.category}
                    rating={dest.rating?.toString()}
                    distance="1.2 km dari Anda"
                    isHiddenGem={dest.is_hidden_gem}
                    onPress={() => router.push(`/destination/${dest.id}`)}
                  />
                ))}
                {popularDestinations.length === 0 && (
                   <Text className={`font-montserrat text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} italic`}>{t('home_no_destinations')}</Text>
                )}
              </ScrollView>
            </View>

            {/* Hidden Gems Bento Grid */}
            <View className="px-4 mb-8">
              <View className="flex-row items-center mb-4">
                <MaterialIcons name="diamond" size={24} color="#FD6B1C" />
                <Text className={`font-montserrat-bold text-[22px] ml-2 ${isDark ? 'text-white' : 'text-body'}`}>
                  {t('home_our_recommendations')}
                </Text>
              </View>
              
              <View className="flex-col gap-4">
                {displayHiddenGems.map((dest) => (
                  <DestinationCard 
                    key={dest.id}
                    id={dest.id}
                    title={dest.name}
                    imageUri={dest.image_urls?.[0]}
                    category={dest.category}
                    rating={dest.rating?.toString()}
                    distance="2.5 km dari Anda"
                    isLarge={true}
                    isHiddenGem={dest.is_hidden_gem}
                    onPress={() => router.push(`/destination/${dest.id}`)}
                  />
                ))}
              </View>
            </View>
          </>
        )}

      </ScrollView>
    </SafeArea>
  );
}
