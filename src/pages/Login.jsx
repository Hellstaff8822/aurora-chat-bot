import { useState } from 'react';
import  LoginForm  from '@/components/Login/LoginForm';
import  GoogleSignInButton  from '@common/GoogleSignInButton';
import logoAurora from '../assets/aurora128_enhanced.png';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div className="flex items-center justify-center h-screen bg-[#0F172A]">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[#1E293B]/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-5">
            {isLoginMode ? 'Вхід в Aurora' : 'Створення акаунту'}
            <img className="w-12" src={logoAurora} alt="logo" />
          </h2>
          <p className="mt-2 text-sm text-gray-400">Продовжуйте спілкування з AI</p>
        </div>
        <GoogleSignInButton />
        <div className="relative">
        </div>
        
        <LoginForm isLoginMode={isLoginMode} setIsLoginMode={setIsLoginMode} />

        <div className="text-center text-sm text-gray-400">
          {isLoginMode ? 'Немає акаунту?' : 'Вже є акаунт?'}
          <button 
            onClick={() => setIsLoginMode(!isLoginMode)} 
            className="font-semibold text-blue-400 hover:text-blue-300 ml-2"
          >
            {isLoginMode ? 'Зареєструватися' : 'Увійти'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;