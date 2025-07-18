import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const ChatService = {
  async getBotResponse(messagesArr) {
    try {
      const result = await model.generateContent({
        contents: messagesArr,
      });
      const response = result.response;
      return response.text();
    } catch (err) {
      console.error('Помилка запиту до Gemini:', err);
      throw new Error('Не вдалося отримати відповідь від AI.');
    }
  },

  async generateChatTitle(firstMessageText) {
    if (!firstMessageText || typeof firstMessageText !== 'string' || firstMessageText.trim() === '') {
      return 'Новий чат';
    }
    const prompt = `Дай коротку, змістовну назву на основі цього повідомлення: "${firstMessageText}". Без лапок. До 5 слів.`;
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text().trim() || 'Назва чату';
    } catch (error) {
      console.error('❌ Помилка генерації заголовку:', error);
      return 'Назва чату';
    }
  },
};
