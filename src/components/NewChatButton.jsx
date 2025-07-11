import { useDispatch } from "react-redux";
import { addThread } from "../features/threads/threadsSlice";


const NewChatButton = () =>{
    const dispatch = useDispatch()

    const handleNewChat = () =>{
        dispatch(addThread());
    }
    return(
        <button onClick={handleNewChat}className='w-full text-sm py-2 bg-blue-600 hover:bg-blue-700 rounded cursor-pointer'>
        + New chat
      </button>
    )
}

export default NewChatButton;