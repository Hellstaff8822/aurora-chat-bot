import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmail, signUpWithEmail } from '@lib/auth';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';  
import { setUser } from '@features/authSlice'; 
import { useNavigate } from 'react-router-dom';

function LoginForm({ isLoginMode, setIsLoginMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch(); 
  const navigete = useNavigate();

  useEffect(() => {
    setSuccessMessage('');
  }, [isLoginMode]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Неправильний формат email').required("Це поле є обов'язковим"),
      password: Yup.string().min(6, 'Пароль має бути не коротшим за 6 символів').required("Це поле є обов'язковим"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setSuccessMessage('');
      try {
        const authFunction = isLoginMode ? signInWithEmail : signUpWithEmail;
        const result = await authFunction(values.email, values.password);

        if (result.error) {
          alert(`Помилка: ${result.error}`);
        } else if (result.user) {
          if (isLoginMode) {
            dispatch(setUser({ email: result.user.email, uid: result.user.uid }));
            navigete('/'); 
          } else {
            setSuccessMessage('Акаунт успішно створено! Перемикаємо на вхід...');
            formik.resetForm();
            setTimeout(() => setIsLoginMode(true), 2000);
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
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          {...formik.getFieldProps('email')}
          className="w-full px-4 py-2 bg-slate-800/50 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          {...formik.getFieldProps('password')}
          className="w-full px-4 py-2 bg-slate-800/50 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
        ) : null}
      </div>

      {successMessage && (
        <div className="text-green-400 text-sm text-center p-2 bg-green-900/20 rounded-md">{successMessage}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-10 flex justify-center items-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:bg-gray-500"
      >
        {isLoading ? <ClipLoader color="#ffffff" size={20} /> : isLoginMode ? 'Увійти' : 'Зареєструватися'}
      </button>
    </form>
  );
}
export default LoginForm;
