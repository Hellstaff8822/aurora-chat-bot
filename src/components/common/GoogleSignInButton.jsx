import GoogleLogo from '../../assets/icons/google.svg';
function GoogleSignInButton() {
  const handleGoogleSignIn = () => {
    console.log('Натиснуто вхід через Google');
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
