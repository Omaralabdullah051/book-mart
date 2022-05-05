import React, { useEffect } from 'react';
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import LoadingState from '../../Shared/LoadingState/LoadingState';

const SocialLogin = () => {
    const [signInWithGoogle, googleUser, loading, googleError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, facebookUser, loading2, facebookError] = useSignInWithFacebook(auth);
    const [signInWithGithub, githubUser, loading3, githubError] = useSignInWithGithub(auth);

    const location = useLocation();
    const navigate = useNavigate();

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const hookError = googleError || facebookError || githubError
        if (hookError) {
            switch (hookError?.code) {
                case "auth/account-exists-with-different-credential":
                    toast.error("Doesn't allow to log in with same email that exists with different credential");
                    break;

                case "auth/popup-closed-by-user":
                    toast.error("popup closed. Please Don't close the popup");
                    break;

                default:
                    toast.error(hookError?.message);
            }
        }
    }, [googleError, facebookError, githubError]);

    useEffect(() => {
        if (googleUser || facebookUser || githubUser) {
            if (googleUser) {
                toast.success("Successfully loged in with google", {
                    toastId: 'success1'
                });
            }
            if (facebookUser) {
                toast.success("Successfully loged in with facebook", {
                    toastId: 'success2'
                });
            }
            if (githubUser) {
                toast.success("Successfully loged in with github", {
                    toastId: 'success3'
                });
            }
            navigate(from, { replace: true });
        }
    }, [googleUser, navigate, from, facebookUser, githubUser]);

    if (loading || loading2 || loading3) {
        return <LoadingState />
    };

    return (
        <div className='mb-8'>
            <div className='flex justify-center items-center mb-3'>
                <div className='w-44 h-1 bg-green-600'></div>
                <div className='mx-3'>OR</div>
                <div className='w-44 h-1 bg-green-600'></div>
            </div>
            <div className='flex justify-center items-center'>
                <div onClick={() => signInWithGoogle()} className='flex justify-center items-center bg-green-600 text-black mb-3 mr-2 p-1 rounded cursor-pointer hover:bg-green-900 hover:text-gray-400'>
                    <img className='w-12' src="https://i.postimg.cc/BbW09c5Y/google.png" alt="" />
                    <h6>Google</h6>
                </div>
                <div onClick={() => signInWithFacebook()} className='flex justify-center items-center bg-green-600 text-black mb-3 mr-2 p-1 rounded cursor-pointer hover:bg-green-900 hover:text-gray-400'>
                    <img className='w-11' src="https://i.postimg.cc/DwcyrDQ2/facebook.png" alt="" />
                    <h6>Facebook</h6>
                </div>
                <div onClick={() => signInWithGithub()} className='flex justify-center items-center bg-green-600 text-black mb-3 p-1 rounded cursor-pointer hover:bg-green-900 hover:text-gray-400'>
                    <img className='w-10 mr-1' src="https://i.postimg.cc/XJBbzD5B/github-2.png" alt="" />
                    <h6>Github</h6>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;