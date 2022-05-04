import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';

const Register = () => {
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth, {
        sendEmailVerification: true
    });
    const [updateProfile] = useUpdateProfile(auth);
    const navigate = useNavigate();

    const nameRef = useRef('');

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        imgUrl: ''
    });

    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    });

    const handleNameInput = async e => {
        setUserInfo({ ...userInfo, name: e.target.event });
    };

    const handleEmailInput = e => {
        const validEmail = /^\S+@\S+\.\S+$/.test(e.target.value);
        if (validEmail) {
            setUserInfo({ ...userInfo, email: e.target.value });
            setErrors({ ...errors, emailError: '' });
        }
        else {
            setUserInfo({ ...userInfo, email: '' });
            setErrors({ ...errors, emailError: 'Please Provide a valid Email' });
        }
    };

    const handlePasswordInput = e => {
        const strongPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/.test(e.target.value);
        if (strongPassword) {
            setUserInfo({ ...userInfo, password: e.target.value });
            setErrors({ ...errors, passwordError: '' });
        }
        else {
            setUserInfo({ ...userInfo, password: '' });
            setErrors({ ...errors, passwordError: 'Your password must contain at least one digit, lowercase, special character and min 8 characters and max 20 characters' });
        }
    };

    const handleConfirmPasswordInput = e => {
        if (userInfo.password === e.target.value) {
            setUserInfo({ ...userInfo, confirmPassword: e.target.value });
            setErrors({ ...errors, confirmPasswordError: '' });
        }
        else {
            setUserInfo({ ...userInfo, confirmPassword: '' });
            setErrors({ ...errors, confirmPasswordError: "Your two passwords doesn't matched" });
        }
    };

    const handleImgUrl = e => {
        if (e.target.value) {
            setUserInfo({ ...userInfo, imgUrl: e.target.value });
        }
        else {
            setUserInfo({ ...userInfo, imgUrl: 'https://i.postimg.cc/mk6QDsQm/5945893.png' });
        }
    }

    const handleOnSubmit = async e => {
        e.preventDefault();
        if (userInfo.confirmPassword) {
            await createUserWithEmailAndPassword(userInfo.email, userInfo.password);
            await updateProfile({ displayName: userInfo.name, photoURL: userInfo.imgUrl });
        }
    };

    useEffect(() => {
        nameRef.current.focus();
    }, []);
    const [agree, setAgree] = useState(false);

    useEffect(() => {
        if (user) {
            if (!user?.user?.emailVerified) {
                toast.success('Your authentication process is almost done. You need to verify your email. You can verify your email at any time if neccessary');
            }
            else {
                toast.success('User created successfully');
            }
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
    }

    return (
        <div className='text-green-600 font-bold mb-52'>
            <div className='w-[500px] mx-auto'>
                <form onSubmit={handleOnSubmit} className='flex flex-col border-2 border-gray-700 mx-auto mt-24 rounded-lg'>
                    <h3 className='text-center mt-8 font-bold text-green-600'>Please Register</h3>
                    <input onChange={handleNameInput} ref={nameRef} className='w-[400px] mx-auto mb-6 bg-gray-700 text-green-400 font-bold rounded mt-20' type="text" name="userName" id="userName" placeholder='Your Name' autoComplete='off' required />
                    <input onChange={handleEmailInput} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="email" name="userEmail" id="userEmail" placeholder='Your Email' autoComplete='off' required />
                    <p className='text-center text-red-500 mb-3'>{errors?.emailError}</p>
                    <input onChange={handlePasswordInput} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="password" name="password" id="password" placeholder='Your password' autoComplete='off' required />
                    <p className='px-24 text-red-500 mb-3 text-justify'>{errors?.passwordError}</p>
                    <input onChange={handleConfirmPasswordInput} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password' autoComplete='off' required />
                    <p className='text-center text-red-500 mb-3'>{errors?.confirmPasswordError}</p>
                    <input onChange={handleImgUrl} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="imgUrl" id="imgUrl" placeholder='Your imgage url (optional)' autoComplete='off' />
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