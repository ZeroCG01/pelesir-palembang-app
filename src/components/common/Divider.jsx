import React from 'react';
import { View } from 'react-native';

export const Divider = ({ className = '', vertical = false }) => {
  if (vertical) {
    return <View className={`w-[1px] h-full bg-border dark:bg-gray-800 ${className}`} />;
  }
  return <View className={`h-[1px] w-full bg-border dark:bg-gray-800 ${className}`} />;
};

export default Divider;
