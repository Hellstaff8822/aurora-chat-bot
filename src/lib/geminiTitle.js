import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateTitle = async (text) => {
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return 'Новий чат';
  }

  const prompt = `Дай коротку, змістовну назву на основі цього повідомлення: "${text}". Без лапок. До 5 слів.`;

  try {
    const result = await model.generateContent(prompt);

    const title = result.response?.text()?.trim();

    return title || 'Новий чат';
  } catch (error) {
    console.error('❌ Помилка генерації заголовку:', error);
    return 'Новий чат';
  }
};
