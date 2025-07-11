import { useDispatch } from "react-redux";
import { addThread } from "../features/threads/threadsSlice";
import { Plus } from 'lucide-react';


const NewChatButton = () =>{
    const dispatch = useDispatch()

    const handleNewChat = () =>{
        dispatch(addThread());
    }
    return(
        <button onClick={handleNewChat}className='flex items-center w-full  p-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-gray-200 rounded-md hover:bg-[#2A3248] transition-colors cursor-pointer'>
         <Plus className='w-5 h-5 mr-3 ' />
            New Chat
      </button>
    )
}

export default NewChatButton;