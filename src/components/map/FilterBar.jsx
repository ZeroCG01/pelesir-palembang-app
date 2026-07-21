import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CATEGORIES = [
  'Semua', 
  'Sejarah', 
  'Kuliner', 
  'Alam', 
  'Religi', 
  'Olahraga'
];

export const FilterBar = ({ activeCategory, onSelectCategory }) => {
  return (
    <View className="absolute top-[80px] left-0 right-0 z-10">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 8 }}
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <TouchableOpacity
              key={category}
              onPress={() => onSelectCategory(category)}
              style={styles.chipShadow}
              className={`h-[36px] px-5 rounded-pill items-center justify-center border
                ${isActive 
                  ? 'bg-primary border-primary' 
                  : 'bg-white border-border'
                }
              `}
            >
              <Text 
                className={`font-montserrat-medium text-[14px]
                  ${isActive ? 'text-white' : 'text-body'}
                `}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chipShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  }
});

export default FilterBar;
