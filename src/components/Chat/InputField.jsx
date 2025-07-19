import { useDispatch, useSelector } from 'react-redux';
import { createThread, setActiveThread } from '@features/threadsSlice';
import { sendMessage } from '@features/chatSlice';
import { useRef, useState, useEffect } from 'react';
import { useActiveThread } from '@hooks/useActiveThread';
import { SendHorizontal } from 'lucide-react';

function InputField() {
  const dispatch = useDispatch();
  const activeThreadId = useActiveThread();
  const user = useSelector((state) => state.auth.user);
  const [text, setText] = useState('');

  const isBotTyping = useSelector((state) =>
    activeThreadId ? !!state.chat.typingStatusByThread?.[activeThreadId] : false,
  );

  const textareaRef = useRef(null);

  const handleSendMessage = async () => {
    const userText = text.trim();
    if (!userText || isBotTyping) return;

    let threadId = activeThreadId;

    if (!threadId) {
      if (!user) {
        alert('Будь ласка, увійдіть, щоб почати чат.');
        return;
      }
      try {
        const resultAction = await dispatch(createThread(user.uid));
        if (createThread.fulfilled.match(resultAction)) {
          threadId = resultAction.payload.id;
          dispatch(setActiveThread(threadId));
        } else {
          alert('Не вдалося створити чат!');
          return;
        }
      } catch (error) {
        console.error('Не вдалося створити чат:', error);
        alert('Сталася помилка при створенні чату.');
        return;
      }
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
        <div className="w-full bg-[#0F172A]/60 backdrop-blur-lg border-t border-[#2A3248]/50 max-w-3xl mx-auto flex items-end gap-2 shadow-md p-3 mb-4 rounded-2xl">
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