import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

const REPLIES = [
  "Rekomendasi Wisata",
  "Hidden Gems",
  "Tempat Kuliner"
];

export const QuickReplies = ({ onSelect }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 8 }}
    >
      {REPLIES.map((reply, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => onSelect(reply)}
          className="bg-white dark:bg-dark-card border border-primary px-4 py-2 rounded-pill h-[36px] justify-center"
        >
          <Text className="font-montserrat-medium text-primary text-[14px]">
            {reply}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default QuickReplies;
