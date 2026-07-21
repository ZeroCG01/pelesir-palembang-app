import React, { useState } from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../src/stores/languageStore';
import { useThemeStore } from '../../src/stores/themeStore';
import { useAuthStore } from '../../src/stores/authStore';
import Button from '../../src/components/common/Button';
import Input from '../../src/components/common/Input';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { theme } = useThemeStore();
  const { signIn, signInWithGoogle } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const isDark = theme === 'dark';

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Silakan isi email dan password terlebih dahulu');
      return;
    }
    try {
      setLoading(true);
      await signIn(email.trim(), password);
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Login Gagal', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      // Router akan diganti secara otomatis jika listener auth mendeteksi perubahan state
      router.replace('/(tabs)/home');
    } catch (error) {
      if (error.message !== 'Login dibatalkan oleh pengguna') {
        Alert.alert('Google Login Gagal', error.message);
      }
    } finally {
      setGoogleLoading(false);
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

        <TouchableOpacity 
          className="absolute top-12 left-6 w-10 h-10 bg-white/20 rounded-full items-center justify-center z-10"
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyItems: 'center', justifyContent: 'center', padding: 16 }}>
          <View className="w-full max-w-[400px] self-center bg-white dark:bg-dark-surface rounded-card p-6 shadow-card items-center">
            
            <View className="mb-8 text-center items-center">
              <Text className="font-montserrat-bold text-[22px] text-primary">{t('auth_explore')}</Text>
              <Text className={`font-montserrat text-[12px] mt-1 ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
                {t('auth_explore_sub')}
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
              <Input 
                icon="lock" 
                placeholder={t('auth_password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <View className="w-full items-end mt-2">
                <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                  <Text className="font-montserrat-medium text-[14px] text-primary">
                    {t('auth_forgot_password')}
                  </Text>
                </TouchableOpacity>
              </View>

              <Button 
                className="w-full mt-6"
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="white" /> : t('auth_login')}
              </Button>
            </View>

            <View className="w-full flex-row items-center gap-3 my-6">
              <View className={`flex-1 h-px ${isDark ? 'bg-dark-border' : 'bg-border'}`} />
              <Text className={`font-montserrat text-[12px] uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('auth_or')}
              </Text>
              <View className={`flex-1 h-px ${isDark ? 'bg-dark-border' : 'bg-border'}`} />
            </View>

            <Button 
              variant="secondary"
              className="w-full"
              onPress={handleGoogleLogin}
              disabled={loading || googleLoading}
            >
              {googleLoading ? <ActivityIndicator color="#FD6B1C" /> : t('auth_login_google')}
            </Button>

            <View className="mt-6 flex-row flex-wrap justify-center">
              <Text className={`font-montserrat text-[14px] ${isDark ? 'text-gray-300' : 'text-body-secondary'}`}>
                {t('auth_no_account')}{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="font-montserrat-semibold text-[14px] text-primary">
                  {t('auth_register')}
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
