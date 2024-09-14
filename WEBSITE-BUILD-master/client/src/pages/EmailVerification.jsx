import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const EmailVerification = () => {
  const { verificationToken } = useParams(); // Extract the token from the URL
  const navigate = useNavigate(); // Hook to programmatically navigate
  const location = useLocation(); // Hook to access the current location

  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');

  console.log("role", role);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/verify-email/${verificationToken}?role=${role}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response?.ok) {

          navigate('/dashboard', {state : {role}}); // Redirect to login or another page after successful verification
        } else {
          toast.error("Email verification failed.");
          navigate('/dashboard', {state : {role}}); // Redirect to an error page if verification fails
        }
      } catch (err) {
        console.error('Verification failed:', err);
        toast.error('An error occurred during verification.');
        navigate('/'); // Redirect to an error page if something goes wrong
      }
    };

    verifyEmail(); // Call the verification function when the component mounts
  }, [verificationToken, navigate, role]); // The effect runs when `token` or `navigate` changes (initially when the component mounts)

  return <div className="h-screen w-screen flex justify-center items-center text-2xl font-extrabold ">Verifying your email...</div>; // Show a loading message while verifying
};

