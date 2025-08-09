import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

export const ChatService = {
  async getBotResponse(messagesArr) {
    try {
      const lastUserMessageText = Array.isArray(messagesArr)
        ? [...messagesArr].reverse().find((m) => m?.role === 'user' && m?.parts?.[0]?.text)?.parts?.[0]?.text || ''
        : '';
      const hasCyrillic = /[\u0400-\u04FF]/.test(lastUserMessageText);
      const hasLatin = /[A-Za-z]/.test(lastUserMessageText);
      const replyLanguage = hasLatin && !hasCyrillic ? 'English' : 'Ukrainian';

      const systemPrompt = `You are Aurora, a modern, helpful assistant.

LANGUAGE:
- Always reply in the same language as the user's last message. Current language: ${replyLanguage}.
- Keep a gender‑neutral tone.

FORMATTING (Markdown):
- Use headings: ## Title, ### Subtitle
- Lists: - item, 1. step
- Bold: **important**, Italic: *note*
- Inline code: \`code\`, Code blocks: \`\`\`javascript\ncode\n\`\`\`
- Insert horizontal rules (---) to separate major sections or steps.

EMOJIS:
- Add relevant emojis to headings or bullet points when they improve clarity or friendliness.
- Do not overuse emojis; keep them tasteful and helpful.

STYLE:
- Be friendly and professional. Keep answers structured and concise.`;

      if (!messagesArr || messagesArr.length === 0) {
        throw new Error('Немає повідомлень для запиту.');
      }

      const formattedMessages = messagesArr
        .filter((m) => {
          return (
            m &&
            m.parts &&
            Array.isArray(m.parts) &&
            m.parts.length > 0 &&
            m.parts[0] &&
            m.parts[0].text &&
            m.parts[0].text.trim() &&
            (m.role === 'user' || m.role === 'model')
          );
        })
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.parts[0].text.trim() }],
        }));

      if (formattedMessages.length === 0) {
        throw new Error('Немає валідних повідомлень для запиту.');
      }

      const allMessages = [{ role: 'user', parts: [{ text: systemPrompt }] }, ...formattedMessages];

      const result = await model.generateContent({
        contents: allMessages,
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
    
    // Визначаємо мову повідомлення
    const hasCyrillic = /[\u0400-\u04FF]/.test(firstMessageText);
    const hasLatin = /[A-Za-z]/.test(firstMessageText);
    const isEnglish = hasLatin && !hasCyrillic;
    
    const prompt = isEnglish 
      ? `Generate a short, meaningful title based on this message: "${firstMessageText}". No quotes. Up to 5 words. Reply in English.`
      : `Дай коротку, змістовну назву на основі цього повідомлення: "${firstMessageText}". Без лапок. До 5 слів.`;
      
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const title = response.text().trim();
      
      // Якщо назва не згенерувалась, повертаємо дефолтну назву відповідною мовою
      if (!title) {
        return isEnglish ? 'New Chat' : 'Назва чату';
      }
      
      return title;
    } catch (error) {
      console.error('❌ Помилка генерації заголовку:', error);
      return isEnglish ? 'New Chat' : 'Назва чату';
    }
  },

  async createNewChat(userId) {
    if (!userId) {
      throw new Error("ID користувача є обов'язковим для створення чату.");
    }
    
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        userId: userId,
        title: 'Новий чат',
        createdAt: serverTimestamp(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Помилка створення нового чату:', error);
      throw error;
    }
  },

  async getChatsForUser(userId) {
    if (!userId) return [];

    try {
    
      const chatsCollectionRef = collection(db, 'chats');
      const q = query(chatsCollectionRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const chats = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        };
      });
  

      return chats;
    } catch (error) {
      console.error('Помилка завантаження чатів:', error);
      return [];
    }
  },
  async deleteChat(chatId) {
    if (!chatId) throw new Error("ID чату є обов'язковим.");
    try {
      const chatDocRef = doc(db, 'chats', chatId);
      await deleteDoc(chatDocRef);
  
    } catch (error) {
      console.error('Помилка видалення чату з Firestore:', error);
      throw error;
    }
  },

  async addMessageToChat(chatId, messageData) {
    if (!chatId || !messageData) throw new Error("ID чату та дані повідомлення є обов'язковими.");
    try {
      const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');

      await addDoc(messagesCollectionRef, {
        ...messageData,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Помилка додавання повідомлення в Firestore:', error);
      throw error;
    }
  },

  async getMessagesForChat(chatId) {
    if (!chatId) return [];
    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const q = query(messagesRef, orderBy('createdAt', 'asc'));
      const querySnapshot = await getDocs(q);

      const messages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        };
      });

      return messages;
    } catch (error) {
      console.error('Помилка завантаження повідомлень:', error);
      return [];
    }
  },

  async updateChatTitle(chatId, newTitle) {
    if (!chatId || !newTitle) return;
    try {
      const chatDocRef = doc(db, 'chats', chatId);
      await updateDoc(chatDocRef, { title: newTitle });
    } catch (error) {
      console.error('Помилка оновлення назви чату:', error);
    }
  },
};
