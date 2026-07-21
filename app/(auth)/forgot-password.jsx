import React, { useState } from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../src/stores/languageStore';
import { useThemeStore } from '../../src/stores/themeStore';
import { useAuthStore } from '../../src/stores/authStore';
import Button from '../../src/components/common/Button';
import Input from '../../src/components/common/Input';
import { validateEmail } from '../../src/utils/helpers';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { theme } = useThemeStore();
  const { resetPassword } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const isDark = theme === 'dark';

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Silakan isi email Anda terlebih dahulu / Please enter your email first');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Format email tidak valid / Invalid email format');
      return;
    }

    try {
      setLoading(true);
      const result = await resetPassword(email);
      
      if (result && result.success) {
        Alert.alert(
          'Email Terkirim',
          `Link untuk mereset password telah dikirim ke ${email}.`,
          [{ text: 'Kembali ke Login', onPress: () => router.back() }]
        );
      } else if (result && result.error) {
         Alert.alert('Gagal', result.error || 'Terjadi kesalahan saat mengirim email reset.');
      } else {
         // Fallback just in case resetPassword doesn't return an object with success/error
         Alert.alert('Sukses', 'Instruksi reset password telah dikirim ke email Anda');
         router.back();
      }
    } catch (error) {
      Alert.alert('Gagal / Failed', error.message || 'Terjadi kesalahan / An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 bg-white dark:bg-dark-bg">
        <ImageBackground 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBco5NbFjR8y7LR7PSXJ4ZGKPV888XTI9FChidgEIeERxTq2rhJckgJAO809gaGMRHlfmWHni21zj7c3srYYq1teGSjix5CV4tHootmU8spWUVazGoZVnb3z060wXOnmnFtILiGnbqoTvQg7BzjlCR80h1JCX0_2lPHJBBbCjJqlo728svzT0v2brmUErx-L5VAsmomLDeubHapfccOMjtGuoWZoE0U5x1P3OvtjvAmBAsZjCLQtIG7xLJhycJhTHVe4c8yQeKu' }}
          className="w-full h-full absolute top-0"
          resizeMode="cover"
        >
          <View className="flex-1 bg-black/50" />
        </ImageBackground>

        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyItems: 'center', justifyContent: 'center', padding: 16 }}>
          <View className="w-full max-w-[400px] self-center bg-white dark:bg-dark-surface rounded-card p-6 shadow-card items-center">
            
            <View className="mb-8 text-center items-center">
              <Text className="font-montserrat-bold text-[22px] text-primary">{t('auth_forgot_title')}</Text>
              <Text className={`font-montserrat text-[12px] mt-1 text-center ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
                {t('auth_forgot_sub')}
              </Text>
            </View>

            <View className="w-full flex-col gap-4">
              <Input 
                icon="mail" 
                placeholder={t('auth_email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Button 
                className="w-full mt-6"
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="white" /> : t('auth_send_reset')}
              </Button>
            </View>

            <View className="mt-6 flex-row flex-wrap justify-center">
              <Text className={`font-montserrat text-[14px] ${isDark ? 'text-gray-300' : 'text-body-secondary'}`}>
                {t('auth_remember_password')}{' '}
              </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="font-montserrat-semibold text-[14px] text-primary">
                  {t('auth_login')}
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <View className="mt-8 flex-row justify-center gap-3">
            <Text 
              onPress={() => setLanguage('id')}
              className={`font-montserrat-bold text-[14px] ${language === 'id' ? 'text-white' : 'text-white/70'}`}
            >
              ID
            </Text>
            <Text className="text-white/70">|</Text>
            <Text 
              onPress={() => setLanguage('en')}
              className={`font-montserrat-bold text-[14px] ${language === 'en' ? 'text-white' : 'text-white/70'}`}
            >
              EN
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
