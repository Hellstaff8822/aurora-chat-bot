import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  threads: [],
  activeThreadId: null,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    addThread: (state, action) => {
      const { id, title } = action.payload || {};
      const newThreadId = id || nanoid(); 

      state.threads.unshift({ 
        id: newThreadId,
        title: title || 'Новий чат',
        createdAt: Date.now(),
      });
      state.activeThreadId = newThreadId;
    },

    setActiveThread: (state, action) => {
      state.activeThreadId = action.payload;
    },

    renameThread: (state, action) => {
      const { id, title } = action.payload;
      const thread = state.threads.find((t) => t.id === id);
      if (thread && title) {
        thread.title = title.replace(/"/g, '');
      }
    },

    deleteThread: (state, action) => {
      const idToDelete = action.payload;
      state.threads = state.threads.filter((t) => t.id !== idToDelete);
      if (state.activeThreadId === idToDelete) {
        state.activeThreadId = null;
      }
    },
  },
});

export const {
  addThread,
  setActiveThread,
  renameThread,
  deleteThread,
} = threadsSlice.actions;

export default threadsSlice.reducer;