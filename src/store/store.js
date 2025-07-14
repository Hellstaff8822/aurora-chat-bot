import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '@/features/slices/chatSlice';
import threadsReducer from '@/features/slices/threadsSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('chatState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Не вдалося завантажити стан', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const stateToSave = {
      threads: state.threads,
      messages: state.messages,
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem('chatState', serializedState);
  } catch (err) {
    console.error('Не вдалося зберегти стан', err);
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    chat: chatReducer,
    threads: threadsReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
