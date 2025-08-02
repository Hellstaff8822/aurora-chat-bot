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
      const systemPrompt = `Ти — Aurora, сучасний інтелектуальний асистент. 

ІНСТРУКЦІЇ:
1. Відповідай українською мовою
2. Використовуй Markdown для структурування:
   - Заголовки: ## Заголовок (для основних розділів)
   - Підзаголовки: ### Підзаголовок (для підрозділів)
   - Списки: - пункт (для маркованих списків)
   - Нумеровані списки: 1. пункт (для покрокових інструкцій)
   - Жирний текст: **важливий текст**
   - Курсив: *пояснення*
   - Код: \`фрагмент коду\` (для коротких прикладів)
   - Код блоки: \`\`\`javascript\nкод\n\`\`\` (для довгих прикладів)
3. Додавай релевантні емодзі до тексту там, де доречно
4. Структуруй відповіді з заголовками та списками для кращої читабельності

Приклад форматування:
## Рецепт курячого супу 🍲

**Інгредієнти:**
- 1 кг курячих стегон 🍗
- 2 морквини 🥕
- 2 картоплини 🥔

**Інструкції:**
1. Підготуйте курятину 🍗
2. Варіть бульйон
3. Додайте овочі 🥕🥔`;

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
      console.log('Новий чат створено з ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Помилка створення нового чату:', error);
      throw error;
    }
  },

  async getChatsForUser(userId) {
    if (!userId) return [];

    try {
      console.log('getChatsForUser: userId =', userId);
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
      console.log('getChatsForUser: chats =', chats);

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
      console.log('Чат успішно видалено з Firestore');
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
