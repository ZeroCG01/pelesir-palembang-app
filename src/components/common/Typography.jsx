import React from 'react';
import { Text } from 'react-native';
import { useThemeStore } from '../../stores/themeStore';

export default function Typography({
  variant = 'body',
  children,
  className = '',
  ...props
}) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const baseColor = isDark ? 'text-dark-text' : 'text-body';

  const variants = {
    h1: `font-montserrat-extrabold text-[48px] leading-[60px] ${baseColor}`,
    h2: `font-montserrat-bold text-[30px] leading-[37.5px] ${baseColor}`,
    h3: `font-montserrat-bold text-[24px] leading-[32px] ${baseColor}`,
    body: `font-montserrat text-[18px] leading-[29.25px] ${baseColor}`,
    nav: `font-montserrat text-[16px] leading-[24px] ${baseColor}`,
    label: `font-montserrat text-[14px] leading-[20px] ${isDark ? 'text-dark-text-secondary' : 'text-body-secondary'}`,
  };

  return (
    <Text className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Text>
  );
}
