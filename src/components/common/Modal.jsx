import React from 'react';
import { Modal as RNModal, View, TouchableOpacity, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Modal = ({ 
  visible, 
  onClose, 
  title, 
  children,
  animationType = 'slide',
  position = 'bottom' // center | bottom
}) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className={`flex-1 bg-black/50 ${position === 'bottom' ? 'justify-end' : 'justify-center items-center'}`}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              className={`bg-white dark:bg-dark-bg p-6 
                ${position === 'bottom' 
                  ? 'rounded-t-3xl w-full max-h-[80%]' 
                  : 'rounded-2xl w-[90%] max-h-[80%]'
                }
              `}
            >
              {/* Header */}
              <View className="flex-row justify-between items-center mb-4">
                {title ? (
                  <Text className="font-montserrat-bold text-lg text-body dark:text-white flex-1 mr-4">
                    {title}
                  </Text>
                ) : <View className="flex-1" />}
                
                <TouchableOpacity onPress={onClose} className="p-1">
                  <Ionicons name="close" size={24} color="#888" />
                </TouchableOpacity>
              </View>

              {/* Body */}
              {children}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;
