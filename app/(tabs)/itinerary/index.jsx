import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { SafeArea } from '../../../src/components/layout/SafeArea';
import Button from '../../../src/components/common/Button';
import { useAuthStore } from '../../../src/stores/authStore';
import { useItineraryStore } from '../../../src/stores/itineraryStore';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';

export default function ItineraryListScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { itineraries, isLoading, fetchItineraries } = useItineraryStore();
  const { t } = useTranslation();

  // Fetch Itineraries
  useEffect(() => {
    if (user?.id) fetchItineraries(user.id);
  }, [user?.id]);

  // Jika belum login
  if (!isAuthenticated) {
    return (
      <SafeArea className="flex-1 bg-white dark:bg-dark-bg justify-center px-6">
        <View className="items-center">
          <Text className="text-6xl leading-normal pt-2 mb-6">🔒</Text>
          <Text className="font-montserrat-bold text-2xl text-body dark:text-white mb-2 text-center">
            {t('itinerary_login_required')}
          </Text>
          <Text className="font-montserrat text-body-secondary dark:text-gray-400 text-center mb-8">
            {t('itinerary_login_desc')}
          </Text>
          <Button 
            onPress={() => router.push('/(auth)/login')}
            className="w-full"
          >
            {t('itinerary_login_now')}
          </Button>
        </View>
      </SafeArea>
    );
  }

  if (isLoading) {
    return (
      <SafeArea className="flex-1 bg-white dark:bg-dark-bg justify-center items-center">
        <ActivityIndicator size="large" color="#FD6B1C" />
      </SafeArea>
    );
  }

  if (itineraries.length > 0) {
    // Langsung redirect ke itinerary pertama yang dimiliki user
    return <Redirect href={`/(tabs)/itinerary/${itineraries[0].id}`} />;
  }

  // Empty State
  return (
    <SafeArea className="flex-1 bg-white dark:bg-dark-bg">
      <View className="flex-1 justify-center items-center px-6">
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8205/8205255.png' }}
          className="w-40 h-40 mb-6 opacity-80"
          contentFit="contain"
        />
        <Text className="font-montserrat-bold text-xl text-body dark:text-white mb-2 text-center">
          {t('itinerary_empty_title')}
        </Text>
        <Text className="font-montserrat text-body-secondary dark:text-gray-400 text-center mb-8">
          {t('itinerary_empty_desc')}
        </Text>
        <Button 
          onPress={() => router.push('/itinerary/create')}
        >
          {t('itinerary_create_new')}
        </Button>
      </View>
    </SafeArea>
  );
}
