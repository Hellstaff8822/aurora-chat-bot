import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { createThread } from '@/features/slices/threadsSlice';
import Button from '@/components/common/Button';
import Header from '@components/chat/Header';
import ChatList from '@components/chat/ChatList';
import { signOutUser } from '@lib/auth';
import AuroraAvatar from '../../assets/aurora128_enhanced.png';

function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleNewChat = () => {
    if (!user) {
      alert('Будь ласка, увійдіть в акаунт, щоб створити новий чат.');
      return;
    }
    dispatch(createThread(user.uid));
  };

  const handleLogout = () => {
    signOutUser();
  };

  return (
    <aside className="w-64 h-full flex flex-col overflow-y-auto bg-[#1a2131] text-gray-200">
      <Link to="/">
        <Header />
      </Link>
      <div className="p-4 border-b border-[#1E2536]">
        <Button onClick={handleNewChat} variant="primary">
          <Plus className="mr-3 w-5 h-5" />
          New Chat
        </Button>
      </div>
      <ChatList />

      {user && (
        <div className="p-4 border-t border-[#1E2536]">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex gap-3 items-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#2a3145]"
                />
              ) : (
                <img
                  src={AuroraAvatar}
                  alt="Default Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#2a3145] bg-[#3a445f] p-1"
                />
              )}
              <div className="text-base font-semibold truncate max-w-[100px]" title={user.nickname || user.email}>
                {user.nickname || user.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Вийти"
              className="p-2 text-gray-400 rounded-md transition-colors hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
