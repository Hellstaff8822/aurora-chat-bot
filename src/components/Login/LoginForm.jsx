
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Неправильний формат email').required("Це поле є обов'язковим"),
      password: Yup.string().min(6, 'Пароль має бути не коротшим за 6 символів').required("Це поле є обов'язковим"),
    }),
    onSubmit: (values) => {
      console.log('Дані форми для входу:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <input
          id="email"
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
          type="password"
          placeholder="Пароль"
          {...formik.getFieldProps('password')}
          className="w-full px-4 py-2 bg-slate-800/50 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Увійти
      </button>
    </form>
  );
}
export default LoginForm;