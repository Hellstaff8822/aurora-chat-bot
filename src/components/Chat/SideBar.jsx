import Header from '@components/chat/Header';
import ChatList from '@components/chat/ChatList';
import NewChatButton from '@common/NewChatButton';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 h-full flex flex-col overflow-y-auto bg-[#1a2131] text-gray-200 [&::-webkit-scrollbar]:w-2">
      <Link to="/">
        <Header />
      </Link>
      <div className="p-4 border-b border-[#1E2536]">
        <NewChatButton />
      </div>
      <ChatList />
    </aside>
  );
}

export default Sidebar;
