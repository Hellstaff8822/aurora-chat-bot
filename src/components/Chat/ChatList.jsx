import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveThread, renameThreadAsync, deleteThread } from '@/features/slices/threadsSlice';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { fetchMessagesForThread } from '@/features/slices/chatSlice';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useActiveThread } from '../../hooks/useActiveThread';

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
    <ul className="overflow-y-auto flex-1 px-1 sidebar-scroll">
      {threads.map((thread) => (
        <li
          key={thread.id}
          className={`relative px-4 py-3 cursor-pointer ${
            thread.id === activeThreadId ? 'bg-blue-700 font-bold' : 'hover:bg-[#232a3a]'
          }`}
          onClick={() => {
            if (!editingThreadId) {
              handleThreadClick(thread.id);
            }
          }}
        >
          <div className="flex justify-between items-center">
            {editingThreadId === thread.id ? (
              <input
                type="text"
                defaultValue={thread.title}
                className="p-1 w-full text-white bg-gray-800 rounded outline-none"
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
              <span className="truncate">{thread.title}</span>
            )}

            <MoreVertical
              className="flex-shrink-0 ml-2 w-5 h-5 text-gray-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpenForId(menuOpenForId === thread.id ? null : thread.id);
              }}
            />
          </div>

          {menuOpenForId === thread.id && (
            <div
              ref={menuRef}
              className="absolute top-10 right-2 w-40 bg-[#2A3248] border border-gray-600 rounded-md shadow-lg z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="flex items-center px-3 py-2 w-full text-sm text-left text-white cursor-pointer hover:bg-gray-700"
                onClick={() => {
                  setEditingThreadId(thread.id);
                  setMenuOpenForId(null);
                }}
              >
                <Pencil className="mr-2 w-4 h-4" />
                Редагувати
              </button>
              <button
                className="flex items-center px-3 py-2 w-full text-sm text-left text-red-400 cursor-pointer hover:bg-gray-700"
                onClick={() => {
                  dispatch(deleteThread(thread.id));
                  setMenuOpenForId(null);
                }}
              >
                <Trash2 className="mr-2 w-4 h-4" />
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
