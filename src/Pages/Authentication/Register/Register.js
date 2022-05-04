import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';
import LoadingState from '../../Shared/LoadingState/LoadingState';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const [createUserWithEmailAndPassword, user, loading, hookError,] = useCreateUserWithEmailAndPassword(auth, {
        sendEmailVerification: true
    });
    const [updateProfile] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const [error, setError] = useState('');

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

    const handleNameInput = e => {
        setUserInfo({ ...userInfo, name: e.target.value });
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
        setUserInfo({ ...userInfo, imgUrl: e.target.value });
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
        if (hookError) {
            switch (hookError?.code) {
                case "auth/invalid-email":
                    toast.error("Invalid email provided, please provide a valid email");
                    setError("Invalid email provided, please provide a valid email");
                    setAgree(!agree);
                    break;

                case "auth/email-already-in-use":
                    toast.error("This email is already in used");
                    setError("This email is already in used");
                    setAgree(!agree);
                    break;

                case "auth/email-already-exists":
                    toast.error("Email already exists");
                    setError("Email already exists");
                    setAgree(!agree);
                    break;

                case "auth/invalid-credential":
                    toast.error("Doesn't allow creation of multiple account with the same email");
                    setError("Doesn't allow creation of multiple account with the same email");
                    setAgree(!agree);
                    break;

                default:
                    toast.error(hookError?.message);
                    setError(hookError?.message);
            }
        }
    }, [hookError, agree]);

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
        return <LoadingState />
    }

    return (
        <div className='text-green-600 font-bold mb-52'>
            <div className='w-[500px] mx-auto'>
                <form onSubmit={handleOnSubmit} className='flex flex-col border-2 border-gray-700 mx-auto mt-12 rounded-lg'>
                    <h3 className='text-center mt-8 font-bold text-green-600'>Please Register</h3>
                    <input onChange={handleNameInput} ref={nameRef} className='w-[400px] mx-auto mb-6 bg-gray-700 text-green-400 font-bold rounded mt-12' type="text" name="userName" id="userName" placeholder='Your Name' autoComplete='off' required />
                    <input onChange={handleEmailInput} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="email" name="userEmail" id="userEmail" placeholder='Your Email' autoComplete='off' required />
                    <p className='text-center text-red-500 mb-3'>{errors?.emailError}</p>
                    <input onChange={handlePasswordInput} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="password" name="password" id="password" placeholder='Your password' autoComplete='off' required />
                    <p className='px-24 text-red-500 mb-3 text-justify'>{errors?.passwordError}</p>
                    <input onChange={handleConfirmPasswordInput} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password' autoComplete='off' required />
                    <p className='text-center text-red-500 mb-3'>{errors?.confirmPasswordError}</p>
                    <input onChange={handleImgUrl} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="imgUrl" id="imgUrl" placeholder='Your image url (optional)' autoComplete='off' />
                    <p className='text-center mt-2'>Already have an account? <Link className='text-blue-400 font-medium' to="/login">Please Login</Link></p>
                    <div className='flex justify-center items-center mt-2'>
                        <input onClick={() => setAgree(!agree)} type="checkbox" name="checkbox" id="terms" className='bg-gray-700 mr-2' />
                        <label className={`${agree ? 'text-green-600' : 'text-red-500'}`} htmlFor="terms">Accept bookMart all terms and conditions</label>
                    </div>
                    <p className='text-center mt-2 text-red-500'>{error}</p>
                    <input disabled={!agree} title={!agree ? 'Accept bookMart all terms and conditions' : ''} className={`w-[400px] mx-auto mb-3 px-8 py-2 rounded font-bold mt-3 ${agree ? 'bg-green-600 text-gray-300 hover:bg-green-400 hover:text-black' : 'bg-green-900 text-gray-300'} `} type="submit" value="Register" />
                    <SocialLogin />
                </form>
            </div>
        </div>
    );
};

export default Register;