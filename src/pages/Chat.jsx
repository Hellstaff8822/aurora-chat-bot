import { useParams } from 'react-router-dom';

import { Sidebar, ChatWindow, InputField } from '@/components';

function Chat() {
  const { chatId } = useParams();
  return (
    <div className="h-screen flex bg-[#0F172A] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <ChatWindow chatId={chatId} />
        <InputField chatId={chatId} />
      </div>
    </div>
  );
}

export default Chat;
