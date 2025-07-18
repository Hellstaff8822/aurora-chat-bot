import  LoginForm  from '@/components/Login/LoginForm';
import  GoogleSignInButton  from '@common/GoogleSignInButton';

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0F172A]">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[#1E293B]/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Вхід в Aurora</h2>
          <p className="mt-2 text-sm text-gray-400">Продовжуйте спілкування з AI</p>
        </div>
        <GoogleSignInButton />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1E293B] text-gray-400">або</span>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
