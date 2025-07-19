// src/components/chat/SideBar.jsx
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Header from '@components/chat/Header';
import ChatList from '@components/chat/ChatList';
import NewChatButton from '@common/NewChatButton';
import { signOutUser } from '@lib/auth';

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
          <div className="flex items-center justify-between">
            <div className="text-sm truncate" title={user.email}>
              {user.name || user.email}
            </div>
            <button
              onClick={handleLogout}
              title="Вийти"
              className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
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
