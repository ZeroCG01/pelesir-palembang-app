import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeArea } from '../../components/layout/SafeArea';
import { useThemeStore } from '../../stores/themeStore';
import { useTranslation } from 'react-i18next';

export default function HelpView({ onBack }) {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  const faqs = [
    {
      question: t('help_faq_q1'),
      answer: t('help_faq_a1')
    },
    {
      question: t('help_faq_q2'),
      answer: t('help_faq_a2')
    },
    {
      question: t('help_faq_q3'),
      answer: t('help_faq_a3')
    },
    {
      question: t('help_faq_q4'),
      answer: t('help_faq_a4')
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeArea style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#F5F5F5' }}>
      <View className="flex-row items-center px-6 py-4 border-b border-border dark:border-gray-800">
        <TouchableOpacity 
          className="mr-4 w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="#0078A8" />
        </TouchableOpacity>
        <Text className="font-montserrat-bold text-xl text-body dark:text-white">
          {t('help_title')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        
        {/* Help Header */}
        <View className="mb-8 items-center mt-4">
          <View className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-dark-surface' : 'bg-primary/10'}`}>
            <MaterialIcons name="live-help" size={40} color="#FD6B1C" />
          </View>
          <Text className="font-montserrat-bold text-2xl text-body dark:text-white mb-2 text-center">
            {t('help_heading')}
          </Text>
          <Text className="font-montserrat text-sm text-body-secondary dark:text-gray-400 text-center">
            {t('help_subheading')}
          </Text>
        </View>

        {/* FAQs */}
        <Text className="font-montserrat-bold text-lg text-body dark:text-white mb-4">
          {t('help_faq')}
        </Text>

        <View className={`rounded-xl border overflow-hidden mb-8 ${isDark ? 'border-dark-border bg-dark-surface' : 'border-border bg-white'}`}>
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            const isLast = index === faqs.length - 1;
            
            return (
              <View 
                key={index} 
                className={`${!isLast ? 'border-b' : ''} ${isDark ? 'border-dark-border' : 'border-gray-100'}`}
              >
                <TouchableOpacity 
                  className="flex-row justify-between items-center p-4"
                  onPress={() => toggleExpand(index)}
                  activeOpacity={0.7}
                >
                  <Text className={`font-montserrat-semibold text-[14px] flex-1 mr-4 ${isDark ? 'text-white' : 'text-body'}`}>
                    {faq.question}
                  </Text>
                  <MaterialIcons 
                    name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                    size={24} 
                    color={isDark ? "#AAAAAA" : "#666666"} 
                  />
                </TouchableOpacity>
                
                {isExpanded && (
                  <View className={`px-4 pb-4 pt-1 ${isDark ? 'bg-dark-surface' : 'bg-gray-50'}`}>
                    <Text className={`font-montserrat text-[13px] leading-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Contact Support */}
        <Text className="font-montserrat-bold text-lg text-body dark:text-white mb-4">
          {t('help_contact')}
        </Text>
        
        <TouchableOpacity 
          className={`flex-row items-center p-4 rounded-xl border mb-4 ${isDark ? 'border-dark-border bg-dark-surface' : 'border-border bg-white'}`}
          onPress={() => Linking.openURL('mailto:support@pelesirpalembang.com')}
        >
          <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center mr-4">
            <MaterialIcons name="email" size={24} color="#FD6B1C" />
          </View>
          <View className="flex-1">
            <Text className="font-montserrat-bold text-base text-body dark:text-white">{t('help_email_cs')}</Text>
            <Text className="font-montserrat text-sm text-body-secondary dark:text-gray-400">support@pelesir.com</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={isDark ? "#AAAAAA" : "#666666"} />
        </TouchableOpacity>

      </ScrollView>
    </SafeArea>
  );
}
