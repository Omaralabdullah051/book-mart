import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef('');
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <div className='text-green-600 font-bold mb-52'>
            <div className='w-[500px] mx-auto'>
                <form className='flex flex-col border-2 border-gray-700 mx-auto mt-24 rounded-lg'>
                    <h3 className='text-center mt-8 font-bold text-green-600'>Please login</h3>
                    <input ref={emailRef} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded mt-20' type="email" name="email" id="email" placeholder='Your Email' autoComplete='off' required />
                    <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="password" name="password" id="password" placeholder='Your password' autoComplete='off' required />
                    <p className='text-center'>Forget password? <button className='text-blue-400'>Reset password</button></p>
                    <p className='text-center mt-2'>Don't have an account? <Link className='text-blue-400 font-medium' to="/register">Please Register</Link></p>
                    <input className='w-[400px] mx-auto mb-8 px-8 py-2 bg-green-600 text-gray-300 rounded font-bold hover:bg-green-400 hover:text-black mt-3' type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
};

export default Login;