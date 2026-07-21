import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeArea } from '../../components/layout/SafeArea';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';
import { useThemeStore } from '../../stores/themeStore';
import { useTranslation } from 'react-i18next';

export default function ChangePasswordView({ onBack }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { showToast } = useToastStore();
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', t('cp_err_fill_all'));
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', t('cp_err_min_8'));
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', t('cp_err_mismatch'));
      return;
    }

    try {
      setIsSaving(true);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      
      showToast(t('cp_success'), 'success');
      onBack();
    } catch (error) {
      console.error(error);
      Alert.alert(t('chat_failed'), error.message || t('cp_err_fail'));
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <SafeArea style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#F5F5F5' }} className="justify-center items-center px-6">
        <MaterialIcons name="lock-outline" size={64} color="#FD6B1C" className="mb-4" />
        <Text className="font-montserrat-bold text-2xl text-body dark:text-white mb-2 text-center">{t('cp_restricted')}</Text>
        <Text className="font-montserrat text-base text-body-secondary dark:text-gray-300 mb-8 text-center">
          {t('cp_restricted_desc')}
        </Text>
        <Button className="w-full" onPress={() => router.push('/(auth)/login')}>{t('cp_login')}</Button>
        <TouchableOpacity className="mt-4 p-2" onPress={onBack}>
          <Text className="font-montserrat-semibold text-primary">{t('cp_back')}</Text>
        </TouchableOpacity>
      </SafeArea>
    );
  }

  return (
    <SafeArea style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#F5F5F5' }}>
      <View className="flex-row items-center px-6 py-4 border-b border-border dark:border-gray-800">
        <TouchableOpacity 
          className="mr-4 w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="#FD6B1C" />
        </TouchableOpacity>
        <Text className="font-montserrat-bold text-xl text-body dark:text-white">
          {t('cp_title')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        
        {/* Header Icon & Title */}
        <View className="flex-row items-center mb-8">
          <View className={`w-14 h-14 rounded-full items-center justify-center mr-4 ${isDark ? 'bg-dark-surface' : 'bg-gray-100'}`}>
            <Text className="text-primary text-xl font-bold">***</Text>
            <View className="h-[2px] w-6 bg-primary mt-1" />
          </View>
          <View className="flex-1">
            <Text className="font-montserrat-bold text-2xl text-body dark:text-white mb-1">
              {t('cp_heading')}
            </Text>
            <Text className={`font-montserrat text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('cp_subheading')}
            </Text>
          </View>
        </View>

        <View className={`h-[1px] w-full mb-8 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />

        {/* Inputs */}
        <Input 
          label={t('cp_current_pw')}
          placeholder={t('cp_current_pw_ph')}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={true}
          icon="lock"
        />

        <Input 
          label={t('cp_new_pw')}
          placeholder={t('cp_new_pw_ph')}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
          icon="lock"
        />

        <Input 
          label={t('cp_confirm_pw')}
          placeholder={t('cp_confirm_pw_ph')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          icon="lock"
        />

        <View className={`h-[1px] w-full mt-4 mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />

        <View className="flex-row justify-end items-center mt-2">
          <TouchableOpacity 
            className="mr-6"
            onPress={onBack}
          >
            <Text className={`font-montserrat-bold text-base ${isDark ? 'text-white' : 'text-body'}`}>
              {t('cp_cancel')}
            </Text>
          </TouchableOpacity>
          
          <Button 
            className="px-6"
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="white" />
            ) : (
              <View className="flex-row items-center justify-center">
                <MaterialIcons name="save" size={20} color="white" className="mr-2" />
                <Text className="font-montserrat-bold text-base text-white ml-2">
                  {t('cp_save')}
                </Text>
              </View>
            )}
          </Button>
        </View>
        
      </ScrollView>
    </SafeArea>
  );
}
