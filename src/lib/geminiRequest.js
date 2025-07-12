import { GoogleGenAI } from '@google/genai';

export const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const geminiRequest = async (
  messagesArr,
  model = 'gemini-2.0-flash'
) => {
  try {
    const response = await genAI.models.generateContent({
      model,
      contents: messagesArr,
    });

    if (!Array.isArray(messagesArr)) {
      throw new Error('messagesArr має бути масивом!');
    }

    return response.text;
  } catch (err) {
    console.error('Gemini API error:', err);
    throw err;
  }
};

export default geminiRequest;
