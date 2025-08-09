import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar, ChatWindow, InputField } from '@/components';

function Chat() {
  const { chatId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex bg-[#0F172A] overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      <div className="flex relative flex-col flex-1">
        {/* Mobile header with menu button */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-[#2a3145] bg-[#1a2131] lg:hidden">
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-400 hover:text-white hover:bg-[#2a3145] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-white">Aurora</h1>
            <div className="w-9"></div> {/* Spacer for centering */}
          </div>
        )}
        
        <ChatWindow chatId={chatId} />
        <InputField chatId={chatId} />
      </div>
    </div>
  );
}

export default Chat;
