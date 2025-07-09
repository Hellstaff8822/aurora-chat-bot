import { useDispatch } from 'react-redux';
import { SendHorizontal } from 'lucide-react';
import {sendMessage } from '../features/chat/messagesSlice';

function InputField() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements[0];
    const text = input.value;
    if (!text.trim()) return;
   dispatch(sendMessage(text));

    

    input.value = '';
  };
  return (
    <div className='fixed bottom-0 left-64 right-0 h-20 py-3 z-10'>
      <div className='max-w-3xl mx-auto flex justify-center'>
        <form
          className='w-full  left-64 right-0 
             bg-[#0F172A]/60 backdrop-blur-md
             border-t border-[#2A3248]/50 max-w-3xl mx-auto flex items-center gap-2 shadow-md  justify-center fixed bottom-0  h-20  py-5 mb-4  rounded-full px-4'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Type your message...'
            className='flex-1 bg-transparen px-3 py-2 text-base rounded-md text-gray-100 placeholder-gray-400 outline-none'
          />
          <button
            type='submit'
            className='ml-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50  disabled:cursor-not-allowed rounded-md transition-colors cursor-pointer'
          >
            <SendHorizontal className='h-5 w-5 text-white' />
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputField;
