import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../src/stores/languageStore';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const insets = useSafeAreaInsets();

  const handleStart = async () => {
    await AsyncStorage.setItem('hasLaunched', 'true');
    router.replace('/(tabs)/home');
  };

  return (
    <View className="flex-1 bg-dark-bg">
      {/* Top Illustration Area */}
      <View className="h-[45%] w-full relative">
        <ImageBackground 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_f3KCPwyFq1H1Y84E20RWTL0RbRWNsXhJLPNDoH4iWF4k0r-eth_JAAZssD6HF6A4IeOdg2SVK7aVQsLD6YI4xGjnPotnQQXWjf1yXXHmLd3qWkoUGX_fAuMyq56BDOCGy3KzGnoQjBlgnYt__mM9Vud7cMoAOguFPARWhxYnieuG8RS17OXyNaaWnn6kAcOFknlTVwkIPGSzXaXVeYNPN7Rk_K5plkBLvVlqJzIHBg_dGWGxqYPkdHf2n5GQZyQ01yr8K5Ms' }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Gradient Overlay for blending into background */}
        <LinearGradient
          colors={['transparent', 'rgba(26,26,26,0.8)', 'rgba(26,26,26,1)']}
          className="absolute inset-0"
        />
      </View>

      {/* Content Area */}
      <View 
        className="flex-1 px-5 pt-0 justify-between z-10 -mt-16"
        style={{ paddingBottom: Math.max(insets.bottom + 16, 32) }}
      >
        
        {/* Heading */}
        <View className="items-center mt-2">
          <Text className="font-montserrat-bold text-[14px] text-primary tracking-widest uppercase mb-2">
            {t('onboarding_welcome_label')}
          </Text>
          <Text className="font-montserrat-extrabold text-[28px] text-white text-center leading-[36px]">
            {t('onboarding_heading')}
          </Text>
          <Text className="font-montserrat text-[16px] text-gray-400 text-center mt-3 leading-[24px]">
            {t('onboarding_subheading')}
          </Text>
        </View>

        {/* Bottom Controls */}
        <View>
          {/* Language Selection Card */}
          <View className="bg-dark-surface rounded-2xl p-4 shadow-lg border border-white/5 mb-6">
            <Text className="font-montserrat-medium text-[14px] text-gray-400 mb-3">
              {t('onboarding_select_language')}
            </Text>

          {/* Indonesian Option */}
          <TouchableOpacity 
            className="flex-row items-center justify-between mb-4"
            onPress={() => setLanguage('id')}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
                <Text className="text-xl">🇮🇩</Text>
              </View>
              <Text className={language === 'id' ? "font-montserrat-semibold text-[16px] text-white" : "font-montserrat-semibold text-[16px] text-gray-400"}>
                Bahasa Indonesia
              </Text>
            </View>
            {language === 'id' && (
              <MaterialIcons name="check-circle" size={24} color="#FD6B1C" />
            )}
          </TouchableOpacity>

          <View className="h-[1px] bg-white/10 w-full mb-4" />

          {/* English Option */}
          <TouchableOpacity 
            className="flex-row items-center justify-between"
            onPress={() => setLanguage('en')}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-white/5 items-center justify-center">
                <Text className="text-xl">🇬🇧</Text>
              </View>
              <Text className={language === 'en' ? "font-montserrat-semibold text-[16px] text-white" : "font-montserrat-semibold text-[16px] text-gray-400"}>
                English
              </Text>
            </View>
            {language === 'en' && (
              <MaterialIcons name="check-circle" size={24} color="#FD6B1C" />
            )}
          </TouchableOpacity>
        </View>

        {/* Call to Action Button */}
        <TouchableOpacity 
          onPress={handleStart}
          className="w-full bg-primary h-[56px] rounded-xl flex-row items-center justify-center shadow-lg"
          style={{ shadowColor: '#FD6B1C', shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 }}
        >
          <Text className="text-white font-montserrat-bold text-[16px] mr-2">
            {t('onboarding_start_button')}
          </Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
