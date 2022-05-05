import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import LoadingState from '../LoadingState/LoadingState';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const location = useLocation();

    const handleResendMessage = async () => {
        await sendEmailVerification();
        toast('Email verification message sent again. Please check your mail inbox and verify your email');
    }


    if (loading) {
        return <LoadingState />
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user?.providerData[0]?.providerId === 'password' && !user?.emailVerified) {
        return (<div className='text-green-600 text-center mt-20 mb-80 space-y-3 font-bold'>
            <h3>Your email is not verified yet</h3>
            <h4>Please check your mail inbox and Verify your email to proceed this page</h4>
            <h5>If you don't find the email verification message, click the button to resend the verification message</h5>
            <button onClick={handleResendMessage} className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-2  hover:bg-green-400 hover:text-black'>Resend Verficiation Message</button>
        </div>)
    }
    return children;
}

export default RequireAuth;