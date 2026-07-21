import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import id from '../locales/id.json';
import en from '../locales/en.json';

// Read persisted language synchronously-ish during module load
const getStoredLanguage = async () => {
  try {
    const data = await AsyncStorage.getItem('language-storage');
    if (data) {
      const parsed = JSON.parse(data);
      return parsed?.state?.language || 'id';
    }
  } catch (e) {
    // ignore
  }
  return 'id';
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
    lng: 'id', // Will be overridden by stored preference
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

// Apply stored language after init
getStoredLanguage().then((lang) => {
  if (lang !== i18n.language) {
    i18n.changeLanguage(lang);
  }
});

export default i18n;

