import { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '../src/lib/supabase';
import { useAuthStore } from '../src/stores/authStore';

export default function UnmatchedRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const url = Linking.useURL();
  const { setSession } = useAuthStore();

  useEffect(() => {
    async function checkAuthParams() {
      try {
        let code = params.code || params.error;
        let access_token = params.access_token;
        let refresh_token = params.refresh_token;

        if (!code && !access_token && url) {
          const hashPart = url.includes('#') ? url.split('#')[1] : null;
          if (hashPart) {
            const hashParams = new URLSearchParams(hashPart);
            access_token = hashParams.get('access_token') || access_token;
            refresh_token = hashParams.get('refresh_token') || refresh_token;
          }
        }

        // Jika URL ini adalah hasil redirect dari OAuth Google
        if (code || access_token) {
          if (params.code) {
            const { data, error } = await supabase.auth.exchangeCodeForSession(params.code);
            if (!error && data?.session) {
              setSession(data.session);
              router.replace('/(tabs)/home');
              return;
            }
          } else if (access_token) {
            const { data, error } = await supabase.auth.setSession({ access_token, refresh_token });
            if (!error && data?.session) {
              setSession(data.session);
              router.replace('/(tabs)/home');
              return;
            }
          }
        }
        
        // Jika bukan URL otentikasi atau gagal, kembalikan ke home atau halaman sebelumnya
        router.replace('/(tabs)/home');
      } catch (error) {
        console.error('Error handling unmatched route auth:', error);
        router.replace('/(tabs)/home');
      }
    }

    checkAuthParams();
  }, [params.code, params.access_token, url]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#FD6B1C" />
      <Text style={{ marginTop: 16, color: '#666', fontFamily: 'Montserrat-Regular' }}>
        Memproses rute...
      </Text>
    </View>
  );
}
