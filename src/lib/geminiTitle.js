import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateTitle = async (text) => {
  const prompt = `Дай коротку, змістовну назву на основі цього повідомлення: "${text}". Без лапок. До 5 слів.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const title = response.text().trim();

    return title || 'Назва чату';
  } catch (error) {
    console.error('❌ Помилка генерації заголовку:', error);
    return 'Назва чату';
  }
};
