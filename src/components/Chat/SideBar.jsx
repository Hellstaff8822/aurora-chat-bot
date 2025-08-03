import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { createThread } from '@/features/slices/threadsSlice';
import { clearUser } from '@/features/slices/authSlice';
import { clearThreads } from '@/features/slices/threadsSlice';
import { clearMessages } from '@/features/slices/chatSlice';
import Button from '@/components/common/Button';
import Header from '@components/chat/Header';
import ChatList from '@components/chat/ChatList';
import { signOutUser } from '@lib/auth';
import AuroraAvatar from '../../assets/aurora128_enhanced.png';

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleNewChat = () => {
    if (!user) {
      alert('Будь ласка, увійдіть в акаунт, щоб створити новий чат.');
      return;
    }
    dispatch(createThread(user.uid));
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      dispatch(clearUser());
      dispatch(clearThreads());
      dispatch(clearMessages());
      navigate('/login');
    } catch (error) {
      console.error('Помилка при виході:', error);
    }
  };

  return (
    <aside className="w-80 h-full flex flex-col overflow-y-auto bg-gradient-to-b from-[#1a2131] to-[#0f172a] text-gray-200 border-r border-[#2a3145]">
      <Link to="/">
        <Header />
      </Link>
      <div className="p-4 border-b border-[#1E2536] bg-gradient-to-r from-[#1E2536]/50 to-transparent">
        <button
          onClick={handleNewChat}
          className="text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 font-medium rounded-lg text-sm px-4 py-3 w-full h-12 flex items-center justify-start gap-2 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(147,51,234,0.4)] border border-purple-400/20"
        >
          <Plus className="w-5 h-5" />
          New Chat
        </button>
      </div>
      <ChatList />

      {user && (
        <div className="p-4 border-t border-[#1E2536] bg-gradient-to-r from-[#1E2536]/50 to-transparent">
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
              className="relative z-50 p-2 text-sm font-medium text-gray-300 bg-[#2a3145] rounded-lg hover:bg-[#3a445f] hover:text-white hover:transform hover:scale-105 hover:shadow-lg transition-all duration-300 border border-[#3a445f]/50 hover:border-purple-500/50"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
