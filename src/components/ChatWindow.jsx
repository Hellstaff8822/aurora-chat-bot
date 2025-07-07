import { useSelector } from 'react-redux';
import MessageItem from './MessageItem';
function ChatWindow() {
  const messages = useSelector((state) => state.messages.messages);

  return (
    <div className='flex flex-col flex-1 overflow-y-auto bg-[#0F172A]'>
      <div className='flex-1 flex justify-center items-center'>
        <div className='w-full max-w-3xl mx-auto px-4'>
          {messages.map((msg) => (
            <MessageItem key={msg.id} text={msg.text} role={msg.role} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
