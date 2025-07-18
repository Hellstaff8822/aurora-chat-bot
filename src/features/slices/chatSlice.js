import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { renameThread, deleteThread } from '@/features/slices/threadsSlice';
import { ChatService } from '@/lib/ChatService';

const initialState = {
  messagesByThread: {},
  typingStatusByThread: {},
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ userText, threadId }, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const thread = state.threads.threads.find((t) => t.id === threadId);
    if (thread?.title === 'Новий чат' && (state.chat.messagesByThread[threadId]?.length || 0) === 0) {
      ChatService.generateChatTitle(userText)
        .then((title) => {
          dispatch(renameThread({ id: threadId, title }));
        })
        .catch((err) => {
          console.error('Помилка фонового перейменування чату:', err);
        });
    }

    dispatch(setTyping({ threadId, isTyping: true }));

    try {
      dispatch(addMessage({ text: userText, role: 'user', threadId }));

      const updatedMessages = getState().chat.messagesByThread[threadId];
      const geminiMsgs = updatedMessages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const response = await ChatService.getBotResponse(geminiMsgs);
      dispatch(addMessage({ text: response, role: 'bot', threadId }));
    } catch (err) {
      const errorMessage = '⚠️ ' + (err.message || 'Сталася помилка');
      dispatch(addMessage({ text: errorMessage, role: 'bot', threadId }));
      return rejectWithValue(err.message);
    } finally {
      dispatch(setTyping({ threadId, isTyping: false }));
    }
  },
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
        createdAt: Date.now(),
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
    builder.addCase(deleteThread, (state, action) => {
      const threadIdToDelete = action.payload;
      if (state.messagesByThread[threadIdToDelete]) {
        delete state.messagesByThread[threadIdToDelete];
      }
      if (state.typingStatusByThread[threadIdToDelete]) {
        delete state.typingStatusByThread[threadIdToDelete];
      }
    });
  },
});

export const { addMessage, setTyping } = chatSlice.actions;
export default chatSlice.reducer;
