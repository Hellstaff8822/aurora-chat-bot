import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import gemini from "../../lib/geminiClient";

const initialState = {
  messages: [],
  isBotTyping: false,
};

export const sendMessage = createAsyncThunk(
  "chat/send",
  async (userText, { dispatch, getState, rejectWithValue }) => {
    dispatch(addMessage({ text: userText, role: "user" }));
    dispatch(setTyping(true));

    const geminiMsgs = getState().messages.messages.map(m => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    try {
      const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: geminiMsgs,
      });

      dispatch(addMessage({ text: response.text, role: "bot" }));
    } catch (err) {
      dispatch(addMessage({ text: "⚠️ " + err.message, role: "bot" }));
      console.error(err);
      return rejectWithValue(err.message);
   
    } finally {
      dispatch(setTyping(false));
    }
  }
);
const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action) =>{
            const { text, role} = action.payload;
            state.messages.push({
                id: nanoid(),
                text: text.trim(),
                role,
                createdAt: Date.now()
            })
        },
        setTyping: (state, action) =>{
            state.isBotTyping = action.payload;
        }
    }
})

export const { addMessage, setTyping } = messagesSlice.actions;

export default messagesSlice.reducer