// src/hooks/useActiveThread.js
import { useSelector } from 'react-redux';


export const useActiveThread = () => {
  const activeThreadId = useSelector((state) => state.threads.activeThreadId);
  return activeThreadId;
};