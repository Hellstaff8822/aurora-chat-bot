import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Header from '@components/chat/Header';
import ChatList from '@components/chat/ChatList';
import NewChatButton from '@common/NewChatButton';
import { signOutUser } from '@lib/auth';
import AuroraAvatar from '../../assets/aurora128_enhanced.png';

function Sidebar() {
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    signOutUser();
  };

  return (
    <aside className="w-64 h-full flex flex-col overflow-y-auto bg-[#1a2131] text-gray-200">
      <Link to="/">
        <Header />
      </Link>
      <div className="p-4 border-b border-[#1E2536]">
        <NewChatButton />
      </div>
      <ChatList />

      {user && (
        <div className="p-4 border-t border-[#1E2536]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
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
              <div className="text-base font-semibold truncate max-w-[100px]" title={user.nickname || user.name || user.email}>
                {user.nickname || user.name || user.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Вийти"
              className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
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
