import { SendHorizontal } from 'lucide-react';

function InputField() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-10">
      <div className="ml-60 flex justify-center">
        <form className="w-full max-w-3xl flex items-center py-5 mb-4 bg-[#1d273d] border-t border-[#2A3248] rounded-full px-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-[#1d273d] px-3 py-2 text-base rounded-md text-gray-100 placeholder-gray-400 outline-none"
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md transition-colors"
          >
            <SendHorizontal className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputField;
