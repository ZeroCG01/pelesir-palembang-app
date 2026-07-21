import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeArea } from '../../components/layout/SafeArea';
import { useThemeStore } from '../../stores/themeStore';
import { useTranslation } from 'react-i18next';

export default function PrivacyView({ onBack }) {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

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
          {t('priv_title')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        
        <View className="mb-8 items-center mt-4">
          <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-dark-surface' : 'bg-primary/10'}`}>
            <MaterialIcons name="security" size={32} color="#FD6B1C" />
          </View>
          <Text className="font-montserrat-bold text-2xl text-body dark:text-white mb-2 text-center">
            {t('priv_heading')}
          </Text>
          <Text className="font-montserrat text-sm text-body-secondary dark:text-gray-400 text-center">
            {t('priv_last_updated')}
          </Text>
        </View>

        <Text className={`font-montserrat-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-body'}`}>
          {t('priv_sec1_title')}
        </Text>
        <Text className={`font-montserrat text-[14px] leading-6 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('priv_sec1_desc')}
        </Text>

        <Text className={`font-montserrat-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-body'}`}>
          {t('priv_sec2_title')}
        </Text>
        <Text className={`font-montserrat text-[14px] leading-6 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('priv_sec2_desc')}
        </Text>

        <Text className={`font-montserrat-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-body'}`}>
          {t('priv_sec3_title')}
        </Text>
        <Text className={`font-montserrat text-[14px] leading-6 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('priv_sec3_desc')}
        </Text>

        <Text className={`font-montserrat-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-body'}`}>
          {t('priv_sec4_title')}
        </Text>
        <Text className={`font-montserrat text-[14px] leading-6 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('priv_sec4_desc')}
        </Text>

        <Text className={`font-montserrat-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-body'}`}>
          {t('priv_sec5_title')}
        </Text>
        <Text className={`font-montserrat text-[14px] leading-6 mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('priv_sec5_desc')}
        </Text>

        <View className={`w-full p-4 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-gray-50 border-gray-200'}`}>
          <Text className={`font-montserrat text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('priv_footer')}
          </Text>
        </View>

      </ScrollView>
    </SafeArea>
  );
}
