const API_URL = process.env.EXPO_PUBLIC_CHATBOT_API_URL || 'http://192.168.1.100:8000'; // Default fallback

export const chatbotService = {
  async sendChat(message, history = []) {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message, history }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Chatbot API Error:', error);
      throw error;
    }
  },

  async checkConnection() {
    try {
      // Simple ping to check if the server is reachable
      const response = await fetch(`${API_URL}/`);
      return !!response;
    } catch (error) {
      return false;
    }
  }
};
