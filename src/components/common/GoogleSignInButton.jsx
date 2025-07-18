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
      dispatch(setUser({ email: result.user.email, uid: result.user.uid, name: result.user.displayName }));
      navigate('/');
    } else if (result.error) {
      alert(`Помилка: ${result.error}`);
    }
  };


  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-200 transition"
    >
      <img className="w-6 h-6" src={GoogleLogo} alt="Google" />
      Увійти через Google
    </button>
  );
}
export default GoogleSignInButton;
