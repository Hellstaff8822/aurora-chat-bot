import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { geminiRequest } from '../../lib/geminiRequest';
import {
  setTyping,
  createThreadFromDraft,
  renameThread,
  deleteThread
} from '../threads/threadsSlice';
import { generateTitle } from '../../lib/geminiTitle';

const initialState = {
  messagesByThread: {},
  isBotTyping: false,
};

export const sendMessage = createAsyncThunk(
  'chat/send',
  async ({ userText, threadId }, { dispatch, getState, rejectWithValue }) => {
    dispatch(addMessage({ text: userText, role: 'user', threadId }));
    dispatch(setTyping(true));

    const updatedMessages =
      getState().messages.messagesByThread[threadId] || [];

    const geminiMsgs = updatedMessages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    try {
      const response = await geminiRequest(geminiMsgs, 'gemini-2.0-flash');

      dispatch(addMessage({ text: response, role: 'bot', threadId }));

      const thread = getState().threads.threads.find((t) => t.id === threadId);

      if (thread?.title === 'New Chat' && updatedMessages.length === 1) {
        const title = await generateTitle(userText);
        dispatch(renameThread({ id: threadId, title }));
      }
    } catch (err) {
      dispatch(
        addMessage({ text: '⚠️ ' + err.message, role: 'bot', threadId })
      );
      return rejectWithValue(err.message);
    } finally {
      dispatch(setTyping(false));
    }
  }
);

export const sendMessageToActiveThread = (text) => (dispatch, getState) => {
  const state = getState();
  const activeThreadId = state.threads.activeThreadId;
  const draftThreadId = state.threads.draftThreadId;

  if (activeThreadId) {
    dispatch(sendMessage({ userText: text, threadId: activeThreadId }));
  } else if (draftThreadId) {
    const title = text || 'New Chat';
    dispatch(createThreadFromDraft({ id: draftThreadId, title }));
    dispatch(sendMessage({ userText: text, threadId: draftThreadId }));
  }
};

const messagesSlice = createSlice({
  name: 'messages',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isBotTyping = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isBotTyping = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isBotTyping = false;
      })
     .addCase(deleteThread, (state, action) => {
        const threadIdToDelete = action.payload;
        if (state.messagesByThread[threadIdToDelete]) {
          delete state.messagesByThread[threadIdToDelete];
        }
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
