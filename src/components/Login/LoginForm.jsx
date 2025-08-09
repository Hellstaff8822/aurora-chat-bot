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
      case 'auth/invalid-credential':
        return 'Невірний email або пароль';
      default:
        return errorCode || 'Сталася помилка. Спробуйте ще раз';
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

      <div>
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
        </div>
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
        className="primary-button"
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#ffffff" size={20} className="mr-3" />
            <span>Завантаження...</span>
          </div>
        ) : (
          isLoginMode ? 'Увійти' : 'Зареєструватися'
        )}
      </button>
    </form>
  );
}
export default LoginForm;
