import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@lib/firebase';
import { setUser, clearUser } from '@features/authSlice';
import { fetchThreads } from '@/features/slices/threadsSlice';
import { fetchMessagesForThread } from '@/features/slices/chatSlice';

import { Chat, Login } from '@/pages';
import { ProtectedRoute } from '@/components';
import { useToast } from '@/hooks/useToast';
import ToastContainer from '@/components/common/ToastContainer';

function App() {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser({ email: user.email, uid: user.uid, nickname: user.displayName || user.email, photoURL: user.photoURL }));

        const resultAction = await dispatch(fetchThreads(user.uid));

        if (fetchThreads.fulfilled.match(resultAction) && resultAction.payload.length > 0) {
          const firstThreadId = resultAction.payload[0].id;
          dispatch(fetchMessagesForThread(firstThreadId));
        }
      } else {
        dispatch(clearUser());
      }
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1a2131] to-[#0f172a]">
        <div className="text-center">
          <h1 className="mb-8 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 animate-pulse">
            Aurora
          </h1>
          
          <div className="flex justify-center items-center space-x-2">
            <span className="text-lg text-gray-300">Ініціалізація</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Chat />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Router>
  );
}
export default App;
