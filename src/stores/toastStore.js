import { create } from 'zustand';

export const useToastStore = create((set) => ({
  visible: false,
  message: '',
  type: 'success', // 'success' | 'error' | 'info'
  showToast: (message, type = 'success') => {
    set({ visible: true, message, type });
    // Auto hide setelah 3 detik
    setTimeout(() => {
      set({ visible: false });
    }, 3000);
  },
  hideToast: () => set({ visible: false }),
}));
