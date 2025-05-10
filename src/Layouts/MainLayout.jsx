import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (<>
        <div>
            <Navbar></Navbar>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        </>
    );
};

export default MainLayout;