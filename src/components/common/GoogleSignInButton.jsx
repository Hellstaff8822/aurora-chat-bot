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
      className="py-2.5 px-5 w-full text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex gap-3 justify-center items-center h-12"
    >
      <img className="w-6 h-6" src={GoogleLogo} alt="Google" />
      Увійти через Google
    </button>
  );
}
export default GoogleSignInButton;
