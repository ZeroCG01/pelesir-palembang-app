import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { SafeArea } from '../../components/layout/SafeArea';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';
import { useTranslation } from 'react-i18next';

export default function EditView({ onBack }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { showToast } = useToastStore();
  const { t } = useTranslation();

  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
    } else {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (!error && data) {
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true
    });

    if (!result.canceled) {
      uploadAvatar(result.assets[0]);
    }
  };

  const uploadAvatar = async (imageAsset) => {
    try {
      setIsSaving(true);
      const fileExt = imageAsset.uri.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const response = await fetch(imageAsset.uri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, {
          contentType: `image/${fileExt}`,
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const newAvatarUrl = publicUrlData.publicUrl;
      setAvatarUrl(newAvatarUrl);

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({ id: user.id, avatar_url: newAvatarUrl });

      if (updateError) throw updateError;
      
      showToast(t('ev_success_avatar'), 'success');
    } catch (error) {
      console.error(error);
      showToast(t('ev_err_avatar'), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id, 
          full_name: fullName 
        });

      if (error) throw error;
      showToast(t('ev_success_profile'), 'success');
      onBack();
    } catch (error) {
      console.error(error);
      showToast(t('ev_err_profile'), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <SafeArea style={{ flex: 1, backgroundColor: '#F5F5F5' }} className="justify-center items-center px-6">
        <Ionicons name="person-circle-outline" size={80} color="#FD6B1C" className="mb-4" />
        <Text className="font-montserrat-bold text-2xl text-body dark:text-white mb-2 text-center">{t('cp_restricted')}</Text>
        <Text className="font-montserrat text-base text-body-secondary dark:text-gray-300 mb-8 text-center">
          {t('ev_restricted_desc')}
        </Text>
        <Button className="w-full" onPress={() => router.push('/(auth)/login')}>{t('cp_login')}</Button>
        <TouchableOpacity className="mt-4 p-2" onPress={onBack}>
          <Text className="font-montserrat-semibold text-primary">{t('cp_back')}</Text>
        </TouchableOpacity>
      </SafeArea>
    );
  }

  if (isLoading) {
    return (
      <SafeArea style={{ flex: 1, backgroundColor: '#F5F5F5' }} className="justify-center items-center">
        <ActivityIndicator size="large" color="#FD6B1C" />
      </SafeArea>
    );
  }

  return (
    <SafeArea style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <View className="flex-row items-center px-6 py-4 border-b border-border dark:border-gray-800">
        <TouchableOpacity 
          className="mr-4 w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="#0078A8" />
        </TouchableOpacity>
        <Text className="font-montserrat-bold text-xl text-body dark:text-white">
          {t('ev_title')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        
        {/* Avatar Edit */}
        <View className="items-center mb-8 mt-4">
          <View className="relative">
            {avatarUrl ? (
              <Image 
                source={{ uri: avatarUrl }} 
                className="w-28 h-28 rounded-full bg-gray-200"
                contentFit="cover"
              />
            ) : (
              <View className="w-28 h-28 rounded-full bg-primary/20 items-center justify-center">
                <Text className="font-montserrat-bold text-4xl text-primary">
                  {fullName?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
            )}
            
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full items-center justify-center border-2 border-white dark:border-dark-bg"
              onPress={pickImage}
              disabled={isSaving}
            >
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text className="font-montserrat text-xs text-gray-500 mt-3">{t('ev_tap_to_change')}</Text>
        </View>

        {/* Inputs */}
        <Input 
          label={t('ev_full_name')}
          placeholder={t('ev_full_name_ph')}
          value={fullName}
          onChangeText={setFullName}
        />

        <Input 
          label={t('ev_email_label')}
          value={user?.email}
          editable={false}
          className="opacity-60"
        />

        <View className="mt-8">
          <Button 
            title={t('ev_save')} 
            onPress={handleSave} 
            loading={isSaving}
          />
        </View>
        
      </ScrollView>
    </SafeArea>
  );
}
