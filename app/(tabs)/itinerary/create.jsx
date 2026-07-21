import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea } from '../../../src/components/layout/SafeArea';
import Input from '../../../src/components/common/Input';
import Button from '../../../src/components/common/Button';
import { useAuthStore } from '../../../src/stores/authStore';
import { supabase } from '../../../src/lib/supabase';
import { useToastStore } from '../../../src/stores/toastStore';
import { useTranslation } from 'react-i18next';

export default function CreateItineraryScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { showToast } = useToastStore();
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onStartChange = (event, selectedDate) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate.toISOString().slice(0, 10));
    }
  };

  const onEndChange = (event, selectedDate) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate.toISOString().slice(0, 10));
    }
  };

  // Simplified format check for YYYY-MM-DD
  const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;
    const d = new Date(dateString);
    if(Number.isNaN(d.getTime())) return false;
    return d.toISOString().slice(0,10) === dateString;
  };

  const handleCreate = async () => {
    if (!title.trim() || !startDate || !endDate) {
      Alert.alert('Error', t('itinerary_error_fill_all'));
      return;
    }

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      Alert.alert('Error', t('itinerary_error_date_format'));
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('itineraries')
        .insert([{
          user_id: user.id,
          title: title.trim(),
          start_date: startDate,
          end_date: endDate,
          destinations: {} // JSONB structure starts empty
        }])
        .select()
        .single();

      if (error) throw error;

      showToast(t('itinerary_create_success'), 'success');
      // Redirect back and trigger refresh (or go directly to new ID)
      router.replace(`/itinerary/${data.id}`);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', t('itinerary_create_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeArea className="flex-1 bg-white dark:bg-dark-bg">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b border-border dark:border-gray-800">
        <TouchableOpacity 
          className="mr-4 w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
          onPress={() => router.navigate('/(tabs)/itinerary')}
        >
          <Ionicons name="arrow-back" size={24} color="#0078A8" />
        </TouchableOpacity>
        <Text className="font-montserrat-bold text-xl text-body dark:text-white">
          {t('itinerary_create_title')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="font-montserrat text-body-secondary dark:text-gray-400 mb-6">
          {t('itinerary_create_desc')}
        </Text>

        <Text className="font-montserrat-semibold text-body dark:text-white mb-2 mt-4">{t('itinerary_trip_name')}</Text>
        <Input 
          placeholder={t('itinerary_trip_placeholder')}
          value={title}
          onChangeText={setTitle}
        />

        <Text className="font-montserrat-semibold text-body dark:text-white mb-2 mt-4">{t('itinerary_start_date')}</Text>
        <TouchableOpacity onPress={() => setShowStartPicker(true)}>
          <View pointerEvents="none">
            <Input 
              icon="calendar-today"
              placeholder={t('itinerary_start_placeholder')}
              value={startDate}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate ? new Date(startDate) : new Date()}
            mode="date"
            display="default"
            onChange={onStartChange}
          />
        )}

        <Text className="font-montserrat-semibold text-body dark:text-white mb-2 mt-4">{t('itinerary_end_date')}</Text>
        <TouchableOpacity onPress={() => setShowEndPicker(true)}>
          <View pointerEvents="none">
            <Input 
              icon="calendar-today"
              placeholder={t('itinerary_end_placeholder')}
              value={endDate}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate ? new Date(endDate) : new Date()}
            mode="date"
            display="default"
            onChange={onEndChange}
          />
        )}

        <View className="mt-8">
          <Button 
            onPress={handleCreate} 
            isLoading={isSubmitting}
          >
            {t('itinerary_save')}
          </Button>
        </View>
      </ScrollView>
    </SafeArea>
  );
}
