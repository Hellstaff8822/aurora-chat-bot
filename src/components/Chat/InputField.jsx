import { useDispatch, useSelector } from 'react-redux';
import { createThread, setActiveThread } from '@features/threadsSlice';
import { sendMessage } from '@features/chatSlice';
import { useRef, useState, useEffect } from 'react';
import { useActiveThread } from '@hooks/useActiveThread';
import { SendHorizontal } from 'lucide-react';
import { useToast } from '@hooks/useToast';

function InputField() {
  const dispatch = useDispatch();
  const activeThreadId = useActiveThread();
  const user = useSelector((state) => state.auth.user);
  const [text, setText] = useState('');

  const isBotTyping = useSelector((state) =>
    activeThreadId ? !!state.chat.typingStatusByThread?.[activeThreadId] : false,
  );

  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const { error } = useToast();

  const handleSendMessage = async () => {
    if (!text.trim()) return;

    if (!user) {
      error('Будь ласка, увійдіть, щоб почати чат.');
      return;
    }

    let threadId = activeThreadId;

    if (!threadId) {
      try {
        const resultAction = await dispatch(createThread(user.uid));
        
        if (createThread.fulfilled.match(resultAction)) {
          threadId = resultAction.payload.id;
          dispatch(setActiveThread(threadId));
        } else {
          error('Не вдалося створити чат!');
          return;
        }
      } catch (error) {
        console.error('Не вдалося створити чат:', error);
        error('Сталася помилка при створенні чату.');
        return;
      }
    }

    dispatch(sendMessage({ userText: text.trim(), threadId }));
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

  useEffect(() => {
    const updateInputHeightVar = () => {
      const el = containerRef.current;
      if (!el) return;
      const height = el.offsetHeight || 0;
      document.documentElement.style.setProperty('--input-height', `${height}px`);
    };

    updateInputHeightVar();
    window.addEventListener('resize', updateInputHeightVar);

    return () => {
      window.removeEventListener('resize', updateInputHeightVar);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    document.documentElement.style.setProperty('--input-height', `${el.offsetHeight || 0}px`);
  }, [text, isBotTyping]);

  return (
    <div ref={containerRef} className="fixed right-0 bottom-0 left-0 z-30 py-3 h-auto lg:left-80 xl:left-80">
      <div className="flex justify-center px-3 mx-auto max-w-3xl md:px-4">
        <div className="w-full bg-[#0F172A] border-t border-[#2A3248]/50 max-w-3xl mx-auto flex items-center gap-2 shadow-xl p-2.5 md:p-3 mb-4 rounded-2xl">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Напишіть повідомлення..."
            className="flex-1 px-3 md:px-4 py-2.5 md:py-3 max-h-48 text-sm md:text-base placeholder-gray-400 text-gray-100 bg-transparent rounded-md outline-none resize-none sidebar-scroll"
            rows="1"
            onKeyDown={handleKeyDown}
            disabled={isBotTyping}
          />
          <button
            type="button"
            className="flex-shrink-0 p-2 md:p-2.5 ml-1.5 md:ml-2 bg-blue-600 rounded-full transition-colors cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isBotTyping || !text.trim()}
            onClick={handleSendMessage}
          >
            <SendHorizontal className="w-4 h-4 text-white md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default InputField;
