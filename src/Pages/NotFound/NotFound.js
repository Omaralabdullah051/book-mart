import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    }
    return (
        <div className='bg-gray-800 m-10 rounded-2xl text-green-600 font-bold text-center p-10'>
            <img className='w-5/12 mx-auto' src="https://i.postimg.cc/CKp95RJc/notfound.png" alt="" />
            <h3>Page Not Found</h3>
            <h5 className='mt-2'>The page you are looking for might have been removed or name changed or temporarily unavailable</h5>
            <button onClick={handleNavigate} className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-4  hover:bg-green-400 hover:text-black'>Go To Home</button>
        </div>
    );
};

export default NotFound;