import clsx from "clsx";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@features/authSlice';
import { signInWithGoogle } from '@lib/auth';
import GoogleLogo from '../../assets/icons/google.svg';

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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.user) {
        dispatch(
          setUser({
            email: result.user.email,
            uid: result.user.uid,
            nickname: result.user.displayName || result.user.email,
            photoURL: result.user.photoURL,
          }),
        );
        navigate('/');
      } else if (result.error) {
        console.error('Помилка Google входу:', result.error);
        alert(`Помилка входу через Google: ${result.error}`);
      }
    } catch (error) {
      console.error('Помилка Google входу:', error);
      alert('Сталася помилка при вході через Google');
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="google-button"
    >
      <img className="w-6 h-6" src={GoogleLogo} alt="Google" />
      Увійти через Google
    </button>
  );
}
