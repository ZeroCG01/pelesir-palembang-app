import { create } from 'zustand';

export const useChatStore = create((set, get) => ({
  messages: [],
  isTyping: false,

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message]
    }));
  },

  setTyping: (status) => set({ isTyping: status }),

  clearChat: () => set({ messages: [] })
}));
