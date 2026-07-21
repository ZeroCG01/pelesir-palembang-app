import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const ImageCarousel = ({ images = [], height = 300, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef(null);

  // Jika array images kosong, berikan 1 placeholder
  const safeImages = images.length > 0 ? images : ['https://via.placeholder.com/800x600?text=No+Image'];

  useEffect(() => {
    if (!autoPlay || safeImages.length <= 1) return;

    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= safeImages.length) {
        nextIndex = 0; // Loop kembali ke awal
      }
      pagerRef.current?.setPage(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, safeImages.length, interval]);

  return (
    <View style={{ height, width }}>
      <PagerView 
        ref={pagerRef}
        style={{ flex: 1 }} 
        initialPage={0}
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
      >
        {safeImages.map((img, idx) => (
          <View key={idx} style={{ flex: 1 }}>
            <Image
              source={{ uri: img }}
              style={{ flex: 1 }}
              contentFit="cover"
              transition={300}
            />
            {/* Gradient Overlay for better text readability and styling */}
            <LinearGradient
              colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.6)']}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        ))}
      </PagerView>

      {/* Dot Indicators */}
      {safeImages.length > 1 && (
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center gap-x-2 z-10">
          {safeImages.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <View 
                key={idx}
                className={`rounded-full transition-all duration-300
                  ${isActive ? 'bg-white w-6 h-2.5' : 'bg-white/60 w-2.5 h-2.5'}
                `}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default ImageCarousel;
