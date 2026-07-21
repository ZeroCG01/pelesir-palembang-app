/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './src/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#FD6B1C',
        secondary: '#F1721D',
        tertiary: '#F97316',
        accent: '#0078A8',
        body: '#000000',
        'body-secondary': '#333333',
        border: '#DDDDDD',
        surface: '#F5F5F5',
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          text: '#FFFFFF',
          'text-secondary': '#CCCCCC',
          border: '#333333'
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat_400Regular'],
        'montserrat-medium': ['Montserrat_500Medium'],
        'montserrat-semibold': ['Montserrat_600SemiBold'],
        'montserrat-bold': ['Montserrat_700Bold'],
        'montserrat-extrabold': ['Montserrat_800ExtraBold'],
      },
      borderRadius: {
        'button': '8px',
        'card': '16px',
        'pill': '32px',
      },
      boxShadow: {
        'card': '0px 4px 6px -1px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
