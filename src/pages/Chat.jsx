import { Sidebar, ChatWindow, InputField } from '@/components';



function Chat(){
    return(
         <div className='h-screen flex bg-[#0F172A] overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col relative'>
        <ChatWindow />
        <InputField />
      </div>
    </div>
    )
}

export default Chat;