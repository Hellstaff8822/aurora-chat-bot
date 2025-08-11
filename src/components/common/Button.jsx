import clsx from "clsx";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@features/authSlice';
import { signInWithGoogle } from '@lib/auth';
import GoogleLogo from '../../assets/icons/google.svg';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useToast } from '@/hooks/useToast';

const baseStyles = "flex items-center w-full p-2 text-sm font-medium rounded-md transition-colors cursor-pointer";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-gray-200",
  outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  secondary: "bg-[#1E293B] hover:bg-[#334155] text-gray-200 border border-blue-600",
  disabed: "bg-[#475569] text-gray-400 cursor-not-allowed",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function GoogleSignInButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { error, success } = useToast();

  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      
      if (result.success && result.user) {
        if (!result.user.email || !result.user.uid) {
          error('Помилка: недостатньо даних користувача');
          return;
        }
        
        dispatch(setUser({
          email: result.user.email,
          uid: result.user.uid,
          nickname: result.user.displayName || result.user.email,
          photoURL: result.user.photoURL,
        }));
        success('Успішний вхід через Google!');
        navigate('/');
      } else {
        error(`Помилка входу через Google: ${result.error}`);
      }
    } catch (error) {
      error('Сталася помилка при вході через Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      disabled={isLoading}
      className="flex justify-center items-center p-3 space-x-2 w-full text-gray-700 bg-white rounded-lg border border-gray-300 transition-colors google-button hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <ClipLoader size={16} color="#6B7280" />
      ) : (
        <img className="w-6 h-6" src={GoogleLogo} alt="Google" />
      )}
      <span>{isLoading ? 'Вхід...' : 'Увійти через Google'}</span>
    </button>
  );
}
