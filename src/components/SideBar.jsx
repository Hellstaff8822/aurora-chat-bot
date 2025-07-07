import Header from '../components/Header';

function Sidebar() {
  return (
    <aside className='w-64 bg-[#1a2131] text-gray-200 h-screen flex flex-col [&::-webkit-scrollbar]:w-2'>
      <Header />
      <div className='p-4 border-b border-[#1E2536]'>
        <button className=' w-full text-sm py-2 bg-blue-600 hover:bg-blue-700 rounded cursor-pointer'>
          + New chat
        </button>
      </div>

      <ul className='flex-1 overflow-y-auto sidebar-scroll'>
        <li className='px-4 py-3 hover:bg-[#232a3a] cursor-pointer'>
          Example chat 1
        </li>
        <li className='px-4 py-3 hover:bg-[#232a3a] cursor-pointer'>
          Example chat 2
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
