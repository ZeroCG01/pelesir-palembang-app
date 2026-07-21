import React from 'react';
import { View, Text } from 'react-native';

const CATEGORY_COLORS = {
  Sejarah: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Alam: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Kuliner: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Budaya: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Religi: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  Belanja: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
};

export const Badge = ({ label, category, className = '' }) => {
  // Gunakan warna kategori jika ada, jika tidak, gunakan Default
  const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS[label] || CATEGORY_COLORS.Default;
  
  // Extract background and text classes
  const [bgClass, textClass] = colorClass.split(' ').reduce((acc, curr) => {
    if (curr.startsWith('text-')) acc[1] = acc[1] ? acc[1] + ' ' + curr : curr;
    else acc[0] = acc[0] ? acc[0] + ' ' + curr : curr;
    return acc;
  }, ['', '']);

  return (
    <View className={`px-2.5 py-1 rounded-md self-start ${bgClass} ${className}`}>
      <Text className={`font-montserrat-bold text-[10px] uppercase tracking-wider ${textClass}`}>
        {label}
      </Text>
    </View>
  );
};

export default Badge;
