import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { geminiRequest } from '../../lib/geminiRequest';
import { generateTitle } from '../../lib/geminiTitle';
import { renameThread, deleteThread } from '@/features/slices/threadsSlice';

const initialState = {
  messagesByThread: {},
  isBotTyping: false,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ userText, threadId }, { dispatch, getState, rejectWithValue }) => {
    const threads = getState().threads.threads;
    const currentThread = threads.find((t) => t.id === threadId);
    const shouldRename = currentThread?.title === 'Новий чат';
    dispatch(setTyping(true));

    try {
      dispatch(addMessage({ text: userText, role: 'user', threadId }));

      const messages = getState().chat.messagesByThread[threadId] || [];
      const geminiMsgs = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const response = await geminiRequest(geminiMsgs);
      dispatch(addMessage({ text: response, role: 'bot', threadId }));

      if (shouldRename && messages.length === 1) {
        const title = await generateTitle(userText);
        dispatch(renameThread({ id: threadId, title }));
      }
    } catch (err) {
      const errorMessage = '⚠️ ' + (err.message || 'Сталася помилка');
      dispatch(addMessage({ text: errorMessage, role: 'bot', threadId }));
      return rejectWithValue(err.message);
    } finally {
      dispatch(setTyping(false));
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
      state.isBotTyping = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteThread, (state, action) => {
      const threadIdToDelete = action.payload;
      if (state.messagesByThread[threadIdToDelete]) {
        delete state.messagesByThread[threadIdToDelete];
      }
    });
  },
});

export const { addMessage, setTyping } = chatSlice.actions;
export default chatSlice.reducer;
