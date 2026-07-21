import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import Button from './Button';

export const EmptyState = ({ 
  title, 
  description, 
  imageUrl = 'https://cdn-icons-png.flaticon.com/512/7486/7486747.png',
  actionTitle,
  onAction,
  className = ''
}) => {
  return (
    <View className={`flex-1 justify-center items-center px-6 ${className}`}>
      <Image 
        source={{ uri: imageUrl }}
        className="w-40 h-40 mb-6 opacity-80"
        contentFit="contain"
      />
      
      <Text className="font-montserrat-bold text-xl text-body dark:text-white mb-2 text-center">
        {title}
      </Text>
      
      {description && (
        <Text className="font-montserrat text-body-secondary dark:text-gray-400 text-center mb-8 px-4">
          {description}
        </Text>
      )}

      {actionTitle && onAction && (
        <Button 
          title={actionTitle} 
          onPress={onAction}
          className="w-full max-w-[250px]"
        />
      )}
    </View>
  );
};

export default EmptyState;
