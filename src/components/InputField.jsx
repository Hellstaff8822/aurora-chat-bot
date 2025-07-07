import { useDispatch} from 'react-redux';
import { SendHorizontal } from 'lucide-react';
import { addMessage,addMessageBot } from '../features/chat/messagesSlice';

function InputField() {

  const dispatch = useDispatch();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements[0];
    const text = input.value;
    if (!text.trim()) return; 
      dispatch(addMessage({ text, role: 'user' }));
     
      setTimeout(() => {
        dispatch(addMessageBot({ text: "Thinking...", role: 'bot' }))
      }, 800);

      input.value = '';
  };
  return (
    <div className="fixed bottom-0 left-0 w-full z-10">
      <div className="ml-60 flex justify-center">
        <form className="w-full max-w-3xl flex items-center py-5 mb-4 bg-[#1d273d] border-t border-[#2A3248] rounded-full px-4" onSubmit={handleSubmit}>
          <input
            type="text"
            
            placeholder="Type your message..."
            className="flex-1 bg-[#1d273d] px-3 py-2 text-base rounded-md text-gray-100 placeholder-gray-400 outline-none"
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md transition-colors cursor-pointer"
          >
            <SendHorizontal className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputField;
