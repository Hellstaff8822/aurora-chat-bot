import { useState } from 'react';
import  LoginForm  from '@/components/Login/LoginForm';
import  { GoogleSignInButton }  from '@/components/common/Button';
import SpotlightCard from '@/components/common/SpotlightCard';
import logoAurora from '../assets/aurora128_enhanced.png';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A] p-4">
      <SpotlightCard className="w-full max-w-sm bg-[#1E293B]/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
        <div className="p-4 space-y-6 md:p-8 md:space-y-8">
          <div className="text-center">
            <h2 className="flex gap-3 justify-center items-center text-xl font-bold text-white md:gap-5 md:text-2xl">
              {isLoginMode ? 'Вхід в Aurora' : 'Створення акаунту'}
              <img className="w-8 md:w-12" src={logoAurora} alt="logo" />
            </h2>
            <p className="mt-2 text-sm text-gray-400">Продовжуйте спілкування з AI</p>
          </div>
          <LoginForm isLoginMode={isLoginMode} />
          
          <div className="flex items-center">
            <div className="flex-1 border-t border-slate-600"></div>
            <span className="px-2 text-sm text-slate-400">АБО</span>
            <div className="flex-1 border-t border-slate-600"></div>
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