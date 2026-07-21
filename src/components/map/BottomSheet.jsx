import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Custom Bottom Sheet tanpa dependensi library luar
export const BottomSheet = ({ 
  destinations = [], 
  onToggleFavorite, 
  userLocation 
}) => {
  const router = useRouter();
  
  // States: 0 = collapsed (hanya nampak handle + header sedikit), 1 = half expanded
  const [isExpanded, setIsExpanded] = useState(false);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT * 0.4)).current; // Half height by default
  const MAX_UP = 50; // Ketinggian maksimal ditarik ke atas
  const MIN_DOWN = SCREEN_HEIGHT * 0.6; // Ketinggian minimal saat ditutup

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Aktifkan jika gerakan vertikal cukup terasa
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        let newY = (isExpanded ? MAX_UP : SCREEN_HEIGHT * 0.4) + gestureState.dy;
        if (newY < MAX_UP) newY = MAX_UP;
        translateY.setValue(newY);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          // Tarik ke atas (Expand)
          Animated.spring(translateY, {
            toValue: MAX_UP,
            useNativeDriver: true,
            bounciness: 4
          }).start();
          setIsExpanded(true);
        } else if (gestureState.dy > 50) {
          // Tarik ke bawah (Collapse ke setengah)
          Animated.spring(translateY, {
            toValue: SCREEN_HEIGHT * 0.4,
            useNativeDriver: true,
            bounciness: 4
          }).start();
          setIsExpanded(false);
        } else {
          // Kembalikan ke posisi semula jika tarikan tidak cukup
          Animated.spring(translateY, {
            toValue: isExpanded ? MAX_UP : SCREEN_HEIGHT * 0.4,
            useNativeDriver: true,
            bounciness: 4
          }).start();
        }
      }
    })
  ).current;

  return (
    <Animated.View 
      style={{ 
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: SCREEN_HEIGHT,
        transform: [{ translateY }],
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 20,
        paddingBottom: 80 // Area bawah untuk tab bar
      }}
    >
      {/* Handle Panner */}
      <View {...panResponder.panHandlers} className="w-full items-center pt-3 pb-4 bg-transparent">
        <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </View>

      <View className="px-6 mb-2">
        <Text className="font-montserrat-bold text-xl text-body mb-1">
          {destinations.length} Destinasi Terdekat
        </Text>
      </View>

      {/* List Content */}
      <ScrollView className="flex-1 px-4">
        {destinations.map((dest, index) => {
          const imageUrl = dest.image_urls?.[0] || 'https://via.placeholder.com/150';
          return (
            <TouchableOpacity 
              key={dest.id}
              className="flex-row items-center p-3 mb-3 bg-white border border-gray-100 rounded-card shadow-sm"
              onPress={() => router.push(`/destination/${dest.id}`)}
              activeOpacity={0.7}
            >
              <Image 
                source={{ uri: imageUrl }}
                className="w-[72px] h-[72px] rounded-lg bg-gray-200"
                contentFit="cover"
              />
              
              <View className="flex-1 justify-center ml-4">
                <Text className="font-montserrat-bold text-base text-body mb-1" numberOfLines={1}>
                  {dest.name}
                </Text>
                
                <View className="flex-row items-center mb-1">
                  <Text className="font-montserrat text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-pill mr-2">
                    {dest.category}
                  </Text>
                  <Ionicons name="star" size={12} color="#F1721D" />
                  <Text className="font-montserrat text-xs font-bold text-body ml-1">
                    {dest.rating?.toFixed(1) || '0.0'}
                  </Text>
                </View>

                {dest.distanceKm !== undefined && (
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={12} color="#888" />
                    <Text className="font-montserrat text-xs text-gray-500 ml-1">
                      {dest.distanceKm < 1 ? `${Math.round(dest.distanceKm * 1000)} m` : `${dest.distanceKm.toFixed(1)} km`} dari Anda
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity 
                className="w-10 h-10 items-center justify-center rounded-full"
                onPress={() => onToggleFavorite(dest.id)}
              >
                <Ionicons name={dest.isFavorite ? "star" : "star-outline"} size={22} color={dest.isFavorite ? "#FD6B1C" : "#A0A0A0"} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
        {destinations.length === 0 && (
          <Text className="text-center font-montserrat text-gray-500 mt-8">
            Tidak ada destinasi di sekitar Anda.
          </Text>
        )}
      </ScrollView>
    </Animated.View>
  );
};

export default BottomSheet;
