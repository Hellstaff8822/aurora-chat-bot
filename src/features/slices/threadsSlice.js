import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatService } from '@/lib/ChatService';

const initialState = {
  threads: [],
  activeThreadId: null,
  isLoading: false,
};

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (userId, { rejectWithValue }) => {
    try {
      const chats = await ChatService.getChatsForUser(userId);
      return chats;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createThread = createAsyncThunk(
  'threads/createThread',
  async (userId, { rejectWithValue }) => {
    try {
      const chatId = await ChatService.createNewChat(userId);
      return { id: chatId, title: 'Новий чат', createdAt: new Date().toISOString() };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const renameThreadAsync = createAsyncThunk(
  'threads/renameThreadAsync',
  async ({ id, title }, { rejectWithValue }) => {
    try {
      await ChatService.updateChatTitle(id, title);
      return { id, title };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteThread = createAsyncThunk(
  'threads/deleteThread',
  async (chatId, { rejectWithValue }) => {
    try {
      await ChatService.deleteChat(chatId);
      return chatId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setActiveThread: (state, action) => {
      state.activeThreadId = action.payload;
      localStorage.setItem('activeThreadId', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload;
        const savedActiveThreadId = localStorage.getItem('activeThreadId');
        if (state.threads.length > 0) {
          if (savedActiveThreadId && state.threads.some((t) => t.id === savedActiveThreadId)) {
            state.activeThreadId = savedActiveThreadId;
          } else {
            state.activeThreadId = state.threads[0].id;
            localStorage.setItem('activeThreadId', state.threads[0].id);
          }
        } else {
          state.activeThreadId = null;
          localStorage.removeItem('activeThreadId');
        }
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.isLoading = false;
        console.error('Помилка завантаження чатів:', action.payload);
      })
      .addCase(deleteThread.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.threads = state.threads.filter((t) => t.id !== idToDelete);
        if (state.activeThreadId === idToDelete) {
          state.activeThreadId = state.threads.length > 0 ? state.threads[0].id : null;
          if (state.activeThreadId) {
            localStorage.setItem('activeThreadId', state.activeThreadId);
          } else {
            localStorage.removeItem('activeThreadId');
          }
        }
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.threads.unshift(action.payload);
        state.activeThreadId = action.payload.id;
        localStorage.setItem('activeThreadId', action.payload.id);
      })
      .addCase(renameThreadAsync.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        const thread = state.threads.find((t) => t.id === id);
        if (thread) {
          thread.title = title;
        }
      });
  },
});

export const { setActiveThread } = threadsSlice.actions;
export default threadsSlice.reducer;  