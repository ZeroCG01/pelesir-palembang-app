import React from 'react';
import { View, Text } from 'react-native';

export const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  // Format time HH:MM
  const timeStr = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View className={`w-full flex-row my-2 px-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <View 
        className={`max-w-[80%] px-4 py-3 rounded-2xl 
          ${isUser 
            ? 'bg-primary rounded-tr-none' 
            : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
          }
        `}
      >
        <Text 
          className={`font-montserrat text-base leading-6
            ${isUser ? 'text-white' : 'text-body dark:text-gray-200'}
          `}
        >
          {message.text}
        </Text>
        <Text 
          className={`font-montserrat text-[10px] mt-1 text-right
            ${isUser ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'}
          `}
        >
          {timeStr}
        </Text>
      </View>
    </View>
  );
};

export default ChatBubble;
