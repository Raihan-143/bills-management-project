import { useContext, useState } from 'react';
import { AutContext } from '../Providers/AuthProviders';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Login = () => {
  const { signIn, googleLogin, handleForgetPassword } = useContext(AutContext);
  const [forgetEmail, setForgetEmail] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        Swal.fire({
          title: "অভিনন্দন!",
          text: "আপনি সফলভাবে লগইন করেছেন।",
          icon: "success",
          confirmButtonText: "ঠিক আছে",
          confirmButtonColor: "#16a34a",
          background: "#f0fff4",
          color: "#065f46"
        });


        setError('');
        form.reset();
        navigate('/');
      })
      .catch((err) => {
        Swal.fire({
          title: "ত্রুটি!",
          text: "আপনার প্রদত্ত তথ্য সঠিক নয়।",
          icon: "error",
          confirmButtonText: "আবার চেষ্টা করুন",
          confirmButtonColor: "#dc2626",
          background: "#fff5f5",
          color: "#7f1d1d"
        });
        setError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          title: "Google দিয়ে সাইন ইন",
          text: "আপনি কি নিশ্চিতভাবে Google অ্যাকাউন্ট দিয়ে সাইন ইন করতে চান?",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "হ্যাঁ, Google দিয়ে সাইন ইন করো",
          cancelButtonText: "না, ফিরে যাও",
          confirmButtonColor: "#4285F4", 
          cancelButtonColor: "#9ca3af",
          background: "#f0f9ff",
          color: "#1e3a8a"
        })
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
          <p className="text-sm text-center dark:text-gray-600">Dont have account?
            <NavLink to='/register' className="text-blue-600 underline">Register here</NavLink>
          </p>
          <input type="email" name="email"
            onChange={(e) => setForgetEmail(e.target.value)}
            placeholder="Email" className="input input-bordered" required />
          <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Login</button>
          </div>
          <button onClick={() => handleForgetPassword(forgetEmail)} className='cursor-pointer'>Forget Password?</button>
          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-600" />
            <p className="px-3 dark:text-gray-600">OR</p>
            <hr className="w-full dark:text-gray-600" />
          </div>
          <button type="button" onClick={handleGoogleLogin} className="btn btn-outline mt-3 flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
