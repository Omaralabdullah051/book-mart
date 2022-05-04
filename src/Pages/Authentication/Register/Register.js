import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const nameRef = useRef('');
    useEffect(() => {
        nameRef.current.focus();
    }, []);
    const [agree, setAgree] = useState(false);

    return (
        <div className='text-green-600 font-bold mb-52'>
            <div className='w-[500px] mx-auto'>
                <form className='flex flex-col border-2 border-gray-700 mx-auto mt-24 rounded-lg'>
                    <h3 className='text-center mt-8 font-bold text-green-600'>Please Register</h3>
                    <input ref={nameRef} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded mt-20' type="text" name="name" id="name" placeholder='Your Name' autoComplete='off' required />
                    <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="email" name="email" id="email" placeholder='Your Email' autoComplete='off' required />
                    <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="password" name="password" id="password" placeholder='Your password' autoComplete='off' required />
                    <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password' autoComplete='off' required />
                    <p className='text-center mt-2'>Already have an account? <Link className='text-blue-400 font-medium' to="/login">Please Login</Link></p>
                    <div className='flex justify-center items-center mt-2'>
                        <input onClick={() => setAgree(!agree)} type="checkbox" name="checkbox" id="terms" className='bg-gray-700 mr-2' />
                        <label className={`${agree ? 'text-green-600' : 'text-red-500'}`} htmlFor="terms">Accept bookMart all terms and conditions</label>
                    </div>
                    <input disabled={!agree} title={!agree ? 'Accept bookMart all terms and conditions' : ''} className={`w-[400px] mx-auto mb-8 px-8 py-2 rounded font-bold mt-3 ${agree ? 'bg-green-600 text-gray-300 hover:bg-green-400 hover:text-black' : 'bg-green-900 text-gray-300'} `} type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;