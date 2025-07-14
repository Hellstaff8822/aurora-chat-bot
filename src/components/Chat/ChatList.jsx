import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveThread, renameThread, deleteThread } from '@/features/slices/threadsSlice';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

function ChatList() {
  const [menuOpenForId, setMenuOpenForId] = useState(null);
  const [editingThreadId, setEditingThreadId] = useState(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads.threads);
  const activeThreadId = useSelector((state) => state.threads.activeThreadId);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenForId(null);
      }
    };

    if (menuOpenForId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpenForId]);
  return (
    <ul className="flex-1 overflow-y-auto sidebar-scroll px-1">
      {threads.map((thread) => (
        <li
          key={thread.id}
          className={`relative px-4 py-3 cursor-pointer ${
            thread.id === activeThreadId ? 'bg-blue-700 font-bold' : 'hover:bg-[#232a3a]'
          }`}
          onClick={() => {
            if (!editingThreadId) {
              dispatch(setActiveThread(thread.id));
            }
          }}
        >
          <div className="flex items-center justify-between">
            {editingThreadId === thread.id ? (
              <input
                type="text"
                defaultValue={thread.title}
                className="bg-gray-800 text-white p-1 rounded w-full outline-none"
                autoFocus
                onBlur={(e) => {
                  dispatch(renameThread({ id: thread.id, title: e.target.value }));
                  setEditingThreadId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    dispatch(renameThread({ id: thread.id, title: e.target.value }));
                    setEditingThreadId(null);
                  }
                }}
              />
            ) : (
              <span className="truncate">{thread.title}</span>
            )}

            <MoreVertical
              className="w-5 h-5 text-gray-400 hover:text-white flex-shrink-0 ml-2"
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
                className="flex items-center w-full px-3 py-2 text-left text-sm text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setEditingThreadId(thread.id);
                  setMenuOpenForId(null);
                }}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Редагувати
              </button>
              <button
                className="flex items-center w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  dispatch(deleteThread(thread.id));
                  setMenuOpenForId(null);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
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
