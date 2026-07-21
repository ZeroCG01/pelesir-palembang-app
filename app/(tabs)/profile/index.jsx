import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeArea } from '../../../src/components/layout/SafeArea';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../../src/stores/themeStore';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../src/stores/authStore';
import { useFavoriteStore } from '../../../src/stores/favoriteStore';
import { useItineraryStore } from '../../../src/stores/itineraryStore';
import { useLanguageStore } from '../../../src/stores/languageStore';

// Sub-view components (rendered inline, no Stack navigation)
import AboutView from '../../../src/screens/profile/AboutView';
import HelpView from '../../../src/screens/profile/HelpView';
import PrivacyView from '../../../src/screens/profile/PrivacyView';
import EditView from '../../../src/screens/profile/EditView';
import ChangePasswordView from '../../../src/screens/profile/ChangePasswordView';
import FavoritesView from '../../../src/screens/profile/FavoritesView';

export default function ProfileScreen() {
  const { theme, setTheme } = useThemeStore();
  const { t, i18n } = useTranslation();
  const { setLanguage } = useLanguageStore();
  const { signOut, session, isAuthenticated } = useAuthStore();
  const { favorites, fetchFavorites } = useFavoriteStore();
  const { itineraries, fetchItineraries } = useItineraryStore();

  const isDark = theme === 'dark';

  // State-based sub-view switching (no Stack = no white blink)
  const [activeView, setActiveView] = useState('main');
  const scrollRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (session?.user?.id) {
      fetchFavorites();
      fetchItineraries(session.user.id);
    }
  }, [session]);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'id' ? 'en' : 'id';
    setLanguage(nextLang);
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/login');
  };

  const navigateTo = useCallback((view) => {
    setActiveView(view);
  }, []);

  const goBack = useCallback(() => {
    setActiveView('main');
    // Restore scroll position after React re-renders main view
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: scrollPositionRef.current, animated: false });
    }, 50);
  }, []);

  // Render sub-views based on state
  if (activeView === 'about') return <AboutView onBack={goBack} />;
  if (activeView === 'help') return <HelpView onBack={goBack} />;
  if (activeView === 'privacy') return <PrivacyView onBack={goBack} />;
  if (activeView === 'edit') return <EditView onBack={goBack} />;
  if (activeView === 'change-password') return <ChangePasswordView onBack={goBack} />;
  if (activeView === 'favorites') return <FavoritesView onBack={goBack} />;

  // Main profile view
  const SectionTitle = ({ title }) => (
    <Text className="font-montserrat-medium text-[12px] text-gray-500 uppercase tracking-widest px-4 mb-2 mt-6">
      {title}
    </Text>
  );

  const MenuItem = ({ icon, title, rightElement, isLast, onPress }) => (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center justify-between px-4 py-4 ${!isLast ? 'border-b' : ''} ${isDark ? 'border-dark-border' : 'border-border'}`}
      activeOpacity={0.7}
      disabled={!onPress && !rightElement}
    >
      <View className="flex-row items-center">
        <MaterialIcons name={icon} size={22} color={isDark ? '#AAAAAA' : '#666666'} />
        <Text className={`font-montserrat-medium text-[16px] ml-4 ${isDark ? 'text-white' : 'text-body'}`}>
          {title}
        </Text>
      </View>
      {rightElement || <MaterialIcons name="chevron-right" size={24} color={isDark ? '#AAAAAA' : '#666666'} />}
    </TouchableOpacity>
  );

  // Safely extract user metadata
  const userMeta = session?.user?.user_metadata || {};
  const fullName = userMeta.full_name || 'Wisatawan Palembang';
  const email = session?.user?.email || 'traveler@pelesir.com';
  
  // Get initials for avatar placeholder
  const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'WP';

  return (
    <SafeArea style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#F5F5F5' }}>
      <ScrollView 
        ref={scrollRef}
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 120 }} 
        showsVerticalScrollIndicator={false}
        onScroll={(e) => { scrollPositionRef.current = e.nativeEvent.contentOffset.y; }}
        scrollEventThrottle={16}
      >
        
        {/* Profile Hero Gradient or Unauthenticated State */}
        {isAuthenticated ? (
          <>
            <View className="bg-primary pt-12 pb-12 px-4 items-center rounded-b-3xl shadow-sm">
              <View className="w-20 h-20 rounded-full border-4 border-white bg-white/20 items-center justify-center mb-4">
                <Text className="font-montserrat-bold text-[28px] text-white">{initials}</Text>
              </View>
              <Text className="font-montserrat-bold text-[22px] text-white mb-1">{fullName}</Text>
              <Text className="font-montserrat text-[14px] text-white/90 mb-4">{email}</Text>
              <TouchableOpacity 
                className="bg-white px-6 py-2 rounded-full shadow-sm active:scale-95"
                onPress={() => navigateTo('edit')}
              >
                <Text className="font-montserrat-bold text-[14px] text-primary">{t('profile_edit')}</Text>
              </TouchableOpacity>
            </View>

            {/* Stats Card */}
            <View className="px-4 -mt-6 mb-4">
              <View className={`flex-row justify-between items-center p-4 rounded-xl shadow-md border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'}`}>
                <View className="flex-1 items-center border-r border-gray-200 dark:border-gray-700">
                  <Text className="font-montserrat-bold text-[22px] text-primary mb-1">{favorites.length}</Text>
                  <Text className={`font-montserrat text-[12px] ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>{t('profile_favorites')}</Text>
                </View>
                <View className="flex-1 items-center">
                  <Text className="font-montserrat-bold text-[22px] text-primary mb-1">{itineraries.length}</Text>
                  <Text className={`font-montserrat text-[12px] ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>{t('nav_itinerary')}</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View className="bg-primary pt-12 pb-12 px-4 items-center rounded-b-3xl shadow-sm mb-6">
            <View className="w-20 h-20 rounded-full border-4 border-white bg-white/20 items-center justify-center mb-4">
              <MaterialIcons name="person" size={40} color="#FFFFFF" />
            </View>
            <Text className="font-montserrat-bold text-[22px] text-white mb-2">{t('profile_your_account')}</Text>
            <Text className="font-montserrat text-[14px] text-white/90 mb-6 text-center px-4 leading-5">
              {t('profile_guest_desc')}
            </Text>
            <TouchableOpacity 
              className="bg-white px-8 py-3 rounded-full shadow-sm active:scale-95 flex-row items-center"
              onPress={() => router.push('/(auth)/login')}
            >
              <MaterialIcons name="login" size={20} color="#FD6B1C" style={{ marginRight: 8 }} />
              <Text className="font-montserrat-bold text-[16px] text-primary">{t('profile_login_register')}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="px-4">
          {/* Preferences Section */}
          <SectionTitle title={t('profile_section_preferences')} />
          <View className={`rounded-xl border overflow-hidden ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'}`}>
            <MenuItem 
              icon="language" 
              title={t('profile_language')} 
              onPress={toggleLanguage}
              rightElement={
                <View className="flex-row items-center">
                  <Text className={`font-montserrat text-[14px] mr-2 ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>
                    {i18n.language === 'id' ? 'Indonesia' : 'English'}
                  </Text>
                  <MaterialIcons name="chevron-right" size={24} color={isDark ? '#AAAAAA' : '#666666'} />
                </View>
              }
            />
            <MenuItem 
              icon="dark-mode" 
              title={t('profile_dark_mode')} 
              isLast={true}
              rightElement={
                <Switch 
                  value={isDark} 
                  onValueChange={toggleTheme}
                  trackColor={{ false: "#e4e2e1", true: "#ffdbcd" }}
                  thumbColor={isDark ? "#a43e00" : "#fbf9f8"}
                />
              }
            />
          </View>

          {isAuthenticated && (
            <>
              {/* Activity Section */}
              <SectionTitle title={t('profile_section_activity')} />
              <View className={`rounded-xl border overflow-hidden mb-4 ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'}`}>
                <MenuItem 
                  icon="favorite" 
                  title={t('profile_my_favorites')} 
                  isLast={true}
                  onPress={() => navigateTo('favorites')} 
                />
              </View>

              <SectionTitle title={t('profile_section_account')} />
              <View className={`rounded-xl border overflow-hidden ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'}`}>
                <MenuItem 
                  icon="person" 
                  title={t('profile_edit')} 
                  onPress={() => navigateTo('edit')} 
                />
                <MenuItem 
                  icon="lock" 
                  title={t('profile_change_password')} 
                  onPress={() => navigateTo('change-password')} 
                />
                <MenuItem 
                  icon="shield" 
                  title={t('profile_privacy')} 
                  isLast={true} 
                  onPress={() => navigateTo('privacy')}
                />
              </View>
            </>
          )}

          {/* About Section */}
          <SectionTitle title={t('profile_section_about')} />
          <View className={`rounded-xl border overflow-hidden ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-border'}`}>
            <MenuItem 
              icon="info" 
              title={t('profile_about_app')} 
              onPress={() => navigateTo('about')}
            />
            <MenuItem 
              icon="help" 
              title={t('profile_help')} 
              onPress={() => navigateTo('help')}
            />
            <MenuItem 
              icon="verified" 
              title={t('profile_version')} 
              isLast={true}
              rightElement={<Text className={`font-montserrat text-[14px] ${isDark ? 'text-gray-400' : 'text-body-secondary'}`}>1.0.0</Text>}
            />
          </View>

          {/* Logout Button */}
          {isAuthenticated && (
            <TouchableOpacity 
              onPress={handleLogout}
              className={`mt-8 py-4 rounded-xl border flex-row justify-center items-center ${isDark ? 'border-red-900 bg-red-900/10' : 'border-red-200 bg-red-50'}`}
            >
              <MaterialIcons name="logout" size={20} color="#ba1a1a" />
              <Text className="font-montserrat-bold text-[16px] text-red-700 ml-2">{t('profile_logout')}</Text>
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>
    </SafeArea>
  );
}
