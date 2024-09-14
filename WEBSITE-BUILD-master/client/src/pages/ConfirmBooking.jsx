import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/state";
import { isTokenExpired } from "../utility/CheckToken";

export const ConfirmBooking = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const model = useSelector((state) => state.modelType);
  const { id } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const location = useLocation();

  // Extract status from query parameters
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  
//console.log("For confirming \nid", id, "\nstatus", status, "\nToken :", token);
  useEffect(() => {
    if (token && isTokenExpired(token)) {
        console.log("Token expired");
        dispatch(setLogin({
            user: null,
            token: null,
            modelType: null
        }));
        console.log('Session expired. Please log in again.');
        model==="host" ? navigate('/host_login') : navigate('/login');
        return;
    }else if(!token){
        console.log('Session expired. Please log in again.');
                navigate('/host_login');
                return;
    }
  }, [token, dispatch,model, navigate]);


  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/listings/update-status/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });

        if (response.ok) {
          navigate('/dashboard'); // Redirect to login or another page after successful verification
        } else {
          navigate('/dashboard'); // Redirect to an error page if verification fails
        }
      } catch (err) {
        console.error('Verification failed:', err);
        alert('An error occurred during verification.');
        navigate('/'); // Redirect to an error page if something goes wrong
      }
    };

    verifyEmail(); // Call the verification function when the component mounts
  }, [ navigate,  id, status, token]); // The effect runs when `token` or `navigate` changes (initially when the component mounts)

  return <div>Verifying booking...</div>; // Show a loading message while verifying
};

