import { useSelector } from 'react-redux';
import { selectActiveThreadMessages } from '@features/selectors';

export const useChatMessages = () => {
  const messages = useSelector(selectActiveThreadMessages);
  return messages;
};
