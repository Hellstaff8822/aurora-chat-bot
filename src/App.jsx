import Sidebar from './components/SideBar';
import ChatWindow from './components/ChatWindow';
import InputField from './components/InputField';

function App() {
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
