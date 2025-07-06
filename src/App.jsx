import Header from './components/Header';
import Sidebar from './components/SideBar';

import ChatWindow from './components/ChatWindow';
import InputField from './components/InputField';
function App() {
  return (
    <>
      <div className='h-screen flex flex-col bg-[#0F172A]'>
        <Header />
        <div className='flex flex-1'>
          <Sidebar />
          <div className='flex-1 flex flex-col text-gray-100'>
            <ChatWindow className='flex-1' />
            <InputField />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
