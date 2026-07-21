import 'dotenv/config';

export default {
  expo: {
    name: "Pelesir Palembang",
    slug: "pelesir-palembang",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "pelesir-palembang",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
      }
    },
    android: {
      package: "com.zerocg.pelesirpalembang",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      predictiveBackGestureEnabled: false,
      softwareKeyboardLayoutMode: "pan",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      "expo-localization",
      "@react-native-community/datetimepicker"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      eas: {
        projectId: "e568f31a-9b52-4ce1-b42c-1d16cfbd4dc4"
      }
    }
  }
};
