import { useRef, useEffect } from 'react';
import MessageItem from '@components/chat/MessageItem';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
const EMPTY_ARRAY = [];
function ChatWindow() {
  const activeThreadId = useSelector((state) => state.threads.activeThreadId);

  const messages = useSelector(
    (state) => state.chat.messagesByThread[activeThreadId] || EMPTY_ARRAY,
  );

  const endRef = useRef(null);
  const isBotTyping = useSelector((state) => state.chat.isBotTyping);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  return (
    <div className="flex-1 overflow-y-auto pt-6 bg-[#0F172A] sidebar-scroll">
      <div className="w-full max-w-3xl mx-auto px-4 pb-[104px]">
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
