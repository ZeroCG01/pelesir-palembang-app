import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export default function Button({ 
  children, 
  onPress, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled = false,
  className = '',
  textClassName = ''
}) {
  const baseStyle = 'items-center justify-center rounded-button flex-row';
  
  const variants = {
    primary: 'bg-primary shadow-card active:bg-secondary',
    secondary: 'bg-white border border-border active:bg-gray-100',
    ghost: 'bg-transparent active:bg-gray-100',
    pill: 'bg-white rounded-pill',
  };

  const textVariants = {
    primary: 'text-white',
    secondary: 'text-body',
    ghost: 'text-body',
    pill: 'text-body',
  };

  const sizes = {
    sm: 'py-2 px-4 min-h-[32px]',
    md: 'py-3 px-6 min-h-[44px]',
    lg: 'py-4 px-8 min-h-[56px]',
  };

  const buttonStyle = `${baseStyle} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50' : ''} ${className}`;
  const labelStyle = `font-montserrat-semibold text-[16px] ${textVariants[variant]} ${textClassName}`;

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled || isLoading}
      className={buttonStyle}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#FD6B1C'} />
      ) : (
        <Text className={labelStyle}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}
