import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../src/stores/themeStore';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../src/stores/languageStore';
import { useChatbotStore } from '../../src/stores/chatbotStore';
import Toast from '../../src/components/common/Toast';
import { useRouter } from 'expo-router';
export default function ChatbotScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const { language, setLanguage } = useLanguageStore();

  const [message, setMessage] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef(null);
  
  const { messages, isTyping, isError, sendMessage, isOnline, checkConnection, clearChat } = useChatbotStore();

  useEffect(() => {
    checkConnection();
    const interval = setInterval(() => {
      checkConnection();
    }, 5000);

    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      clearInterval(interval);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);

  const chips = [t('chat_chip_recommendation'), t('chat_chip_hidden_gems'), t('chat_chip_culinary')];
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#FFFFFF', paddingTop: insets.top }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat Specific Sub-Header */}
        <View className={isDark ? "px-4 py-3 border-b flex-row justify-between items-center z-40 shadow-sm bg-dark-bg border-dark-border" : "px-4 py-3 border-b flex-row justify-between items-center z-40 shadow-sm bg-white border-border"}>
          <View className="flex-row items-center">
            <View className="relative w-12 h-12 items-center justify-center mr-3">
              <Image 
                source={require('../../assets/images/logo_chatbot_4.jpg')}
                style={{ width: 48, height: 48 }}
                resizeMode="contain"
              />
              <View className={isOnline ? "absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-10" : "absolute bottom-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full z-10"} />
            </View>
            <View>
              <Text className={isDark ? "font-montserrat-semibold text-[16px] text-white leading-tight" : "font-montserrat-semibold text-[16px] text-body leading-tight"}>
                TanyaKito
              </Text>
              <Text className={isDark ? "font-montserrat text-[12px] text-gray-400" : "font-montserrat text-[12px] text-body-secondary"}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
          
          {/* Clear Chat Button */}
          {messages.length > 1 && (
            <TouchableOpacity 
              onPress={() => {
                import('react-native').then(({ Alert }) => {
                  Alert.alert(
                    t('chat_delete_title'),
                    t('chat_delete_confirm'),
                    [
                      { text: t('chat_cancel'), style: "cancel" },
                      { text: t('chat_delete'), style: "destructive", onPress: () => clearChat() }
                    ]
                  );
                });
              }}
              className="p-2"
            >
              <MaterialIcons name="delete-outline" size={24} color={isDark ? "#EF4444" : "#EF4444"} />
            </TouchableOpacity>
          )}

        </View>

        {isError && (
          <View className="bg-red-500/10 px-4 py-2 flex-row items-center justify-center">
            <MaterialIcons name="error-outline" size={14} color="#EF4444" />
            <Text className="font-montserrat text-[11px] text-red-500 ml-1">
              {t('chat_server_error')}
            </Text>
          </View>
        )}

        {/* Chat Canvas */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-4 pt-4" 
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {/* Time Divider */}
          <View className="items-center mb-6">
            <View className={isDark ? "px-4 py-1 rounded-full bg-dark-surface" : "px-4 py-1 rounded-full bg-gray-100"}>
              <Text className={isDark ? "font-montserrat text-[12px] text-gray-400" : "font-montserrat text-[12px] text-body-secondary"}>
                {t('chat_today')}, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>

          {/* Messages */}
          {messages.map((msg) => {
            const isUser = msg.type === 'user';
            return (
              <View key={msg.id} className={isUser ? "flex-col max-w-[85%] mb-4 self-end" : "flex-col max-w-[85%] mb-4 self-start"}>
                <View className={isUser 
                  ? "p-4 shadow-sm border bg-primary border-primary rounded-2xl rounded-tr-sm" 
                  : (isDark ? "p-4 shadow-sm border bg-dark-surface border-dark-border rounded-2xl rounded-tl-sm" : "p-4 shadow-sm border bg-white border-border rounded-2xl rounded-tl-sm")
                }>
                  <Text className={isUser 
                    ? "font-montserrat text-[14px] leading-relaxed text-white" 
                    : (isDark ? "font-montserrat text-[14px] leading-relaxed text-white" : "font-montserrat text-[14px] leading-relaxed text-body")
                  }>
                    {msg.text}
                  </Text>
                </View>
                
                {/* Timestamp for user msg */}
                {isUser && (
                  <Text className={isDark ? "font-montserrat text-[10px] mt-1 self-end text-gray-500" : "font-montserrat text-[10px] mt-1 self-end text-gray-400"}>
                    {msg.time}
                  </Text>
                )}

                {/* Rich Responses: Cards */}
                {msg.cards && msg.cards.length > 0 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2" contentContainerStyle={{ paddingRight: 16 }}>
                    {msg.cards.map((card, index) => (
                      <TouchableOpacity 
                        key={`card-${index}`}
                        onPress={() => router.push(`/destination/${card.id}`)}
                        className={isDark ? "mr-3 bg-dark-surface border border-dark-border rounded-xl overflow-hidden w-48" : "mr-3 bg-white border border-border shadow-sm rounded-xl overflow-hidden w-48"}
                      >
                        {card.image_url ? (
                          <Image source={{ uri: card.image_url }} className="w-full h-32 bg-gray-200" resizeMode="cover" />
                        ) : (
                          <View className="w-full h-32 bg-gray-300 items-center justify-center">
                            <MaterialIcons name="image-not-supported" size={32} color="#9ca3af" />
                          </View>
                        )}
                        <View className="p-3">
                          <Text className={isDark ? "font-montserrat-semibold text-[13px] text-white" : "font-montserrat-semibold text-[13px] text-body"} numberOfLines={2}>{card.name}</Text>
                          {card.category && <Text className="font-montserrat text-[11px] text-primary mt-1">{card.category.toUpperCase()}</Text>}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                {/* Rich Responses: Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <View className="flex-row flex-wrap mt-2">
                    {msg.actions.map((action, index) => (
                      <TouchableOpacity 
                        key={`action-${index}`}
                        onPress={() => {
                          if (action.type === 'navigate_detail') {
                            router.push(`/destination/${action.destination_id}`);
                          } else if (action.type === 'navigate_map') {
                            router.push(`/map?lat=${action.lat}&lng=${action.lng}&title=${encodeURIComponent(action.label)}`);
                          } else if (action.type === 'add_itinerary') {
                            // Can add logic to show itinerary modal later
                            Toast.show({ type: 'info', text1: 'Fitur Segera Hadir' });
                          }
                        }}
                        className={isDark ? "mr-2 mb-2 px-3 py-2 rounded-lg border bg-[#2d3748] border-gray-600 flex-row items-center" : "mr-2 mb-2 px-3 py-2 rounded-lg border bg-gray-50 border-gray-200 flex-row items-center shadow-sm"}
                      >
                        <Text className={isDark ? "font-montserrat-medium text-[12px] text-white" : "font-montserrat-medium text-[12px] text-body"}>{action.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Quick Replies / Chips */}
                {(msg.quick_replies && msg.quick_replies.length > 0) ? (
                  <View className="flex-row flex-wrap mt-2">
                    {msg.quick_replies.map((qr, index) => (
                      <TouchableOpacity 
                        key={`qr-${index}`}
                        onPress={() => sendMessage(qr.message)}
                        className={isDark ? "mr-2 mb-2 px-3 py-2 rounded-full border bg-dark-bg border-primary/50" : "mr-2 mb-2 px-3 py-2 rounded-full border bg-white border-primary/30"}
                      >
                        <Text className="font-montserrat-medium text-[12px] text-primary">{qr.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  msg.showChips && (
                    <View className="flex-row flex-wrap mt-2">
                      {chips.map((chip, index) => (
                        <TouchableOpacity 
                          key={`chip-${index}`}
                          onPress={() => sendMessage(chip)}
                          className={isDark ? "mr-2 mb-2 px-3 py-2 rounded-full border bg-dark-bg border-primary/50" : "mr-2 mb-2 px-3 py-2 rounded-full border bg-white border-primary/30"}
                        >
                          <Text className="font-montserrat-medium text-[12px] text-primary">{chip}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )
                )}
              </View>
            );
          })}

          {isTyping && (
            <View className="flex-col max-w-[85%] mb-4 self-start">
              <View className={isDark ? "p-4 shadow-sm border bg-dark-surface border-dark-border rounded-2xl rounded-tl-sm" : "p-4 shadow-sm border bg-white border-border rounded-2xl rounded-tl-sm"}>
                <Text className={isDark ? "font-montserrat-italic opacity-70 text-[14px] leading-relaxed text-white" : "font-montserrat-italic opacity-70 text-[14px] leading-relaxed text-body"}>
                  {t('chat_typing')}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View 
          style={{ paddingBottom: isKeyboardVisible ? 0 : (Platform.OS === 'ios' ? 120 : 110) }}
          className={isDark ? "border-t bg-dark-bg border-dark-border" : "border-t bg-white border-border"}
        >
          <View className="px-4 py-3">
            <View className={isDark ? "flex-row items-end rounded-[20px] border p-1 pl-4 bg-[#1A1A1A] border-[#8d7165]" : "flex-row items-end rounded-[20px] border p-1 pl-4 bg-[#f6f3f2] border-[#e2bfb2]"}>
              <TextInput
                className={isDark ? "flex-1 font-montserrat text-[14px] max-h-24 min-h-[40px] pt-2 pb-2 text-white" : "flex-1 font-montserrat text-[14px] max-h-24 min-h-[40px] pt-2 pb-2 text-body"}
                placeholder={t('chat_placeholder')}
                placeholderTextColor={isDark ? '#AAAAAA' : '#666666'}
                multiline
                value={message}
                onChangeText={setMessage}
              />

              <TouchableOpacity 
                className={message.trim() 
                  ? "w-10 h-10 rounded-full items-center justify-center ml-2 mb-0.5 shadow-md bg-primary" 
                  : (isDark ? "w-10 h-10 rounded-full items-center justify-center ml-2 mb-0.5 shadow-md bg-[#2A2A2A]" : "w-10 h-10 rounded-full items-center justify-center ml-2 mb-0.5 shadow-md bg-[#e4e2e1]")
                }
                disabled={!message.trim()}
                onPress={handleSend}
              >
                <MaterialIcons name="send" size={20} color={message.trim() ? "white" : (isDark ? "#888888" : "#AAAAAA")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
}
