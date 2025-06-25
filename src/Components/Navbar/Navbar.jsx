import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AutContext } from '../../Providers/AuthProviders';
import { WalletContext } from '../../Providers/WalletProvider';

const Navbar = () => {
  const { user, logout } = useContext(AutContext);
  const { balance } = useContext(WalletContext);

  const handleLogout = () => {
    logout().then(() => { }).catch(err => console.error(err));
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className="hover:text-violet-600 font-medium">হোম</NavLink></li>
      <li><NavLink to="/bills" className="hover:text-violet-600 font-medium">বিল পরিশোধ</NavLink></li>
      {user && <li><NavLink to="/profile" className="hover:text-violet-600 font-medium">আমার প্রোফাইল</NavLink></li>}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">


          <div className="flex items-center gap-4">

            <div className='flex items-center gap-2'>
              <img src="/bill_62.png" alt="" className='w-[50px]' />
              <NavLink to="/" className="text-2xl font-extrabold text-violet-600">PayBills</NavLink>
            </div>


            <div className="dropdown lg:hidden">
              <button tabIndex={0} className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2 mt-3 w-52 z-[1]">
                {navLinks}
              </ul>
            </div>
          </div>


          <div className="hidden lg:flex items-center">
            <ul className="menu menu-horizontal gap-4 text-gray-700 dark:text-gray-200">
              {navLinks}
            </ul>
          </div>


          <div className="flex items-center gap-4">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-violet-500 ring-offset-base-100 ring-offset-2">
                    <img alt="User" src={`${user.photoURL}?v=${new Date().getTime()}`} />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-3 space-y-2 shadow menu menu-sm dropdown-content bg-white dark:bg-gray-900 rounded-lg w-52 text-sm">
                  <li><span className="font-medium text-gray-700 dark:text-gray-300">বর্তমান ব্যালান্স: <span className="text-green-600">৳{balance.toFixed(2)}</span></span></li>
                  <li><button onClick={handleLogout} className="text-red-500 font-semibold hover:underline">লগআউট করুন</button></li>
                </ul>
              </div>
            ) : (
              <>
                <NavLink to="/register" className="btn btn-outline btn-sm text-violet-600 hover:text-white border-violet-600 hover:bg-violet-600">নিবন্ধন</NavLink>
                <NavLink to="/login" className="btn btn-outline btn-sm text-violet-600 hover:text-white border-violet-600 hover:bg-violet-600">লগইন</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
