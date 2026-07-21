import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import i18n from '../lib/i18n';

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: 'id', // 'id' or 'en'
      setLanguage: (lang) => {
        if (i18n.isInitialized) {
          i18n.changeLanguage(lang);
        }
        set({ language: lang });
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
