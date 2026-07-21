import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '../../stores/themeStore';

import { useTranslation } from 'react-i18next';

export default function FilterChips({ selected, onSelect }) {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  const CATEGORIES = [
    { id: 'all', label: t('filter_all') },
    { id: 'populer', label: t('filter_popular') },
    { id: 'akomodasi', label: t('filter_hotel') },
    { id: 'hidden_gem', label: t('filter_hidden_gem') },
    { id: 'sejarah', label: t('filter_history') },
    { id: 'kuliner', label: t('filter_culinary') },
    { id: 'alam', label: t('filter_nature') },
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      {CATEGORIES.map((cat) => {
        const isSelected = selected === cat.id;

        const chipStyle = [
          styles.chip,
          isSelected
            ? styles.chipSelected
            : isDark
              ? styles.chipDark
              : styles.chipLight,
        ];

        const labelStyle = [
          styles.label,
          isSelected
            ? styles.labelSelected
            : isDark
              ? styles.labelDark
              : styles.labelLight,
        ];

        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            style={chipStyle}
            activeOpacity={0.7}
          >
            <Text style={labelStyle}>{cat.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  scrollContent: {
    paddingRight: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    marginRight: 12,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: '#FD6B1C',
    borderColor: '#FD6B1C',
  },
  chipLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  chipDark: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333333',
  },
  label: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 14,
  },
  labelSelected: {
    color: '#FFFFFF',
  },
  labelLight: {
    color: '#333333',
  },
  labelDark: {
    color: '#D1D5DB',
  },
});
