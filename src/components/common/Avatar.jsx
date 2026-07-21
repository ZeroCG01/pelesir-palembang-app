import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { COLORS } from '../../constants/colors';

export const Avatar = ({ 
  imageUrl, 
  name, 
  size = 40,
  className = ''
}) => {
  const getInitial = () => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const roundedStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (imageUrl) {
    return (
      <Image 
        source={{ uri: imageUrl }}
        style={roundedStyle}
        className={`bg-gray-200 ${className}`}
        contentFit="cover"
      />
    );
  }

  return (
    <View 
      style={roundedStyle} 
      className={`items-center justify-center bg-primary/20 ${className}`}
    >
      <Text 
        className="font-montserrat-bold text-primary"
        style={{ fontSize: size * 0.4 }}
      >
        {getInitial()}
      </Text>
    </View>
  );
};

export default Avatar;
