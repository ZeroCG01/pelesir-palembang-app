import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { SafeArea } from '../../src/components/layout/SafeArea';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '../../src/lib/supabase';
import { useAuthStore } from '../../src/stores/authStore';

export default function AuthCallback() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const url = Linking.useURL();
  const { setSession } = useAuthStore();

  useEffect(() => {
    async function processAuth() {
      try {
        let code = params.code;
        let access_token = params.access_token;
        let refresh_token = params.refresh_token;

        // Fallback manual parsing if Expo Router missed the hash
        if (!code && !access_token && url) {
          const hashPart = url.includes('#') ? url.split('#')[1] : null;
          if (hashPart) {
            const hashParams = new URLSearchParams(hashPart);
            access_token = hashParams.get('access_token') || access_token;
            refresh_token = hashParams.get('refresh_token') || refresh_token;
          }
        }
        
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          if (data?.session) {
             setSession(data.session);
             router.replace('/(tabs)/home');
          }
        } else if (access_token) {
          const { data, error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) throw error;
          if (data?.session) {
             setSession(data.session);
             router.replace('/(tabs)/home');
          }
        } else {
           // If no tokens, maybe it was a mistake, go back to login
           router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Callback parsing error:', error);
        router.replace('/(auth)/login');
      }
    }

    processAuth();
  }, [params.code, params.access_token, url]);

  return (
    <SafeArea className="flex-1 bg-white dark:bg-dark-bg justify-center items-center">
      <ActivityIndicator size="large" color="#FD6B1C" />
      <Text className="mt-4 font-montserrat text-gray-500">
        Memproses otentikasi...
      </Text>
    </SafeArea>
  );
}
