import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../features/chat/messagesSlice";
import threadsReducer from "../features/threads/threadsSlice";

 const store = configureStore({
  reducer: {
    messages: messagesReducer,
    threads: threadsReducer
  }
});

export default store;