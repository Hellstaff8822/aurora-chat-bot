import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  threads: [],
  activeThreadId: null,
  draftThreadId: nanoid(),
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
          title: 'New Chat',
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
      const thread = state.threads.find((t) => t.id === id);
      if (thread) {
        thread.title = title;
      }
    },

    deleteThread: (state, action) => {
      const idToDelete = action.payload;
      state.threads = state.threads.filter((t) => t.id !== idToDelete);
      if (state.activeThreadId === idToDelete) {
        state.activeThreadId = null;
      }
    },

    createThreadFromDraft: (state, action) => {
      const { id, title } = action.payload;
      const newThread = {
        id,
        title: title || 'New Chat',
        createdAt: Date.now(),
      };
      state.threads.push(newThread);
      state.activeThreadId = id;
      state.draftThreadId = null;
    },
  },
});

export const {
  addThread,
  setActiveThread,
  setTyping,
  renameThread,
  deleteThread,
  createThreadFromDraft,
} = threadsSlice.actions;
export default threadsSlice.reducer;
