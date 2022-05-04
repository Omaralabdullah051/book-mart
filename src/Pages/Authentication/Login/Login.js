import React, { useEffect, useRef, useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [signInWithEmailAndPassword, user, loading, hookError,] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, error2] = useSendPasswordResetEmail(auth);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleOnSubmit = e => {
        e.preventDefault();
        const email = emailRef?.current?.value;
        const password = passwordRef?.current?.value;
        signInWithEmailAndPassword(email, password);
    };

    const handleResetPassword = async () => {
        const email = emailRef?.current?.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Email is sent to reset your password. Please check you mail inbox');
        }
        else {
            toast('Please provide your email');
        }
    }

    useEffect(() => {
        if (hookError) {
            switch (hookError?.code) {
                case "auth/invalid-email":
                    toast.error("Invalid email provided, please provide a valid email");
                    setError("Invalid email provided, please provide a valid email")
                    break;

                case "auth/user-not-found":
                    toast.error("User not found");
                    setError("User not found");
                    break;

                case "auth/wrong-password":
                    toast.error("Wrong password");
                    setError("Wrong password");
                    break;

                default:
                    toast.error(hookError?.message);
                    setError(hookError?.message);
            }
        }
    }, [hookError]);


    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (loading) {
        return (<div className='text-center mt-40 mb-96'>
            <svg role="status" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>)
    };


    return (
        <div className='text-green-600 font-bold mb-52'>
            <div className='w-[500px] mx-auto'>
                <form onSubmit={handleOnSubmit} className='flex flex-col border-2 border-gray-700 mx-auto mt-24 rounded-lg'>
                    <h3 className='text-center mt-8 font-bold text-green-600'>Please login</h3>
                    <input ref={emailRef} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded mt-20' type="email" name="userEmail" id="userEmail" placeholder='Your Email' autoComplete='off' required />
                    <input ref={passwordRef} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="password" name="password" id="password" placeholder='Your password' autoComplete='off' required />
                    <p className='text-center'>Forget password? <button onClick={handleResetPassword} className='text-blue-400'>Reset password</button></p>
                    <p className='text-center mt-2'>Don't have an account? <Link className='text-blue-400 font-medium' to="/register">Please Register</Link></p>
                    <p className='text-center mt-2 text-red-500'>{error}</p>
                    <input className='w-[400px] mx-auto mb-8 px-8 py-2 bg-green-600 text-gray-300 rounded font-bold hover:bg-green-400 hover:text-black mt-3' type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
};

export default Login;