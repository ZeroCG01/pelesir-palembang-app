import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SafeArea } from '../../src/components/layout/SafeArea';
import ImageCarousel from '../../src/components/common/ImageCarousel';
import Button from '../../src/components/common/Button';
import Input from '../../src/components/common/Input';
import LoginModal from '../../src/components/common/LoginModal';
import { useAuthStore } from '../../src/stores/authStore';
import { useThemeStore } from '../../src/stores/themeStore';
import { useFavoriteStore } from '../../src/stores/favoriteStore';
import { useDestinationDetail } from '../../src/hooks/useDestinationDetail';
import { useRealtimeReviews } from '../../src/hooks/useRealtimeReviews';
import { formatCurrency } from '../../src/utils/i18n';
import { useLanguageStore } from '../../src/stores/languageStore';
import { ItineraryPickerModal } from '../../src/components/itinerary/ItineraryPickerModal';
import ReviewInput from '../../src/components/destination/ReviewInput';
import Toast from '../../src/components/common/Toast';

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { user, isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  
  const { destination, isLoading, error } = useDestinationDetail(id);
  const { reviews, isLoading: loadingReviews, submitReview } = useRealtimeReviews(id);

  const [activeTab, setActiveTab] = useState('info');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const { isFavorite: checkIsFavorite, toggleFavorite } = useFavoriteStore();
  
  const isFavorited = destination ? checkIsFavorite(destination.id) : false;

  // Review state
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Tab definitions with translation keys
  const tabs = [
    { key: 'info', label: t('dest_tab_info') },
    { key: 'reviews', label: t('dest_tab_reviews') },
    { key: 'facilities', label: t('dest_tab_facilities') },
  ];

  if (isLoading) {
    return (
      <View className={isDark ? "flex-1 justify-center items-center bg-dark-bg" : "flex-1 justify-center items-center bg-white"}>
        <ActivityIndicator size="large" color="#FD6B1C" />
      </View>
    );
  }

  if (error || !destination) {
    return (
      <View className={isDark ? "flex-1 justify-center items-center bg-dark-bg px-6" : "flex-1 justify-center items-center bg-white px-6"}>
        <Text className="text-xl font-montserrat-bold mb-4">{t('dest_not_found')}</Text>
        <Button title={t('dest_back')} onPress={() => router.back()} />
      </View>
    );
  }

  const images = destination.image_urls || [];
  const description = language === 'id' ? destination.description_id : destination.description_en;

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    await toggleFavorite(destination.id);
  };

  const handleAddItinerary = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setShowItineraryModal(true);
  };

  const handleSubmitReview = async (rating, comment) => {
    if (!isAuthenticated || !user) return false;
    
    setIsSubmittingReview(true);
    const result = await submitReview(rating, comment, user.id);
    setIsSubmittingReview(false);
    
    if (result.success) {
      return true;
    } else {
      Alert.alert(t('chat_failed'), result.message || t('dest_review_failed'));
      return false;
    }
  };

  return (
    <SafeArea className="flex-1" edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} bounces={false}>
        
        {/* Header Image Carousel */}
        <View className="relative">
          <ImageCarousel images={images.filter(Boolean)} height={350} />
          
          {/* Top Overlays */}
          <View className="absolute top-12 left-4 right-4 flex-row justify-between z-10">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-black/40 items-center justify-center backdrop-blur-md"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-black/40 items-center justify-center backdrop-blur-md"
              onPress={handleToggleFavorite}
            >
              <Ionicons name={isFavorited ? "star" : "star-outline"} size={22} color={isFavorited ? "#FD6B1C" : "#FFFFFF"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Body */}
        <View className={isDark ? "px-6 pt-6 -mt-6 bg-dark-bg rounded-t-3xl" : "px-6 pt-6 -mt-6 bg-white rounded-t-3xl"}>
          <View className="flex-row items-center justify-between mb-2">
            {destination.category && (
              <View className="bg-primary/10 px-3 py-1 rounded-pill">
                <Text className="text-primary font-montserrat-medium text-xs">
                  {destination.category ? destination.category.charAt(0).toUpperCase() + destination.category.slice(1) : ''}
                </Text>
              </View>
            )}
            
            <View className="flex-row items-center">
              <Ionicons name="star" size={18} color="#F1721D" />
              <Text className={isDark ? "font-montserrat-bold text-base text-white ml-1" : "font-montserrat-bold text-base text-body ml-1"}>
                {destination.rating?.toFixed(1) || '0.0'}
              </Text>
              <Text className={isDark ? "font-montserrat text-sm text-gray-400 ml-1" : "font-montserrat text-sm text-body-secondary ml-1"}>
                ({destination.review_count || 0})
              </Text>
            </View>
          </View>

          <Text className={isDark ? "font-montserrat-extrabold text-3xl text-white mb-4" : "font-montserrat-extrabold text-3xl text-body mb-4"}>
            {destination.name}
          </Text>

          <Button 
            onPress={handleAddItinerary} 
            className="w-full flex-row items-center justify-center mb-6"
          >
            <Ionicons name="add-circle" size={20} color="white" style={{ marginRight: 8 }} />
            <Text className="font-montserrat-semibold text-white">{t('dest_add_itinerary')}</Text>
          </Button>

          {/* Tab Navigation */}
          <View className={isDark ? "flex-row border-b border-gray-700 mb-6" : "flex-row border-b border-border mb-6"}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity 
                  key={tab.key}
                  className={isActive ? "flex-1 items-center pb-3 border-b-2 border-primary" : "flex-1 items-center pb-3 border-b-2 border-transparent"}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <Text className={isActive ? "font-montserrat-bold text-base text-primary" : (isDark ? "font-montserrat-bold text-base text-gray-400" : "font-montserrat-bold text-base text-body-secondary")}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tab Content: Info */}
          {activeTab === 'info' && (
            <View className="gap-y-6">
              <Text className={isDark ? "font-montserrat text-base text-gray-300 leading-7" : "font-montserrat text-base text-body-secondary leading-7"}>
                {description || t('dest_no_description')}
              </Text>

              <View className={isDark ? "gap-y-4 bg-dark-surface p-4 rounded-card" : "gap-y-4 bg-gray-50 p-4 rounded-card"}>
                <View className="flex-row items-center">
                  <Ionicons name="location" size={20} color="#0078A8" className="mr-3" />
                  <Text className={isDark ? "font-montserrat flex-1 text-white ml-3" : "font-montserrat flex-1 text-body ml-3"}>
                    {destination.address || destination.city}
                  </Text>
                </View>
                
                <View className="flex-row items-center">
                  <Ionicons name="time" size={20} color="#0078A8" className="mr-3" />
                  <Text className={isDark ? "font-montserrat flex-1 text-white ml-3" : "font-montserrat flex-1 text-body ml-3"}>
                    {destination.operating_hours || '08:00 - 17:00'}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Ionicons name="ticket" size={20} color="#0078A8" className="mr-3" />
                  <Text className={isDark ? "font-montserrat flex-1 text-white ml-3" : "font-montserrat flex-1 text-body ml-3"}>
                    {destination.price_max > 0 ? (destination.price_min === destination.price_max ? formatCurrency(destination.price_min) : `${formatCurrency(destination.price_min)} - ${formatCurrency(destination.price_max)}`) : t('dest_free')}
                  </Text>
                </View>

                {/* Route Button */}
                <Button 
                  className="w-full mt-4 flex-row items-center justify-center" 
                  onPress={() => router.push({ pathname: '/(tabs)/map', params: { destination: destination.name } })}
                >
                  <Text className="font-montserrat-semibold text-white mr-2">{t('dest_see_route')}</Text>
                  <Ionicons name="location" size={18} color="white" />
                </Button>
              </View>

              {destination.lrt_accessible && (
                <View className={isDark ? "flex-row items-center bg-blue-900/30 p-3 rounded-lg border border-blue-800" : "flex-row items-center bg-blue-50 p-3 rounded-lg border border-blue-200"}>
                  <Ionicons name="train" size={24} color="#0078A8" />
                  <View className="ml-3 flex-1">
                    <Text className={isDark ? "font-montserrat-bold text-blue-300" : "font-montserrat-bold text-[#0078A8]"}>{t('dest_lrt_accessible')}</Text>
                    <Text className={isDark ? "font-montserrat text-xs text-blue-200/70" : "font-montserrat text-xs text-body-secondary"}>
                      {t('dest_lrt_nearby')}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Tab Content: Ulasan */}
          {activeTab === 'reviews' && (
            <View>
              {/* Form Tambah Ulasan */}
              {isAuthenticated ? (
                <ReviewInput 
                  onSubmit={handleSubmitReview}
                  isSubmitting={isSubmittingReview}
                />
              ) : (
                <TouchableOpacity 
                  className={isDark ? "bg-gray-800 p-4 rounded-card mb-6 items-center border border-dashed border-gray-600" : "bg-gray-100 p-4 rounded-card mb-6 items-center border border-dashed border-gray-300"}
                  onPress={() => setShowLoginModal(true)}
                >
                  <Text className={isDark ? "font-montserrat text-gray-400" : "font-montserrat text-body-secondary"}>
                    {t('dest_login_review')}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Daftar Ulasan */}
              {loadingReviews ? (
                <ActivityIndicator color="#FD6B1C" />
              ) : reviews.length === 0 ? (
                <Text className={isDark ? "font-montserrat text-center text-gray-400 py-8" : "font-montserrat text-center text-body-secondary py-8"}>
                  {t('dest_no_reviews')}
                </Text>
              ) : (
                reviews.map((rev) => (
                  <View key={rev.id} className={isDark ? "border-b border-gray-700 py-4" : "border-b border-border py-4"}>
                    <View className="flex-row items-center mb-2">
                      <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                        <Text className="font-montserrat-bold text-primary">{rev.user?.full_name?.charAt(0) || 'U'}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className={isDark ? "font-montserrat-bold text-white" : "font-montserrat-bold text-body"}>{rev.user?.full_name || 'User'}</Text>
                        <View className="flex-row items-center mt-0.5">
                          {[1,2,3,4,5].map(star => (
                            <Ionicons key={star} name={star <= rev.rating ? "star" : "star-outline"} size={12} color="#F1721D" />
                          ))}
                        </View>
                      </View>
                      <Text className={isDark ? "font-montserrat text-xs text-gray-400" : "font-montserrat text-xs text-body-secondary"}>
                        {new Date(rev.created_at).toLocaleDateString()}
                      </Text>
                    </View>
                    <Text className={isDark ? "font-montserrat text-gray-300 mt-2 leading-6" : "font-montserrat text-body mt-2 leading-6"}>
                      {rev.comment}
                    </Text>
                  </View>
                ))
              )}
            </View>
          )}

          {/* Tab Content: Fasilitas */}
          {activeTab === 'facilities' && (
            <View className="flex-row flex-wrap">
              {destination.facilities?.length > 0 ? (
                destination.facilities.map((fac, idx) => (
                  <View key={idx} className="w-1/2 flex-row items-center mb-4 pr-2">
                    <View className={isDark ? "w-10 h-10 rounded-full bg-gray-800 items-center justify-center mr-3" : "w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3"}>
                      <Ionicons name="checkmark-circle" size={20} color="#0078A8" />
                    </View>
                    <Text className={isDark ? "font-montserrat text-white flex-1 flex-wrap" : "font-montserrat text-body flex-1 flex-wrap"}>
                      {fac}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className={isDark ? "font-montserrat text-gray-400 w-full text-center py-8" : "font-montserrat text-body-secondary w-full text-center py-8"}>
                  {t('dest_no_facilities')}
                </Text>
              )}
            </View>
          )}

        </View>
      </ScrollView>

      <LoginModal 
        visible={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        message={t('dest_must_login')}
      />

      <ItineraryPickerModal 
        visible={showItineraryModal}
        onClose={() => setShowItineraryModal(false)}
        destination={destination}
      />
    </SafeArea>
  );
}
