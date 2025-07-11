import { useSelector, useDispatch } from 'react-redux';
import { setActiveThread } from '../features/threads/threadsSlice';

function ChatList() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads.threads);
  const activeThreadId = useSelector((state) => state.threads.activeThreadId);
  return (
    <ul className='flex-1 overflow-y-auto sidebar-scroll px-1'>
      {threads.map((thread) => (
        <li
        key={thread.id}
        className={`px-4 py-3 cursor-pointer ${
          thread.id === activeThreadId ? 'bg-blue-700 font-bold' : 'hover:bg-[#232a3a]'
        }`}
        onClick={() => dispatch(setActiveThread(thread.id))}
      >
        {thread.title}
      </li>
      ))}
    </ul>
  );
}
export default ChatList;
