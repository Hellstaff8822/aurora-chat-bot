import { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';

function ChatWindow() {
  const messages = useSelector((state) => state.messages.messages);
  const endRef = useRef(null);
  const isBotTyping = useSelector((state) => state.messages.isBotTyping);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className='h-[calc(100vh-80px)] overflow-y-auto pt-6 bg-[#0F172A] sidebar-scroll'>
        <div className='flex-1 overflow-y-auto pt-6 pb-[104px] bg-[#0F172A] relative'>
          <div className='w-full max-w-3xl mx-auto px-4 pb-[72px]'>
            {messages.map((m) => (
              <MessageItem key={m.id} text={m.text} role={m.role} />
            ))}
            {isBotTyping && (
              <div className='py-4 px-3'>
                <PulseLoader color='white' size={8} />
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatWindow;
