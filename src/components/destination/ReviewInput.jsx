import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../stores/themeStore';
import { useTranslation } from 'react-i18next';
import Toast from '../common/Toast';

export default function ReviewInput({ onSubmit, isSubmitting }) {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (rating === 0) {
      // Toast isn't implemented as imperative here, so we just alert or rely on parent
      alert("Silakan pilih rating (bintang) terlebih dahulu.");
      return;
    }
    if (!comment.trim()) {
      alert("Silakan tulis ulasan Anda.");
      return;
    }

    const success = await onSubmit(rating, comment.trim());
    if (success) {
      setRating(0);
      setComment('');
    }
  };

  return (
    <View className={`p-4 rounded-xl mb-6 border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border shadow-sm'}`}>
      <Text className={`font-montserrat-semibold text-[16px] mb-2 ${isDark ? 'text-white' : 'text-body'}`}>
        Berikan Ulasan Anda
      </Text>
      
      {/* Star Rating Selection */}
      <View className="flex-row mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => setRating(star)}
            className="mr-1"
          >
            <MaterialIcons 
              name={rating >= star ? "star" : "star-border"} 
              size={32} 
              color="#FFD700" 
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Comment Input */}
      <TextInput
        className={`w-full min-h-[80px] p-3 rounded-lg border font-montserrat text-[14px] mb-4 text-left align-top
          ${isDark ? 'bg-dark-bg border-dark-border text-white' : 'bg-gray-50 border-gray-200 text-body'}
        `}
        placeholder="Bagaimana pengalaman Anda di sini?"
        placeholderTextColor={isDark ? '#666666' : '#AAAAAA'}
        multiline
        textAlignVertical="top"
        value={comment}
        onChangeText={setComment}
      />

      {/* Submit Button */}
      <TouchableOpacity 
        className={`w-full py-3 rounded-button items-center justify-center
          ${rating > 0 && comment.trim() && !isSubmitting ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}
        `}
        disabled={rating === 0 || !comment.trim() || isSubmitting}
        onPress={handleSubmit}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="font-montserrat-semibold text-white text-[16px]">
            Kirim Ulasan
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
