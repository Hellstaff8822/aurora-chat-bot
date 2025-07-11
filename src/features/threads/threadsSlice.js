import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  threads: [],
  activeThreadId: null,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    addThread: {
      reducer(state, action) {
        const newId = action.payload;
        state.threads.push({
          id: newId,
          title: `Chat ${state.threads.length + 1}`,
          messages: [],
          createdAt: Date.now(),
        });
      },
      prepare() {
        return { payload: nanoid() };
      },
    },
    setTyping: (state, action) => {
      state.isBotTyping = action.payload;
    },
    setActiveThread: (state, action) => {
      state.activeThreadId = action.payload;
      const thread = state.threads.find((t) => t.id === action.payload);
      if (thread) {
        thread.lastAccessed = Date.now();
      }
    },

    renameThread: (state, action) => {
        const { id, title } = action.payload;
        const thread = state.threads.find(t => t.id === id);
        if (thread) {
          thread.title = title;
        }
      },
  },
});

export const { addThread, setActiveThread, setTyping, renameThread } = threadsSlice.actions;
export default threadsSlice.reducer;
