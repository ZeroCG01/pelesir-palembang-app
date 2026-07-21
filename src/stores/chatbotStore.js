import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { chatbotService } from '../services/chatbotService';

const initialMessages = [
  {
    id: 1,
    type: 'bot',
    text: 'Halo! Saya TanyaKito 🤖. Selamat datang di Palembang! Ada yang bisa saya bantu untuk rencana perjalanan Anda hari ini?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    showChips: true
  }
];

export const useChatbotStore = create(
  persist(
    (set, get) => ({
      messages: initialMessages,
      isTyping: false,
      isError: false,
      isOnline: false,

      checkConnection: async () => {
        const status = await chatbotService.checkConnection();
        set({ isOnline: status });
      },

      sendMessage: async (text) => {
        if (!text.trim()) return;

        const userMessage = {
          id: Date.now(),
          type: 'user',
          text: text.trim(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        set((state) => ({
          messages: [...state.messages, userMessage],
          isTyping: true,
          isError: false
        }));

        try {
          // Format riwayat chat untuk Gemini
          const currentMessages = get().messages;
          // Filter hanya pesan selain initial message, dan exclude pesan yang baru saja diketik user (karena itu dikirim via 'text')
          // Aturan Role Gemini: 'user' atau 'model'
          const history = currentMessages
            .filter(msg => msg.id !== 1 && msg.id !== userMessage.id) 
            .map(msg => ({
              role: msg.type === 'bot' ? 'model' : 'user',
              content: msg.text
            }));

          // Panggil backend FastAPI
          const response = await chatbotService.sendChat(text, history);
          
          const botMessage = {
            id: Date.now() + 1,
            type: 'bot',
            text: response.reply || 'Maaf, format balasan dari server tidak dikenali.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actions: response.actions || null,
            cards: response.cards || null,
            quick_replies: response.quick_replies || null
          };
          
          set((state) => ({
            messages: [...state.messages, botMessage],
            isTyping: false
          }));

        } catch (error) {
          console.log('API Error, using fallback...', error);
          
          // Fallback mechanism (Graceful Degradation)
          const mockResponse = get().getMockResponse(text);
          const fallbackMessage = {
            id: Date.now() + 1,
            type: 'bot',
            text: `${mockResponse} (Mode Offline)`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          set((state) => ({
            messages: [...state.messages, fallbackMessage],
            isTyping: false,
            isError: true
          }));
        }
      },

      clearChat: () => {
        set({
          messages: initialMessages,
          isTyping: false,
          isError: false
        });
      },

      getMockResponse: (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('kuliner') || lower.includes('makan') || lower.includes('lapar')) {
          return 'Untuk kuliner khas, saya merekomendasikan Pempek Candy, Mie Celor 26 Ilir, dan Pindang Musi Rawas!';
        } else if (lower.includes('sejarah') || lower.includes('museum')) {
          return 'Palembang punya banyak spot sejarah! Anda bisa mengunjungi Museum Sultan Mahmud Badaruddin II, Benteng Kuto Besak, atau Bukit Siguntang.';
        } else if (lower.includes('hidden gem') || lower.includes('rekomendasi')) {
          return 'Coba kunjungi Kampung Arab Al-Munawar atau Pulau Kemaro untuk pengalaman unik yang tenang!';
        } else {
          return 'Maaf, saya kurang paham maksud Anda. Saya adalah asisten wisata Palembang, Anda bisa bertanya seputar rekomendasi tempat, harga tiket, atau penginapan!';
        }
      }
    }),
    {
      name: 'chatbot-storage-v2',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ messages: state.messages }), // Only save messages
    }
  )
);
