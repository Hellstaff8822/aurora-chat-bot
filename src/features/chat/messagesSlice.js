import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { geminiRequest } from '../../lib/geminiRequest';

const initialState = {
  messages: [],
  isBotTyping: false,
};

export const sendMessage = createAsyncThunk(
  'chat/send',
  async (userText, { dispatch, getState, rejectWithValue }) => {
    dispatch(addMessage({ text: userText, role: 'user' }));
    const geminiMsgs = getState().messages.messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));


    try {
      const botText = await geminiRequest(geminiMsgs, 'gemini-2.0-flash');
      dispatch(addMessage({ text: botText, role: 'bot' }));
    } catch (err) {
      dispatch(addMessage({ text: '⚠️ ' + err.message, role: 'bot' }));
      return rejectWithValue(err.message);
    } 
  }
);
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { text, role } = action.payload;
      state.messages.push({
        id: nanoid(),
        text: text.trim(),
        role,
        createdAt: Date.now(),
      });
    },
  },
  extraReducers: (builder) =>{
    builder
    .addCase(sendMessage.pending,   (s) => { s.isBotTyping = true;  })
    .addCase(sendMessage.fulfilled, (s) => { s.isBotTyping = false; })
    .addCase(sendMessage.rejected,  (s) => { s.isBotTyping = false; });
  }
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
