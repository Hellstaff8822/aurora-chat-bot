import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { SendHorizontal } from 'lucide-react';
import { sendMessage } from '@features/chatSlice';
import { addThread } from '@features/threadsSlice';
import { useRef } from 'react';
import { useActiveThread } from '@hooks/useActiveThread';

function InputField() {
  const dispatch = useDispatch();
 const activeThreadId = useActiveThread();
  const isBotTyping = useSelector((state) => state.chat.isBotTyping);
  const textareaRef = useRef(null);

  const handleSendMessage = () => {
    const userText = textareaRef.current?.value.trim();
    if (!userText) return;

    if (activeThreadId) {
      dispatch(sendMessage({ userText, threadId: activeThreadId }));
    } else {
      const newThreadId = nanoid();
      dispatch(addThread({ id: newThreadId, title: 'Новий чат' }));
      dispatch(sendMessage({ userText, threadId: newThreadId }));
    }

    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSendMessage(); 
    }
  };

  return (
    <div className='fixed bottom-0 left-64 right-0 h-auto py-3 z-10'>
      <div className='max-w-3xl mx-auto flex justify-center'>
        <div className='w-full bg-[#0F172A]/60 backdrop-blur-md border-t border-[#2A3248]/50 max-w-3xl mx-auto flex items-end gap-2 shadow-md p-2 mb-4 rounded-2xl'>
          <textarea
            ref={textareaRef} 
            placeholder='Напишіть повідомлення...'
            className='flex-1 bg-transparent px-3 py-2 text-base rounded-md text-gray-100 placeholder-gray-400 outline-none resize-none max-h-48'
            rows="1" 
            onKeyDown={handleKeyDown} 
          />
          <button
            type='button' 
            className='ml-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors cursor-pointer self-end'
            disabled={isBotTyping}
            onClick={handleSendMessage} 
          >
            <SendHorizontal className='h-5 w-5 text-white' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputField;