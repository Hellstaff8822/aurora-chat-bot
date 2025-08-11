import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setUser, clearUser } from '@/features/slices/authSlice';
import { fetchThreads } from '@/features/slices/threadsSlice';
import { Chat, Login } from '@/pages';
import { ProtectedRoute } from '@/components';
import ToastContainer from '@/components/common/ToastContainer';
import logoAurora from '@/assets/aurora128_enhanced.png';
import { useToast } from '@/hooks/useToast';

function App() {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
            nickname: user.displayName || user.email,
            photoURL: user.photoURL,
          }),
        );
        await dispatch(fetchThreads(user.uid));
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
        <div className="flex flex-col items-center text-center">
          <img
            src={logoAurora}
            alt="Aurora logo"
            className="object-contain w-16 h-auto animate-spin md:w-20"
            style={{ animationDuration: '1.2s' }}
          />
          <span className="mt-4 text-lg text-gray-300">Ініціалізація</span>
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
