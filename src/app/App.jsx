// src/App.jsx
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

function App() {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser({ email: user.email, uid: user.uid, name: user.displayName }));
        console.log('user.uid:', user.uid);

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
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Chat />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
