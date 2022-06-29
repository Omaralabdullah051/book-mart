import React from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import LoadingState from "../LoadingState/LoadingState";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);
  const location = useLocation();

  const handleResendMessage = async () => {
    await sendEmailVerification();
    toast(
      "Email verification message sent again. Please check your mail inbox and verify your email"
    );
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    user?.providerData[0]?.providerId === "password" &&
    !user?.emailVerified
  ) {
    return (
      <div className="text-green-600 text-center mt-20 mb-80 space-y-3 font-bold">
        <h6 className="md:text-2xl lg:text-4xl">
          Your email is not verified yet
        </h6>
        <p className="text-sm md:text-base lg:text-2xl text-gray-500">
          Please check your mail inbox and Verify your email to proceed this
          page
        </p>
        <p className="text-xs md:text-sm lg:text-xl text-gray-500">
          If you don't find the email verification message, click the button to
          resend the verification message
        </p>
        <button
          onClick={handleResendMessage}
          className="btn hover:btn-hover focus:btn-focus btn-sm btn-md xl:mb-0"
        >
          Resend Verficiation Message
        </button>
      </div>
    );
  }
  return children;
};

export default RequireAuth;
