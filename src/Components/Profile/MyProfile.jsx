import React, { useContext, useState } from 'react';
import { AutContext } from '../../Providers/AuthProviders';
import {  updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';

const MyProfile = () => {
    const { user,setUser } = useContext(AutContext);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user, {
                displayName,
                photoURL,
            });
            setUser({...user,displayName,photoURL})

            toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
        } catch (error) {
            console.error(error);
            toast.error('প্রোফাইল আপডেট ব্যর্থ হয়েছে');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-5 shadow rounded bg-base-100">
            <h2 className="text-2xl font-bold mb-4 text-center">📄 আমার প্রোফাইল</h2>

            <div className="text-center mb-6">
                {photoURL && (
                    <img
                        src={photoURL}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto mb-2 border"
                    />
                )}
                <p className="text-lg font-medium">📧 ইমেইল: {user?.email}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block mb-1">👤 নাম</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Photo URL</label>
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    🔄 প্রোফাইল আপডেট করুন
                </button>
            </form>
        </div>
    );
};

export default MyProfile;
