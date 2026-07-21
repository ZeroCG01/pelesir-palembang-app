import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session, user: session?.user || null, isAuthenticated: !!session?.user, isLoading: false }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isAuthenticated: false });
  },
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },
  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });
    if (error) throw error;
    return data;
  },
  signInWithGoogle: async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        path: 'callback'
      });
      console.log('\n\n=== MASUKKAN URL INI KE SUPABASE SITE URL ===');
      console.log(redirectUrl);
      console.log('===============================================\n\n');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Tunda sedikit (500ms) agar AsyncStorage punya waktu untuk menyimpan PKCE code verifier ke memori internal
        // sebelum aplikasi ditimpa oleh layar browser Google.
        await new Promise(resolve => setTimeout(resolve, 500));

        const res = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl
        );

        if (res.type === 'success') {
          const { url } = res;

          // Tangani parameter dari URL (bisa PKCE code atau implicit token)
          const queryPart = url.includes('?') ? url.split('?')[1].split('#')[0] : null;
          const hashPart = url.includes('#') ? url.split('#')[1] : null;
          
          let queryParams = new URLSearchParams(queryPart || '');
          let hashParams = new URLSearchParams(hashPart || '');

          const code = queryParams.get('code');
          const access_token = hashParams.get('access_token') || queryParams.get('access_token');
          const refresh_token = hashParams.get('refresh_token') || queryParams.get('refresh_token');
          const error_description = queryParams.get('error_description') || hashParams.get('error_description');
          const error_code = queryParams.get('error') || hashParams.get('error');

          if (error_description || error_code) {
             throw new Error(error_description || error_code);
          }

          if (code) {
            // PKCE Flow
            const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
            if (sessionError) throw sessionError;
            return sessionData.session;
          } else if (access_token) {
            // Implicit Flow Fallback
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            if (sessionError) throw sessionError;
            return sessionData.session;
          } else {
            throw new Error(`Token/Code tidak ditemukan.\nURL diterima: ${url}`);
          }
        } else if (res.type === 'cancel' || res.type === 'dismiss') {
          throw new Error('Login dibatalkan oleh pengguna');
        }
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }
}));


