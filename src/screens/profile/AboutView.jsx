import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea } from '../../components/layout/SafeArea';
import { useThemeStore } from '../../stores/themeStore';
import { useTranslation } from 'react-i18next';

export default function AboutView({ onBack }) {
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
          {t('about_title')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, alignItems: 'center' }}>
        
        {/* Logo Placeholder */}
        <View className="w-28 h-28 rounded-3xl bg-primary/20 items-center justify-center mt-8 mb-6 border-2 border-primary/30">
          <Ionicons name="map" size={56} color="#FD6B1C" />
        </View>

        <Text className="font-montserrat-bold text-3xl text-body dark:text-white mb-2">
          Pelesir Palembang
        </Text>
        <Text className="font-montserrat text-base text-primary mb-8 font-semibold">
          {t('about_version')}
        </Text>

        <View className={`w-full p-6 rounded-2xl border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-gray-50 border-gray-200'}`}>
          <Text className={`font-montserrat text-sm leading-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('about_desc_1')}
            {'\n\n'}
            {t('about_desc_2')}
          </Text>
        </View>

        <View className="w-full mt-8">
          <Text className="font-montserrat-semibold text-sm text-gray-500 uppercase tracking-widest mb-4 text-center">
            {t('about_developed_by')}
          </Text>
          <Text className="font-montserrat-bold text-lg text-body dark:text-white text-center">
            Pelesir Team
          </Text>
          <Text className="font-montserrat text-sm text-gray-500 text-center mt-1">
            {t('about_copyright')}
          </Text>
        </View>

      </ScrollView>
    </SafeArea>
  );
}
