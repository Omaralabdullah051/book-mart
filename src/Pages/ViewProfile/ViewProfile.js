import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const ViewProfile = () => {
    const [user] = useAuthState(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!user?.photoURL) {
            (async () => {
                await updateProfile({ photoURL: "https://i.postimg.cc/mk6QDsQm/5945893.png" });
            })();
        }
    }, [user, updateProfile]);

    return (
        <div className='bg-gray-800 m-10 rounded-2xl p-10'>
            <div>
                <img className='w-40 rounded-full ml-32' src={user?.photoURL} alt="" />
            </div>
            <div className='text-green-600 font-bold pl-32 mt-2 pr-32'>
                <h3><i>{user?.displayName}</i></h3>
                <h3><i>{user?.email}</i></h3>
                <p className='mt-4 text-justify'>{`Hey ${user?.displayName}! Hope you are doing great. Here you will find more other features. You can also find detailed and accurate information about the financial condition and performance in the last few years. It also allows you to know how much executives get paid and their lasts statements on conference calls. It also enables you to view financial statements that go back to five time periods.`}</p>
                <button className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-2  hover:bg-green-400 hover:text-black'>Info</button>
                <button onClick={() => signOut(auth)} className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-2  hover:bg-green-400 hover:text-black ml-8'>Sign Out</button>
            </div>
        </div>
    );
};

export default ViewProfile;