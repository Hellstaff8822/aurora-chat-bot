import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { renameThreadAsync, deleteThread } from '@/features/slices/threadsSlice';
import { ChatService } from '@/lib/ChatService';

const initialState = {
  messagesByThread: {},
  typingStatusByThread: {},
  loadingStatusByThread: {},
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ userText, threadId }, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const thread = state.threads.threads.find((t) => t.id === threadId);

    if (thread?.title === 'Новий чат' && (state.chat.messagesByThread[threadId]?.length || 0) === 0) {
      ChatService.generateChatTitle(userText)
        .then((title) => {
          dispatch(renameThreadAsync({ id: threadId, title }));
        })
        .catch((err) => {
          console.error('Помилка фонового перейменування чату:', err);
        });
    }

    dispatch(setTyping({ threadId, isTyping: true }));

    try {
      dispatch(addMessage({ text: userText, role: 'user', threadId }));
      await ChatService.addMessageToChat(threadId, { text: userText, role: 'user' });

      const updatedMessages = getState().chat.messagesByThread[threadId];
      const geminiMsgs = updatedMessages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const response = await ChatService.getBotResponse(geminiMsgs);

      dispatch(addMessage({ text: response, role: 'bot', threadId }));
      await ChatService.addMessageToChat(threadId, { text: response, role: 'bot' });
    } catch (err) {
      const errorMessage = '⚠️ ' + (err.message || 'Сталася помилка');
      dispatch(addMessage({ text: errorMessage, role: 'bot', threadId }));
      await ChatService.addMessageToChat(threadId, { text: errorMessage, role: 'bot' });
      return rejectWithValue(err.message);
    } finally {
      dispatch(setTyping({ threadId, isTyping: false }));
    }
  }
);

export const fetchMessagesForThread = createAsyncThunk(
  'chat/fetchMessages',
  async (threadId, { rejectWithValue }) => {
    try {
      const messages = await ChatService.getMessagesForChat(threadId);
      return { threadId, messages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { text, role, threadId } = action.payload;
      if (!state.messagesByThread[threadId]) {
        state.messagesByThread[threadId] = [];
      }
      state.messagesByThread[threadId].push({
        id: nanoid(),
        text: text.trim(),
        role,
        createdAt: new Date().toISOString(),
      });
    },
    setTyping: (state, action) => {
      const { threadId, isTyping } = action.payload;
      if (threadId) {
        state.typingStatusByThread[threadId] = isTyping;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteThread.fulfilled, (state, action) => {
        const threadIdToDelete = action.payload;
        delete state.messagesByThread[threadIdToDelete];
        delete state.typingStatusByThread[threadIdToDelete];
      })
      .addCase(fetchMessagesForThread.pending, (state, action) => {
        state.loadingStatusByThread[action.meta.arg] = true;
      })
      .addCase(fetchMessagesForThread.fulfilled, (state, action) => {
        const { threadId, messages } = action.payload;
        state.messagesByThread[threadId] = messages;
        delete state.loadingStatusByThread[threadId];
      })
      .addCase(fetchMessagesForThread.rejected, (state, action) => {
        delete state.loadingStatusByThread[action.meta.arg];
      });
  },
});

export const { addMessage, setTyping } = chatSlice.actions;
export default chatSlice.reducer;