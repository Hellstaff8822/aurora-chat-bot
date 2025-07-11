import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addThread, setActiveThread } from './features/threads/threadsSlice';

import Sidebar from './components/SideBar';
import ChatWindow from './components/ChatWindow';
import InputField from './components/InputField';

function App() {
  const dispatch = useDispatch();
  const activeThreadId = useSelector(state => state.threads.activeThreadId);

  useEffect(() => {
    if (!activeThreadId) {
      const action = dispatch(addThread());
      dispatch(setActiveThread(action.payload));
    }
  }, [activeThreadId, dispatch]);
  return (
    <>
      <div className='h-screen flex bg-[#0F172A] overflow-hidden'>
        <Sidebar />
        <div className='flex-1 flex flex-col relative'>
          <ChatWindow />
          <InputField />
        </div>
      </div>
    </>
  );
}

export default App;
