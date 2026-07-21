import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { 
  Montserrat_400Regular, 
  Montserrat_500Medium, 
  Montserrat_600SemiBold, 
  Montserrat_700Bold, 
  Montserrat_800ExtraBold 
} from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import { useThemeStore } from '../src/stores/themeStore';
import { useAuthStore } from '../src/stores/authStore';
import { useFavoriteStore } from '../src/stores/favoriteStore';
import { supabase } from '../src/lib/supabase';
import { LogBox } from 'react-native';
import { useColorScheme } from 'nativewind';
import '../src/lib/i18n';
import '../global.css';

// Abaikan warning strict mode dari Reanimated agar tidak memenuhi terminal
LogBox.ignoreLogs([
  '[Reanimated] Reading from `value` during component render',
  '[Reanimated] Writing to `value` during component render'
]);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  const { theme } = useThemeStore();
  const { setSession } = useAuthStore();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  useEffect(() => {
    // Initial session fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        useFavoriteStore.getState().fetchFavorites();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        useFavoriteStore.getState().fetchFavorites();
      } else {
        useFavoriteStore.setState({ favorites: [], favoriteIds: new Set() });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: isDark ? '#121212' : '#F5F5F5' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
