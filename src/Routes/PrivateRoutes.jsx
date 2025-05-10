import React, { useContext } from 'react';
import { AutContext } from '../Providers/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user, loading}=useContext(AutContext)
    const location=useLocation()

    if(loading){
        return <div className='text-center mt-10'>Loading...</div>
    }
    if(user){
        return children;
    }
    return (
        <div>
            <Navigate to='/login' state={{from:location}} replace></Navigate>
        </div>
    );
};

export default PrivateRoutes;