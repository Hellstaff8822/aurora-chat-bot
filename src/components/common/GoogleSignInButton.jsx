import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@features/authSlice';
import GoogleLogo from '../../assets/icons/google.svg';
import { signInWithGoogle } from '@lib/auth';
function GoogleSignInButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
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
      alert(`Помилка: ${result.error}`);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="flex gap-3 justify-center items-center px-4 py-2 w-full font-semibold text-gray-800 bg-white rounded-md transition hover:bg-gray-200"
    >
      <img className="w-6 h-6" src={GoogleLogo} alt="Google" />
      Увійти через Google
    </button>
  );
}
export default GoogleSignInButton;
