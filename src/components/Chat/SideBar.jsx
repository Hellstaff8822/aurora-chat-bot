import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, MessageSquare, UserCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createThread } from '@/features/slices/threadsSlice';
import { clearUser } from '@/features/slices/authSlice';
import { clearThreads } from '@/features/slices/threadsSlice';
import { clearMessages } from '@/features/slices/chatSlice';
import Button from '@/components/common/Button';
import Header from './Header';
import ChatList from './ChatList';
import { signOutUser } from '@lib/auth';
import { useToast } from '@/hooks/useToast';

function Sidebar({ isOpen = true, onToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isMobile, setIsMobile] = useState(false);
  const { error, success } = useToast();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNewChat = () => {
    if (!user) {
      error('Будь ласка, увійдіть в акаунт, щоб створити новий чат.');
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
      success('Ви успішно вийшли з акаунту');
      navigate('/login');
    } catch (error) {
      console.error('Помилка при виході:', error);
      error('Помилка при виході з акаунту');
    }
  };

  return (
    <>
      {isMobile && isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onToggle} />}

      <aside
        className={`
        fixed lg:relative top-0 left-0 h-full flex flex-col overflow-y-auto bg-gradient-to-b from-[#1a2131] to-[#0f172a] text-gray-200 border-r border-[#2a3145] z-50
        transition-all duration-300 ease-in-out
        ${isMobile ? `w-80 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}` : 'w-80'}
      `}
      >
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-[#1E2536] bg-gradient-to-r from-[#1E2536]/50 to-transparent">
            <Link to="/" className="flex-1">
              <Header />
            </Link>
            <button
              onClick={onToggle}
              className="p-2 text-gray-400 hover:text-white hover:bg-[#2a3145] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {!isMobile && (
          <Link to="/">
            <Header />
          </Link>
        )}

        <div className="px-3 py-2 border-b border-[#1E2536] bg-gradient-to-r from-[#1E2536]/50 to-transparent">
          <button
            onClick={handleNewChat}
            className="flex relative gap-2 items-center cursor-pointer px-4 w-full h-12 text-sm font-medium text-left
text-gray-200 bg-[#2a3145]/80 backdrop-blur-[2px] rounded-lg border border-[#3a445f]/50
transition-colors duration-200 hover:bg-[#2a3145]"
          >
            <MessageSquare className="w-4 h-4 text-gray-200" />
            <span className="text-sm font-medium truncate">New Chat</span>
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
                  <UserCircle className="w-7 h-7 text-gray-200" />
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
                <LogOut className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
