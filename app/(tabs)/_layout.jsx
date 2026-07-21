import { Tabs } from 'expo-router';
import React from 'react';
import { View, Platform, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../src/stores/themeStore';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: isDark ? '#121212' : '#F5F5F5' }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#2A2A2A' : '#FFFFFF',
          borderTopColor: isDark ? '#333333' : '#DDDDDD',
          height: (Platform.OS === 'ios' ? 88 : 64) + Math.max(insets.bottom, 0),
          paddingBottom: Platform.OS === 'ios' ? 24 : Math.max(insets.bottom, 12),
          paddingTop: 12,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: 'absolute',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
          elevation: 10,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#FD6B1C',
        tabBarInactiveTintColor: isDark ? '#AAAAAA' : '#333333',
        tabBarLabelStyle: {
          fontFamily: 'Montserrat_500Medium',
          fontSize: 10,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t('nav_home'),
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t('nav_map'),
          tabBarIcon: ({ color }) => <MaterialIcons name="map" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: t('nav_chatbot'),
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center -mt-8 shadow-lg">
              <Image 
                source={
                  focused 
                    ? require('../../assets/images/logo_chatbot_5.jpg') 
                    : require('../../assets/images/logo_chatbot_4.jpg')
                }
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="itinerary/index"
        options={{
          title: t('nav_itinerary'),
          tabBarIcon: ({ color }) => <MaterialIcons name="event-note" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: t('nav_profile'),
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
        }}
      />

      {/* Hide other screens from the tab bar */}
      <Tabs.Screen name="itinerary/[id]" options={{ href: null }} />
      <Tabs.Screen name="itinerary/create" options={{ href: null }} />
    </Tabs>
  );
}
