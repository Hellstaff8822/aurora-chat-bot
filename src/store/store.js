import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../features/chat/messagesSlice";

 const store = configureStore({
  reducer: {
    messages: messagesReducer
  }
});

export default store;