import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

export const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 400, useNativeDriver: true })
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
  }, []);

  const Dot = ({ anim }) => (
    <Animated.View 
      className="w-2 h-2 rounded-full bg-gray-400 mx-1"
      style={{
        transform: [{
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -6]
          })
        }],
        opacity: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1]
        })
      }}
    />
  );

  return (
    <View className="w-full flex-row my-2 px-4 justify-start">
      <View className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-4 flex-row items-center">
        <Dot anim={dot1} />
        <Dot anim={dot2} />
        <Dot anim={dot3} />
      </View>
    </View>
  );
};

export default TypingIndicator;
