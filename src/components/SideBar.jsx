import Header from '../components/Header';
import ChatList from '../components/ChatList';

function Sidebar() {
  return (
    <aside className='w-64 h-full flex flex-col overflow-y-auto bg-[#1a2131] text-gray-200 [&::-webkit-scrollbar]:w-2'>
      <Header />
      <div className='p-4 border-b border-[#1E2536]'>
        <button className='w-full text-sm py-2 bg-blue-600 hover:bg-blue-700 rounded cursor-pointer'>
          + New chat
        </button>
      </div>
      <ChatList />
    </aside>
  );
}

export default Sidebar;