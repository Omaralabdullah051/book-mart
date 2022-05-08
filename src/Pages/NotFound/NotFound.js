import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle/PageTitle';

const NotFound = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    }
    return (
        <div className='bg-gray-800 m-4 md:m-10 rounded-2xl text-green-600 font-bold text-center p-4 md:p-10'>
            <PageTitle title="404" />
            <img className='w-full md:w-5/12 mx-auto' src="https://i.postimg.cc/CKp95RJc/notfound.png" alt="" />
            <h6 className='md:text-2xl lg:text-4xl'>Page Not Found</h6>
            <p className='text-gray-500 text-xs md:text-base lg:text-xl mt-2 md:mb-2'>The page you are looking for might have been removed or name changed or temporarily unavailable</p>
            <button onClick={handleNavigate} className='btn hover:btn-hover focus:btn-focus btn-sm btn-md xl:mb-0'>Go To Home</button>
        </div>
    );
};

export default NotFound;