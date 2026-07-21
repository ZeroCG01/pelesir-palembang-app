import { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ActivityIndicator, Animated, Image } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../src/stores/authStore';
import { useLanguageStore } from '../src/stores/languageStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

export default function Index() {
  const { isLoading } = useAuthStore();
  const { t } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Restore saved language preference
        const savedLangData = await AsyncStorage.getItem('language-storage');
        if (savedLangData) {
          const parsed = JSON.parse(savedLangData);
          if (parsed?.state?.language) {
            useLanguageStore.getState().setLanguage(parsed.state.language);
          }
        }

        // Artificial delay for splash screen visibility
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        
        // Ensure auth is loaded
        if (!isLoading) {
          if (hasLaunched === null) {
            router.replace('/(auth)/onboarding');
          } else {
            router.replace('/(tabs)/home');
          }
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
        router.replace('/(tabs)/home');
      }
    }

    prepareApp();
  }, [isLoading]);

  return (
    <View className="flex-1 bg-dark-bg">
      <ImageBackground 
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTTD_gR_OsmenmsN98NsVYGxOSTB4oMkVDUvbNnRsjQmtAuGFGQkLiVXcqcqomsaZNSvBD4PP1WQtE-EGMI8JaCfF-THWPmfvFzCkBEgAk5RJTc-CSQ8hXWZT962oPmlgcneL4U8zYHIMDCUf36KdtluZZIfe9-c3iv7mtoBq8uYB7da837yO61xf_HuVHINWjYawaVBwcP_fjIf0DcQmiUp-btb0xl7BwtUiM_Zn1HWMzG4IWe_VXVT5rar-E8G6Tn2eP6jML' }}
        className="flex-1 w-full h-full justify-center items-center relative"
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(26,26,26,0.2)', 'rgba(26,26,26,0.7)', 'rgba(26,26,26,1)']}
          className="absolute inset-0 z-10"
        />

        {/* Main Content */}
        <View className="z-20 items-center justify-center w-full px-4 flex-1">
          {/* Brand Logo */}
          <View className="items-center justify-center mb-4 shadow-xl">
            <Image 
              source={require('../assets/images/logo.png')} 
              style={{ width: 160, height: 160 }} 
              resizeMode="contain" 
            />
          </View>

          {/* App Name */}
          <Text className="font-montserrat-extrabold text-[32px] text-white text-center tracking-tight mb-3">
            Pelesir Palembang
          </Text>

          {/* Tagline */}
          <Text className="font-montserrat-bold text-[18px] text-gray-300 text-center max-w-[280px]">
            {t('onboarding_title')}
          </Text>
        </View>

        {/* Loading Indicator */}
        <View className="absolute bottom-12 z-20 items-center w-full px-12">
          <ActivityIndicator size="large" color="#FD6B1C" className="mb-4" />
          <View className="w-48 h-1 bg-gray-500/30 rounded-full overflow-hidden">
            <View className="h-full w-1/3 bg-primary rounded-full" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
