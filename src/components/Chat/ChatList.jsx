import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveThread, renameThreadAsync, deleteThread } from '@/features/slices/threadsSlice';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { fetchMessagesForThread } from '@/features/slices/chatSlice';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useActiveThread } from '../../hooks/useActiveThread';
import { createShortDescription } from '../../utils/textUtils';

function ChatList() {
  const [menuOpenForId, setMenuOpenForId] = useState(null);
  const [editingThreadId, setEditingThreadId] = useState(null);
  const menuRef = useOutsideClick(() => setMenuOpenForId(null));
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads.threads);
  const activeThreadId = useActiveThread();

  const handleThreadClick = (threadId) => {
    dispatch(setActiveThread(threadId));
    dispatch(fetchMessagesForThread(threadId));
  };

  return (
    <ul className="overflow-y-auto flex-1 px-3 py-2 sidebar-scroll">
      {threads.map((thread) => (
        <li
          key={thread.id}
          className={`relative mb-2 px-4 cursor-pointer rounded-lg transition-all duration-200 h-12 flex items-center ${
            thread.id === activeThreadId
              ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium shadow-lg border border-purple-500/30'
              : 'hover:bg-[#2a3145] hover:border-[#3a445f]/50 border border-transparent text-gray-200'
          }`}
          onClick={() => {
            if (!editingThreadId) {
              handleThreadClick(thread.id);
            }
          }}
        >
          <div className="flex justify-between items-center w-full">
            {editingThreadId === thread.id ? (
              <input
                type="text"
                defaultValue={thread.title}
                className="p-1 w-full text-sm font-medium text-white bg-transparent border-0 outline-none focus:outline-none"
                autoFocus
                onBlur={(e) => {
                  dispatch(renameThreadAsync({ id: thread.id, title: e.target.value }));
                  setEditingThreadId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    dispatch(renameThreadAsync({ id: thread.id, title: e.target.value }));
                    setEditingThreadId(null);
                  }
                }}
              />
            ) : (
              <span className="truncate text-sm max-w-[200px] font-medium" title={thread.title}>
                {createShortDescription(thread.title, 25)}
              </span>
            )}

            <MoreVertical
              className="flex-shrink-0 ml-2 w-4 h-4 text-gray-400 transition-colors duration-200 hover:text-white hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpenForId(menuOpenForId === thread.id ? null : thread.id);
              }}
            />
          </div>

          {menuOpenForId === thread.id && (
            <div
              ref={menuRef}
              className="absolute top-10 right-2 w-40 bg-gradient-to-b from-[#1a2131]/95 to-[#0f172a]/95 border border-[#3a445f]/50 rounded-lg shadow-2xl z-50 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="flex items-center px-4 py-3 w-full text-sm text-left text-gray-200 cursor-pointer hover:bg-[#2a3145]/80 transition-all duration-200 rounded-t-lg hover:text-white"
                onClick={() => {
                  setEditingThreadId(thread.id);
                  setMenuOpenForId(null);
                }}
              >
                <Pencil className="mr-3 w-4 h-4" />
                Редагувати
              </button>
              <button
                className="flex items-center px-4 py-3 w-full text-sm text-left text-red-400 cursor-pointer hover:bg-[#2a3145]/80 transition-all duration-200 rounded-b-lg hover:text-red-300"
                onClick={() => {
                  dispatch(deleteThread(thread.id));
                  setMenuOpenForId(null);
                }}
              >
                <Trash2 className="mr-3 w-4 h-4" />
                Видалити
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
export default ChatList;
