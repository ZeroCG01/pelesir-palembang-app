import React from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export const LoginModal = ({ visible, onClose, message }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogin = () => {
    onClose();
    router.push('/(auth)/login');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable 
        className="flex-1 justify-center items-center bg-black/50 px-4"
        onPress={onClose}
      >
        <Pressable className="bg-white dark:bg-dark-card w-full max-w-sm rounded-card p-6 items-center">
          <Text className="text-4xl mb-4">🔒</Text>
          <Text className="text-xl font-montserrat-bold text-body dark:text-white mb-2 text-center">
            {t('modal_restricted_access')}
          </Text>
          <Text className="text-base font-montserrat text-body dark:text-gray-200 mb-6 text-center">
            {message || t('modal_login_prompt')}
          </Text>
          
          <TouchableOpacity
            className="bg-primary w-full py-3 rounded-button mb-3 items-center"
            onPress={handleLogin}
          >
            <Text className="text-white font-montserrat-bold text-base">
              {t('auth_login')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="w-full py-3 rounded-button items-center"
            onPress={onClose}
          >
            <Text className="text-body dark:text-gray-300 font-montserrat-semibold text-base">
              {t('modal_later')}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default LoginModal;
