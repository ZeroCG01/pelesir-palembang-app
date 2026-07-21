import React, { useState } from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../src/stores/languageStore';
import { useThemeStore } from '../../src/stores/themeStore';
import { useAuthStore } from '../../src/stores/authStore';
import Button from '../../src/components/common/Button';
import Input from '../../src/components/common/Input';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { theme } = useThemeStore();
  const { signUp, signInWithGoogle } = useAuthStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const isDark = theme === 'dark';

  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    if (pass.length < 6) return 1;
    let score = 1;
    if (/[a-zA-Z]/.test(pass) && /[0-9]/.test(pass)) score = 2;
    if (score === 2 && pass.length >= 8 && /[^a-zA-Z0-9]/.test(pass)) score = 3;
    return score;
  };

  const passwordStrength = getPasswordStrength(password);

  const getStrengthColor = (level) => {
    if (passwordStrength === 0) return isDark ? 'bg-dark-border' : 'bg-gray-300';
    if (passwordStrength === 1) return level === 1 ? 'bg-red-500' : (isDark ? 'bg-dark-border' : 'bg-gray-300');
    if (passwordStrength === 2) return level <= 2 ? 'bg-yellow-500' : (isDark ? 'bg-dark-border' : 'bg-gray-300');
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return t('auth_password_weak');
    if (passwordStrength === 2) return t('auth_password_medium');
    return t('auth_password_strong');
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Silakan lengkapi semua field terlebih dahulu');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan Konfirmasi Password tidak cocok');
      return;
    }
    if (!acceptedTerms) {
      Alert.alert('Error', 'Silakan setujui Syarat & Ketentuan');
      return;
    }
    try {
      setLoading(true);
      await signUp(email, password, name);
      Alert.alert('Sukses', 'Registrasi berhasil! Silakan login.', [
        { text: 'OK', onPress: () => router.replace('/(auth)/login') }
      ]);
    } catch (error) {
      let errorMessage = error.message;
      try {
        const parsed = JSON.parse(error.message);
        if (parsed.status === 500) {
          errorMessage = 'Terjadi kesalahan pada server (Supabase). Silakan cek pengaturan backend Anda.';
        }
      } catch (e) {
        // Not JSON, keep original message
      }
      Alert.alert('Registrasi Gagal', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      router.replace('/(tabs)/home');
    } catch (error) {
      if (error.message !== 'Login dibatalkan oleh pengguna') {
        Alert.alert('Google Registrasi Gagal', error.message);
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
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKxvuDwg-UnKv8ajEepyLALJjE9CDzSwT5punCWS59X8cxiYm5yEPQOB5SaNA_-81uKqVYkF5SHEMZjDeltDf3Xy5G-WZH4qjrnDYltkRP8tJLYipqeb3b6HkeG2-iAHsoP65N2qs4WDmVxDMox76Nn0-U2n_AtMhnxQ9t75cAY5ULkA_euPPSwDdkUSJo4ziI3n2MzeP49yYsfajS2ksvzMdEP7uXYCZfD7yAx961r4j5Wi_udtREFMbx9jpNSJK9nIwWKyvT' }}
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
          <View className="w-full max-w-[400px] self-center bg-white dark:bg-dark-surface rounded-card p-6 shadow-card items-center mt-10">
            
            <View className="mb-6 text-center items-center">
              <Text className="font-montserrat-bold text-[22px] text-body dark:text-dark-text">
                {t('auth_register_title')}
              </Text>
              <Text className={`font-montserrat text-[12px] mt-1 ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
                {t('auth_register_sub')}
              </Text>
            </View>

            <View className="w-full flex-col gap-4">
              <Input 
                icon="person" 
                placeholder={t('auth_name')}
                value={name}
                onChangeText={setName}
              />
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
              
              <View className="w-full flex-col px-1 -mt-2 mb-2">
                <View className="flex-row gap-1 h-1 w-full mb-1">
                  <View className={`flex-1 rounded-full ${getStrengthColor(1)}`} />
                  <View className={`flex-1 rounded-full ${getStrengthColor(2)}`} />
                  <View className={`flex-1 rounded-full ${getStrengthColor(3)}`} />
                </View>
                <Text className={`font-montserrat text-[10px] text-right ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
                  {getStrengthLabel()}
                </Text>
              </View>

              <Input 
                icon="lock" 
                placeholder={t('auth_confirm_password')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <TouchableOpacity 
                className="flex-row items-center gap-2 mt-2" 
                onPress={() => setAcceptedTerms(!acceptedTerms)}
              >
                <View className={`w-5 h-5 border rounded justify-center items-center ${acceptedTerms ? 'bg-primary border-primary' : (isDark ? 'border-dark-border' : 'border-border')}`}>
                  {acceptedTerms && <MaterialIcons name="check" size={16} color="white" />}
                </View>
                <Text className={`font-montserrat text-[12px] flex-1 ${isDark ? 'text-gray-300' : 'text-body-secondary'}`}>
                  {t('auth_agree_terms')} <Text className="font-montserrat-semibold text-primary">{t('auth_terms')}</Text>
                </Text>
              </TouchableOpacity>

              <Button 
                className="w-full mt-4"
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="white" /> : t('auth_register')}
              </Button>

              <Button 
                variant="secondary"
                className="w-full"
                onPress={handleGoogleLogin}
                disabled={loading || googleLoading}
              >
                {googleLoading ? <ActivityIndicator color="#FD6B1C" /> : t('auth_register_google')}
              </Button>

              <View className="mt-4 flex-row flex-wrap justify-center mb-2">
                <Text className={`font-montserrat text-[14px] ${isDark ? 'text-gray-300' : 'text-body-secondary'}`}>
                  {t('auth_has_account')}{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                  <Text className="font-montserrat-semibold text-[14px] text-primary">
                    {t('auth_login')}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          <View className="mt-6 flex-row justify-center gap-3 mb-10">
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
