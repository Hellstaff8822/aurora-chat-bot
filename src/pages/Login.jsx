import { useState } from 'react';
import  LoginForm  from '@/components/Login/LoginForm';
import  GoogleSignInButton  from '@common/GoogleSignInButton';
import SpotlightCard from '@/components/common/SpotlightCard';
import logoAurora from '../assets/aurora128_enhanced.png';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div className="flex items-center justify-center h-screen bg-[#0F172A]">
      <SpotlightCard className="w-full max-w-sm bg-[#1E293B]/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
        <div className="p-8 space-y-8">
          <div className="text-center">
            <h2 className="flex gap-5 justify-center items-center text-2xl font-bold text-white">
              {isLoginMode ? 'Вхід в Aurora' : 'Створення акаунту'}
              <img className="w-12" src={logoAurora} alt="logo" />
            </h2>
            <p className="mt-2 text-sm text-gray-400">Продовжуйте спілкування з AI</p>
          </div>
          <LoginForm isLoginMode={isLoginMode} />
          
          <div className="relative">
            <div className="flex absolute inset-0 items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="flex relative justify-center text-sm">
              <span className="px-2 text-slate-400">АБО</span>
            </div>
          </div>
          
          <GoogleSignInButton />

          <div className="text-sm text-center text-gray-400">
            {isLoginMode ? 'Немає акаунту?' : 'Вже є акаунт?'}
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)} 
              className="ml-2 text-purple-400 border border-purple-400 hover:bg-purple-400 hover:text-white font-medium rounded-lg text-sm px-3 py-1.5 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
            >
              {isLoginMode ? 'Зареєструватися' : 'Увійти'}
            </button>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default Login;