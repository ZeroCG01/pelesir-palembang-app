import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export const Skeleton = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 8, 
  className = '' 
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius,
        opacity,
      }}
      className={`bg-gray-200 dark:bg-gray-800 ${className}`}
    />
  );
};

export default Skeleton;
