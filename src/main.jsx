// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import AuthProviders from './Providers/AuthProviders.jsx';
import WalletProvider from './Providers/WalletProvider.jsx'; // ✅ Import here
import router from './Routes/router.jsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <WalletProvider> {/* ✅ Wrap your app here */}
        <RouterProvider router={router} />
      </WalletProvider>
    </AuthProviders>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
  </React.StrictMode>
);
