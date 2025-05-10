import { useContext, useState } from 'react';
import { AutContext } from '../Providers/AuthProviders';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser } = useContext(AutContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    createUser(email, password)
      .then(() => {
        Swal.fire({
          title: "অভিনন্দন!",
          text: "আপনি সফলভাবে রেজিস্ট্রেশন সম্পন্ন করেছো। এখন লগইন করতে পারো।",
          icon: "success",
          confirmButtonText: "লগইন করবো",
          confirmButtonColor: "#3b82f6",
          background: "#f0f9ff",
          color: "#1e3a8a",
          showClass: {
            popup: "animate__animated animate__zoomIn"
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut"
          }
        })
        form.reset();
        setError('');
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
        <form onSubmit={handleRegister} className="card-body">
          <h1 className="text-2xl font-bold text-center">Register Now!</h1>
          <label className="label">Email</label>
          <input type="email" name="email" placeholder="Your email" className="input input-bordered" required />
          <label className="label">Password</label>
          <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center">
            <input type="checkbox" name="remember" id="remember" aria-label="Remember me" className="mr-1 rounded-sm focus:dark:ring-violet-600 focus:dark:border-violet-600 focus:ring-2 dark:accent-violet-600" />
            <label htmlFor="remember" className="text-sm dark:text-gray-600">Remember me</label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Register</button>
          </div>
          <p className="text-sm text-center dark:text-gray-600">If you have an account.
            <NavLink to='/login' className="text-blue-600 underline">Login here</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
