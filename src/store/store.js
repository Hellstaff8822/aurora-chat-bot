import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '@/features/slices/chatSlice';
import threadsReducer from '@/features/slices/threadsSlice';
import authReducer from '@/features/slices/authSlice';


const store = configureStore({
  reducer: {
    chat: chatReducer,
    threads: threadsReducer,
    auth: authReducer,
  },
});



export default store;
