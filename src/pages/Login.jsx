import { useState } from 'react';
import LoginForm from '@/components/Login/LoginForm';
import { GoogleSignInButton } from '@/components/common/Button';
import SpotlightCard from '@/components/common/SpotlightCard';
import { Aurora } from '@/components';
import logoAurora from '../assets/aurora128_enhanced.png';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0F172A] p-4">
      <div className="absolute inset-0 w-full h-full">
        <Aurora colorStops={['#8B5CF6', '#A855F7', '#C084FC']} amplitude={1.0} blend={0.5} speed={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <SpotlightCard className="w-full bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 shadow-2xl">
          <div className="p-6 space-y-6 md:p-10 md:space-y-8">
            <div className="text-center">
              <h2 className="flex gap-3 justify-center items-center text-2xl font-bold text-white md:gap-5 md:text-3xl">
                {isLoginMode ? 'Вхід в Aurora' : 'Створення акаунту'}
                <img className="w-10 md:w-14" src={logoAurora} alt="logo" />
              </h2>
              <p className="mt-3 text-base text-gray-300">Продовжуйте спілкування з AI</p>
            </div>
            <LoginForm isLoginMode={isLoginMode} />

            <div className="flex items-center">
              <div className="flex-1 border-t border-slate-600"></div>
              <span className="px-3 text-sm text-slate-400">АБО</span>
              <div className="flex-1 border-t border-slate-600"></div>
            </div>

            <GoogleSignInButton />

            <div className="text-sm text-center text-gray-300">
              {isLoginMode ? 'Немає акаунту?' : 'Вже є акаунт?'}
              <button
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="ml-2 text-purple-400 border border-purple-400 hover:bg-purple-400 hover:text-white font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
              >
                {isLoginMode ? 'Зареєструватися' : 'Увійти'}
              </button>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

export default Login;
