import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../stores/themeStore';

export default function Input({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  className = '',
  ...props
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <View className={`relative w-full ${className}`}>
      {icon && (
        <MaterialIcons 
          name={icon} 
          size={20} 
          color={isFocused ? '#FD6B1C' : '#AAAAAA'} 
          style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }}
        />
      )}
      
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#AAAAAA"
        secureTextEntry={!isPasswordVisible}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full min-h-[44px] ${icon ? 'pl-10' : 'pl-3'} ${secureTextEntry ? 'pr-10' : 'pr-3'} py-2 rounded-button border font-montserrat text-[16px]
          ${isDark ? 'bg-dark-surface text-white border-dark-border' : 'bg-white text-body border-border'}
          ${isFocused ? 'border-secondary' : ''}
        `}
        style={isFocused && !isDark ? {
          shadowColor: '#0078A8',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 2,
        } : {}}
        {...props}
      />

      {secureTextEntry && (
        <TouchableOpacity 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={{ position: 'absolute', right: 12, top: 12, zIndex: 1 }}
        >
          <MaterialIcons 
            name={isPasswordVisible ? 'visibility' : 'visibility-off'} 
            size={20} 
            color="#AAAAAA" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
