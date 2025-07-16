import { useSelector } from 'react-redux';
import { useActiveThread } from './useActiveThread';

const EMPTY_ARRAY = [];

export const useChatMessages = () => {
  const activeThreadId = useActiveThread();

  const messages = useSelector((state) => {
    if (!activeThreadId) {
      return EMPTY_ARRAY;
    }

    return state.chat?.messagesByThread?.[activeThreadId] || EMPTY_ARRAY;
  });

  return messages;
};
