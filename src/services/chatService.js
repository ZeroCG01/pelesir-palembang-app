/**
 * Dummy service untuk mensimulasikan koneksi ke backend FastAPI chatbot.
 * Di tahap selanjutnya, fungsi ini akan melakukan fetch() nyata ke endpoint AI.
 */
export const chatService = {
  sendMessage: async (text, language = 'id') => {
    return new Promise((resolve, reject) => {
      // Simulasi delay jaringan (sekitar 1-2 detik sesuai FR-04-6)
      const delay = Math.floor(Math.random() * 1000) + 1000;

      setTimeout(() => {
        // Simulasi network error acak 5% chance
        if (Math.random() < 0.05) {
          reject(new Error('Koneksi lambat, coba lagi'));
          return;
        }

        const lowerText = text.toLowerCase();
        let responseText = language === 'id' 
          ? "Maaf, saya tidak mengerti pertanyaan Anda." 
          : "Sorry, I don't understand your question.";

        // Simple hardcoded rules for demo
        if (lowerText.includes('rekomendasi') || lowerText.includes('recommend')) {
          responseText = language === 'id'
            ? "Saya merekomendasikan Anda mengunjungi Jembatan Ampera di malam hari, atau Pulau Kemaro jika Anda menyukai sejarah budaya!"
            : "I highly recommend visiting the Ampera Bridge at night, or Kemaro Island if you like cultural history!";
        } else if (lowerText.includes('makan') || lowerText.includes('kuliner') || lowerText.includes('food')) {
          responseText = language === 'id'
            ? "Anda wajib mencoba Pempek dan Tekwan! Banyak warung terkenal di sekitar Jalan Sudirman."
            : "You must try Pempek and Tekwan! There are many famous food stalls around Sudirman Street.";
        } else if (lowerText.includes('halo') || lowerText.includes('hai') || lowerText.includes('hello')) {
          responseText = language === 'id'
            ? "Halo! Pelesir Assistant di sini. Apa yang ingin Anda tanyakan seputar wisata Palembang?"
            : "Hello! Pelesir Assistant here. What would you like to know about tourism in Palembang?";
        }

        resolve({
          id: Date.now().toString(),
          text: responseText,
          sender: 'bot',
          timestamp: new Date().toISOString()
        });
      }, delay);
    });
  }
};
