import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../stores/themeStore';

export const SafeArea = ({ children, className = '', edges = ['top', 'bottom', 'left', 'right'] }) => {
  const { theme } = useThemeStore();
  
  // Kombinasikan class base dengan class tambahan
  const isDark = theme === 'dark';
  
  return (
    <SafeAreaView 
      className={isDark ? `flex-1 bg-dark-bg ${className}` : `flex-1 bg-white ${className}`}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
