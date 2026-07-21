import React from 'react';
import { View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../stores/themeStore';

export default function SearchBar({ value, onChangeText, placeholder }) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <View className={`relative w-full rounded-lg shadow-sm flex-row items-center px-3 h-[48px] border
      ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'}
    `}>
      <MaterialIcons 
        name="search" 
        size={24} 
        color={isDark ? '#AAAAAA' : '#333333'} 
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#AAAAAA' : '#333333'}
        className={`flex-1 ml-2 font-montserrat text-[16px] h-full ${isDark ? 'text-white' : 'text-body'}`}
      />
    </View>
  );
}
