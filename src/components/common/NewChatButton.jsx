import { useDispatch, useSelector } from 'react-redux';
import { createThread } from '@/features/slices/threadsSlice';
import { Plus } from 'lucide-react';

const NewChatButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleNewChat = () => {
    if (!user) {
      alert('Будь ласка, увійдіть в акаунт, щоб створити новий чат.');
      return;
    }
    dispatch(createThread(user.uid));
  };

  return (
    <button
      onClick={handleNewChat}
      className="flex items-center w-full  p-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-gray-200 rounded-md transition-colors cursor-pointer"
    >
      <Plus className="w-5 h-5 mr-3 " />
      New Chat
    </button>
  );
};

export default NewChatButton;