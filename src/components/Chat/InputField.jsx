import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { SendHorizontal } from 'lucide-react';
import { sendMessage } from '@/features/slices/chatSlice';
import { addThread } from '@/features/slices/threadsSlice';
import { useActiveThread } from '@hooks/useActiveThread';

function InputField() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const activeThreadId = useActiveThread();

  const isBotTyping = useSelector((state) =>
    activeThreadId ? state.chat.typingStatusByThread[activeThreadId] : false,
  );

  const textareaRef = useRef(null);

  const handleSendMessage = () => {
    const userText = text.trim();
    if (!userText || isBotTyping) return;

    let threadId = activeThreadId;

    if (!threadId) {
      const newThreadId = nanoid();
      dispatch(addThread({ id: newThreadId, title: 'Новий чат' }));
      threadId = newThreadId;
    }

    dispatch(sendMessage({ userText, threadId }));
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    if (text === '' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [text]);

  return (
    <div className="fixed bottom-0 left-64 right-0 h-auto py-3 z-10">
      <div className="max-w-3xl mx-auto flex justify-center">
        <div className="w-full bg-slate-800/50 backdrop-blur-lg shadow-inner max-w-3xl mx-auto flex items-end gap-2 p-3 mb-4 rounded-2xl">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Напишіть повідомлення..."
            className="flex-1 bg-transparent px-4 py-3 text-base rounded-md text-gray-100 placeholder-gray-400 outline-none resize-none max-h-48 sidebar-scroll"
            rows="1"
            onKeyDown={handleKeyDown}
            disabled={isBotTyping}
          />
          <button
            type="button"
            className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors cursor-pointer self-end"
            disabled={isBotTyping || !text.trim()}
            onClick={handleSendMessage}
          >
            <SendHorizontal className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputField;
