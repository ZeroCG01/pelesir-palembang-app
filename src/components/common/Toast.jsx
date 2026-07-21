import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { useToastStore } from '../../stores/toastStore';

export const Toast = () => {
  const { visible, message, type } = useToastStore();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 50,
          useNativeDriver: true,
          bounciness: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible, translateY, opacity]);

  if (!visible && opacity._value === 0) return null;

  let bgColor = '#333333';
  if (type === 'success') bgColor = '#22C55E'; // green-500
  if (type === 'error') bgColor = '#EF4444'; // red-500

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: bgColor,
          transform: [{ translateY }],
          opacity
        }
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    textAlign: 'center',
  }
});

export default Toast;
