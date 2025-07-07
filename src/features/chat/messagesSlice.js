import { createSlice  } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  messages: [],
};


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
            })
        },
        addMessageBot: (state, action) =>{
            const {text} = action.payload;
            state.messages.push({
                id: nanoid(),
                text: text.trim(),
                role: "bot",
            })
        }
    }
})

export const { addMessage, addMessageBot } = messagesSlice.actions;

export default messagesSlice.reducer