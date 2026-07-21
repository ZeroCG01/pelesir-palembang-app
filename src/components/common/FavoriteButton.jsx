import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../stores/authStore';
import { useFavoriteStore } from '../../stores/favoriteStore';
import LoginModal from './LoginModal';
import { useTranslation } from 'react-i18next';

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export const FavoriteButton = ({ destinationId, size = 24, className = '', variant = 'star' }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const scale = useSharedValue(1);

  const favorited = isFavorite(destinationId);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    // Trigger spring animation
    scale.value = withSequence(
      withSpring(1.3, { damping: 2, stiffness: 80 }),
      withSpring(1, { damping: 2, stiffness: 80 })
    );

    await toggleFavorite(destinationId);
  };

  return (
    <>
      <TouchableOpacity 
        onPress={handlePress} 
        activeOpacity={0.7}
        className={`w-11 h-11 items-center justify-center ${className}`}
        style={styles.touchTarget}
      >
        <AnimatedIonicons 
          name={variant === 'trash' ? "trash" : (favorited ? "star" : "star-outline")} 
          size={size} 
          color={variant === 'trash' ? "#EF4444" : (favorited ? "#FD6B1C" : "#DDDDDD")} 
          style={animatedStyle}
        />
      </TouchableOpacity>

      <LoginModal 
        visible={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        message={t('modal_login_favorite')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  touchTarget: {
    minWidth: 44,
    minHeight: 44,
  }
});

export default FavoriteButton;
