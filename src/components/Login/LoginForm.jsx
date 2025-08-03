import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmail, signUpWithEmail } from '@lib/auth';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUser } from '@features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

function LoginForm({ isLoginMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Користувача з такою поштою не знайдено';
      case 'auth/wrong-password':
        return 'Невірний пароль';
      case 'auth/invalid-email':
        return 'Неправильний формат email';
      case 'auth/weak-password':
        return 'Пароль занадто слабкий (мінімум 6 символів)';
      case 'auth/email-already-in-use':
        return 'Користувач з такою поштою вже існує';
      case 'auth/too-many-requests':
        return 'Забагато спроб. Спробуйте пізніше';
      default:
        return 'Сталася помилка. Спробуйте ще раз';
    }
  };

  const formik = useFormik({
    initialValues: {
      nickname: isLoginMode ? '' : '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Неправильний формат email').required("Це поле є обов'язковим"),
      password: Yup.string().min(6, 'Пароль має бути не коротшим за 6 символів').required("Це поле є обов'язковим"),
      nickname: Yup.string().min(3, 'Нікнейм має бути не коротшим за 3 символи').required("Це поле є обов'язковим"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setSuccessMessage('');
      setErrorMessage('');
      try {
        if (isLoginMode) {
          const result = await signInWithEmail(values.email, values.password);
          if (result.error) {
            const errorText = getErrorMessage(result.error);
            setErrorMessage(errorText);
          } else if (result.user) {
            dispatch(
              setUser({
                email: result.user.email,
                uid: result.user.uid,
                nickname: result.user.displayName || result.user.email, 
                photoURL: result.user.photoURL,
              })
            );
            navigate('/');
          }
        } else {
          const result = await signUpWithEmail(values.email, values.password, values.nickname);
          if (result.error) {
            const errorText = getErrorMessage(result.error);
            setErrorMessage(errorText);
          } else if (result.user) {
            dispatch(
              setUser({
                email: result.user.email,
                uid: result.user.uid,
                nickname: result.user.displayName || values.nickname,
                photoURL: result.user.photoURL,
              })
            );
            navigate('/');
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="Нікнейм"
          {...formik.getFieldProps('nickname')}
          className="px-4 py-2 w-full text-white rounded-md border bg-slate-800/50 border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.nickname && formik.errors.nickname ? (
          <div className="mt-1 text-sm text-red-500">{formik.errors.nickname}</div>
        ) : null}
      </div>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Електронна пошта"
          {...formik.getFieldProps('email')}
          className="px-4 py-2 w-full text-white rounded-md border bg-slate-800/50 border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          {...formik.getFieldProps('password')}
          className="px-4 py-2 pr-10 w-full text-white rounded-md border bg-slate-800/50 border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 text-gray-400 transition-colors transform -translate-y-1/2 hover:text-white"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
        {formik.touched.password && formik.errors.password ? (
          <div className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>

      {errorMessage && (
        <div className="p-3 text-sm text-center text-red-400 rounded-md border bg-red-900/20 border-red-500/30">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-2 text-sm text-center text-green-400 rounded-md bg-green-900/20">{successMessage}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white border-0 rounded-lg px-5 py-2.5 w-full font-semibold transition-all duration-300 cursor-pointer hover:from-purple-700 hover:to-indigo-800 hover:transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-12"
      >
        {isLoading ? (
          <>
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin me-3" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Завантаження...
          </>
        ) : (
          isLoginMode ? 'Увійти' : 'Зареєструватися'
        )}
      </button>
    </form>
  );
}
export default LoginForm;
