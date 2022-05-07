import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import PageTitle from '../Shared/PageTitle/PageTitle';

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


    const handleNavigate = () => {
        navigate('/info');
    }

    return (
        <div className='bg-gray-800 m-5 md:m-10 rounded-2xl p-4 md:p-10'>
            <PageTitle title="View Profile" />
            <div>
                <img className='w-40 mx-auto md:mx-0 rounded-full md:ml-20 xl:ml-32' src={user?.photoURL} alt="" />
            </div>
            <div className='text-green-600 mt-4 font-bold md:pl-20 xl:pl-32 md:mt-2 xl:pr-32'>
                <h5><i>{user?.displayName}</i></h5>
                <p><i>{user?.email}</i></p>
                <p className='text-xs md:text-base text-gray-500 mt-4 text-justify'>{`Hey ${user?.displayName}! Hope you are doing great. Here you will find more other features. You can also find detailed and accurate information about the financial condition and performance in the last few years. It also allows you to know how much executives get paid and their lasts statements on conference calls. It also enables you to view financial statements that go back to five time periods.`}</p>
                <button onClick={handleNavigate} className='px-3 py-1 md:px-8 md:py-2 text-xs md:text-base bg-green-600 text-gray-300 rounded font-bold mt-2  hover:bg-green-400 hover:text-black focus:ring-4 focus:ring-offset-slate-800'>Info</button>
                <button onClick={() => signOut(auth)} className='px-3 py-1 md:px-8 md:py-2 text-xs md:text-base bg-green-600 text-gray-300 rounded font-bold mt-2  hover:bg-green-400 hover:text-black ml-4 md:ml-8 focus:ring-4 focus:ring-offset-slate-800'>Sign Out</button>
            </div>
        </div>
    );
};

export default ViewProfile;