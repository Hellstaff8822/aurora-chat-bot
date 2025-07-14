import { useRef, useEffect } from 'react';
import MessageItem from '@components/chat/MessageItem';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useChatMessages } from '@/hooks/useChatMessages';

function ChatWindow() {
  const messages = useChatMessages();
  const isBotTyping = useSelector((state) => state.chat.isBotTyping);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto pt-6 bg-[#0F172A] sidebar-scroll">
      <div className="w-full max-w-3xl  pt-6  mx-auto px-4 pb-[104px]">
        {messages.map((m) => (
          <MessageItem key={m.id} text={m.text} role={m.role} />
        ))}
        {isBotTyping && (
          <div className="flex items-center space-x-2 py-4 px-3">
            <PulseLoader color="white" size={6} />
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
