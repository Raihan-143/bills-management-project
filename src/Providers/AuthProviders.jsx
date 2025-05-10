import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const AutContext=createContext(null) 
const googleProvider=new GoogleAuthProvider()
const AuthProviders = ({children}) => {
    const [user, setUser]=useState(null);
    const [loadind, setLoading]=useState(true)
    
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleLogin=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const logout=()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubcribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>unsubcribe()
    },[])

    const handleForgetPassword=(email)=>{

        sendPasswordResetEmail(auth,email)
        .then(() => {
            alert('Password reset email sent!')
        })
    }

    const authInfo={
        user,
        loadind,
        createUser,
        signIn,
        googleLogin,
        logout,
        handleForgetPassword,
        setUser
    }
    return (
        <AutContext.Provider value={authInfo}>
            {children}
        </AutContext.Provider>
    );
};

export default AuthProviders;