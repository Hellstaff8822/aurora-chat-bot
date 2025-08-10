import { createSelector } from 'reselect';

const selectMessagesByThread = (state) => state.chat.messagesByThread;
const selectActiveThreadId = (state) => state.threads.activeThreadId;

export const selectActiveThreadMessages = createSelector(
  [selectMessagesByThread, selectActiveThreadId],
  (messagesByThread, activeThreadId) => {
    if (!activeThreadId) {
      return [];
    }
    return messagesByThread[activeThreadId] || [];
  },
);
