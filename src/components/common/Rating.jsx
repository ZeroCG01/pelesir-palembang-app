import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Rating = ({ 
  value = 0, 
  max = 5, 
  size = 16, 
  color = '#F59E0B', // amber-500
  readonly = true,
  onChange,
  className = ''
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      const isFilled = i <= Math.floor(value);
      const isHalf = !isFilled && i === Math.ceil(value) && value % 1 !== 0;
      
      let iconName = 'star-outline';
      if (isFilled) iconName = 'star';
      else if (isHalf) iconName = 'star-half';

      const starEl = (
        <Ionicons 
          key={i} 
          name={iconName} 
          size={size} 
          color={isFilled || isHalf ? color : '#D1D5DB'} // gray-300 if empty
        />
      );

      if (readonly) {
        stars.push(<View key={i} className="mr-1">{starEl}</View>);
      } else {
        stars.push(
          <TouchableOpacity 
            key={i} 
            onPress={() => onChange && onChange(i)}
            activeOpacity={0.7}
            className="p-1"
          >
            {starEl}
          </TouchableOpacity>
        );
      }
    }
    return stars;
  };

  return (
    <View className={`flex-row items-center ${className}`}>
      {renderStars()}
    </View>
  );
};

export default Rating;
