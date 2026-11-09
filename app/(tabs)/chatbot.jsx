import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Image, Modal, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../src/stores/themeStore';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../src/stores/languageStore';
import { useChatbotStore } from '../../src/stores/chatbotStore';
import Toast from '../../src/components/common/Toast';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/stores/authStore';
import { supabase } from '../../src/lib/supabase';

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
  const { user, isAuthenticated } = useAuthStore();

  // Itinerary Modal State
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [selectedDestinationForItinerary, setSelectedDestinationForItinerary] = useState(null);
  const [userItineraries, setUserItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isAddingToItinerary, setIsAddingToItinerary] = useState(false);

  const openItineraryModal = async (destinationId) => {
    if (!isAuthenticated || !user) {
      import('react-native').then(({ Alert }) => Alert.alert('Info', t('auth_required') || 'Silakan login terlebih dahulu untuk menggunakan fitur Itinerary.'));
      return;
    }
    setSelectedDestinationForItinerary(destinationId);
    setShowItineraryModal(true);
    setSelectedItinerary(null);
    setSelectedDay(null);
    
    try {
      const { data, error } = await supabase
        .from('itineraries')
        .select('id, title, start_date, end_date, destinations')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setUserItineraries(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveToItinerary = async () => {
    if (!selectedItinerary || !selectedDay) return;
    
    setIsAddingToItinerary(true);
    try {
      const itineraryData = userItineraries.find(i => i.id === selectedItinerary);
      if (!itineraryData) throw new Error("Itinerary not found");
      
      const currentDestinations = { ...itineraryData.destinations };
      const dayKey = selectedDay.toString();
      
      if (!currentDestinations[dayKey]) {
        currentDestinations[dayKey] = [];
      }
      
      // Ambil data detail destinasi karena TimelineItem butuh id, name, category, image_urls
      const { data: destData, error: destError } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', selectedDestinationForItinerary)
        .single();
        
      if (destError) throw destError;
      
      currentDestinations[dayKey].push({
        ...destData,
        time: "09:00"
      });
      
      const { error } = await supabase
        .from('itineraries')
        .update({ destinations: currentDestinations })
        .eq('id', selectedItinerary);
        
      if (error) throw error;
      
      import('react-native').then(({ Alert }) => Alert.alert('Sukses', 'Destinasi berhasil ditambahkan ke Jadwal Perjalanan!'));
      setShowItineraryModal(false);
    } catch (err) {
      console.error(err);
      import('react-native').then(({ Alert }) => Alert.alert('Error', 'Gagal menambahkan ke jadwal.'));
    } finally {
      setIsAddingToItinerary(false);
    }
  };

  const getDaysForItinerary = (itineraryId) => {
    const itin = userItineraries.find(i => i.id === itineraryId);
    if (!itin) return [];
    
    const start = new Date(itin.start_date);
    const end = new Date(itin.end_date);
    const days = [];
    let current = new Date(start);
    let dayNum = 1;
    
    const locale = language === 'en' ? 'en-US' : 'id-ID';
    while (current <= end) {
      const parts = current.toLocaleDateString(locale, { day: 'numeric', month: 'short' }).split(' ');
      days.push({
        dayNumber: dayNum,
        dateStr: `${parts[0]} ${parts[1]}`
      });
      current.setDate(current.getDate() + 1);
      dayNum++;
    }
    return days;
  };

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
          nestedScrollEnabled={true}
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
                  <View className="mt-2" style={{ flexGrow: 0, flexShrink: 0, height: 290 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} contentContainerStyle={{ paddingRight: 16, paddingBottom: 8 }}>
                      {msg.cards.map((card, index) => {
                        // Filter action buttons that belong to this specific card
                        const cardActions = msg.actions ? msg.actions.filter(a => a.destination_id === card.id) : [];
                        
                        return (
                        <View 
                          key={`card-${index}`}
                          className={isDark ? "mr-3 bg-dark-surface border border-dark-border rounded-xl overflow-hidden w-64 h-[280px]" : "mr-3 bg-white border border-border shadow-sm rounded-xl overflow-hidden w-64 h-[280px]"}
                        >
                        <TouchableOpacity onPress={() => router.push(`/destination/${card.id}`)}>
                          {card.image_url ? (
                            <Image source={{ uri: card.image_url }} className="w-full h-32 bg-gray-200" resizeMode="cover" />
                          ) : (
                            <View className="w-full h-32 bg-gray-300 items-center justify-center">
                              <MaterialIcons name="image-not-supported" size={32} color="#9ca3af" />
                            </View>
                          )}
                          <View className="p-3 pb-2">
                            <Text className={isDark ? "font-montserrat-semibold text-[14px] text-white" : "font-montserrat-semibold text-[14px] text-body"} numberOfLines={2}>{card.name}</Text>
                            {card.category && <Text className="font-montserrat text-[11px] text-primary mt-1">{card.category.toUpperCase()}</Text>}
                          </View>
                        </TouchableOpacity>

                        {/* Action Buttons Inside the Card */}
                        {cardActions.length > 0 && (
                          <View className="px-3 pb-3 flex-row flex-wrap justify-start">
                            {cardActions.map((action, aIdx) => (
                              <TouchableOpacity 
                                key={`action-${index}-${aIdx}`}
                                onPress={() => {
                                  if (action.type === 'navigate_detail') {
                                    router.push(`/destination/${action.destination_id}`);
                                  } else if (action.type === 'navigate_map') {
                                    router.push(`/map?lat=${action.lat}&lng=${action.lng}&title=${encodeURIComponent(action.label)}`);
                                  } else if (action.type === 'navigate_route') {
                                    router.push(`/map?origin=${encodeURIComponent(action.origin || '')}&destination=${encodeURIComponent(action.destination || '')}`);
                                  } else if (action.type === 'add_itinerary') {
                                    openItineraryModal(action.destination_id);
                                  }
                                }}
                                className={isDark ? "mr-1.5 mb-1.5 px-2 py-1.5 rounded border bg-[#2d3748] border-gray-600 flex-row items-center" : "mr-1.5 mb-1.5 px-2 py-1.5 rounded border bg-gray-50 border-gray-200 flex-row items-center shadow-sm"}
                              >
                                <Text className={isDark ? "font-montserrat-medium text-[10px] text-white text-center" : "font-montserrat-medium text-[10px] text-body text-center"}>
                                  {action.label.replace(` ${card.name}`, '')}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </View>
                    )})}
                  </ScrollView>
                  </View>
                )}

                {/* Standalone Actions (Not tied to a specific card) */}
                {msg.actions && msg.actions.some(a => !a.destination_id) && (
                  <View className="flex-row flex-wrap mt-2">
                    {msg.actions.filter(a => !a.destination_id).map((action, aIdx) => (
                      <TouchableOpacity 
                        key={`standalone-action-${aIdx}`}
                        onPress={() => {
                          if (action.type === 'navigate_route') {
                            router.push(`/map?origin=${encodeURIComponent(action.origin || '')}&destination=${encodeURIComponent(action.destination || '')}`);
                          }
                        }}
                        className={isDark ? "mr-2 mb-2 px-3 py-2 rounded-lg border bg-[#2d3748] border-primary/50 flex-row items-center" : "mr-2 mb-2 px-3 py-2 rounded-lg border bg-gray-50 border-primary/30 flex-row items-center shadow-sm"}
                      >
                        <Text className={isDark ? "font-montserrat-medium text-[12px] text-white" : "font-montserrat-medium text-[12px] text-primary"}>
                          {action.label}
                        </Text>
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

        {/* Itinerary Modal */}
        <Modal
          visible={showItineraryModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowItineraryModal(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className={isDark ? "bg-[#1E1E1E] rounded-t-3xl p-6 h-2/3" : "bg-white rounded-t-3xl p-6 h-2/3"}>
              <View className="flex-row justify-between items-center mb-6">
                <Text className={isDark ? "font-montserrat-bold text-lg text-white" : "font-montserrat-bold text-lg text-body"}>
                  Tambah ke Jadwal
                </Text>
                <TouchableOpacity onPress={() => setShowItineraryModal(false)}>
                  <MaterialIcons name="close" size={24} color={isDark ? "#FFFFFF" : "#333333"} />
                </TouchableOpacity>
              </View>

              {userItineraries.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                  <MaterialIcons name="event-busy" size={48} color={isDark ? "#555" : "#CCC"} />
                  <Text className={isDark ? "font-montserrat text-gray-400 text-center mt-4" : "font-montserrat text-gray-500 text-center mt-4"}>
                    Anda belum memiliki Jadwal Perjalanan.
                  </Text>
                  <TouchableOpacity 
                    className="mt-6 bg-primary px-6 py-3 rounded-full"
                    onPress={() => {
                      setShowItineraryModal(false);
                      router.push('/(tabs)/itinerary/create');
                    }}
                  >
                    <Text className="font-montserrat-bold text-white">Buat Jadwal Baru</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text className={isDark ? "font-montserrat-semibold text-gray-300 mb-3" : "font-montserrat-semibold text-gray-700 mb-3"}>
                    Pilih Jadwal (Itinerary):
                  </Text>
                  {userItineraries.map((itin) => (
                    <TouchableOpacity 
                      key={itin.id}
                      onPress={() => {
                        setSelectedItinerary(itin.id);
                        setSelectedDay(null);
                      }}
                      className={
                        selectedItinerary === itin.id 
                          ? "p-4 rounded-xl mb-3 border-2 border-primary bg-primary/10" 
                          : (isDark ? "p-4 rounded-xl mb-3 border border-gray-700 bg-dark-surface" : "p-4 rounded-xl mb-3 border border-gray-200 bg-gray-50")
                      }
                    >
                      <Text className={isDark ? "font-montserrat-bold text-white" : "font-montserrat-bold text-body"}>{itin.title}</Text>
                      <Text className={isDark ? "font-montserrat text-xs text-gray-400 mt-1" : "font-montserrat text-xs text-gray-500 mt-1"}>
                        {itin.start_date} s/d {itin.end_date}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  {selectedItinerary && (
                    <View className="mt-4">
                      <Text className={isDark ? "font-montserrat-semibold text-gray-300 mb-3" : "font-montserrat-semibold text-gray-700 mb-3"}>
                        Pilih Hari:
                      </Text>
                      <View className="flex-row flex-wrap">
                        {getDaysForItinerary(selectedItinerary).map((day) => (
                          <TouchableOpacity
                            key={`day-${day.dayNumber}`}
                            onPress={() => setSelectedDay(day.dayNumber)}
                            className={
                              selectedDay === day.dayNumber
                                ? "px-4 py-2 rounded-full mr-2 mb-2 bg-primary"
                                : (isDark ? "px-4 py-2 rounded-full mr-2 mb-2 bg-gray-700" : "px-4 py-2 rounded-full mr-2 mb-2 bg-gray-200")
                            }
                          >
                            <Text className={
                              selectedDay === day.dayNumber
                                ? "font-montserrat-bold text-white"
                                : (isDark ? "font-montserrat text-white" : "font-montserrat text-body")
                            }>
                              Hari {day.dayNumber} ({day.dateStr})
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}

                  <TouchableOpacity 
                    className={`mt-8 py-4 rounded-full items-center flex-row justify-center ${(!selectedItinerary || !selectedDay) ? (isDark ? 'bg-gray-800' : 'bg-gray-300') : 'bg-primary'}`}
                    disabled={!selectedItinerary || !selectedDay || isAddingToItinerary}
                    onPress={handleSaveToItinerary}
                  >
                    {isAddingToItinerary ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <>
                        <MaterialIcons name="add-task" size={20} color={(!selectedItinerary || !selectedDay) ? (isDark ? '#555' : '#888') : '#FFF'} />
                        <Text className={`font-montserrat-bold ml-2 ${(!selectedItinerary || !selectedDay) ? (isDark ? 'text-gray-500' : 'text-gray-500') : 'text-white'}`}>
                          Simpan ke Jadwal
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                  <View className="h-10" />
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}
