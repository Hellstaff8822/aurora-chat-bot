import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '@/features/slices/chatSlice';
import threadsReducer from '@/features/slices/threadsSlice';
import authReducer from '@/features/slices/authSlice';
import settingsReducer from '@/features/slices/settingsSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    threads: threadsReducer,
    auth: authReducer,
    settings: settingsReducer,
  },
});

export default store;
