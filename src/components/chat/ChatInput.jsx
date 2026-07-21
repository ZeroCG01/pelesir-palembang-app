import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ChatInput = ({ onSend, disabled = false }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length > 0 && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View className="flex-row items-end px-4 py-3 bg-white dark:bg-dark-card border-t border-border dark:border-gray-800">
      <View className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl min-h-[44px] max-h-[120px] px-4 py-2 mr-3 justify-center">
        <TextInput
          className="font-montserrat text-base text-body dark:text-white"
          placeholder="Ketik pesan..."
          placeholderTextColor="#999999"
          multiline
          maxLength={500}
          value={text}
          onChangeText={setText}
        />
      </View>
      <TouchableOpacity 
        onPress={handleSend}
        disabled={text.trim().length === 0 || disabled}
        className={`w-11 h-11 rounded-full items-center justify-center 
          ${text.trim().length > 0 && !disabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}
        `}
      >
        <Ionicons name="send" size={20} color="#FFFFFF" className="ml-1" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
