import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '@/features/slices/chatSlice';
import threadsReducer from '@/features/slices/threadsSlice';
import authReducer from '@/features/slices/authSlice';
import { loadState, saveState } from '@utils/persistence';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    chat: chatReducer,
    threads: threadsReducer,
    auth: authReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
