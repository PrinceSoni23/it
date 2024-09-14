import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header2 from '../components/Header2';
import GFooter from '../components/GFOOTER';

export const ChangeForgotPassword = () => {
  const dispatch = useDispatch();
  const { otpToken } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const location = useLocation();

  // State for password input
  const [password, setPassword] = useState("");

  // Extract role from query parameters
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");
  console.log("role", role, "\notpToken",otpToken);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Call the OTP verification API with the password from the form
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/verify-otp-and-change-password/${otpToken}?role=${role}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }), // Send the password
        }
      );

      if (response.ok) {
        // If successful, navigate to the dashboard
        toast.success("Password changed successfully.");
        navigate("/dashboard");
      } else {
        // Handle error by redirecting or showing a message
        toast.warn("Password change failed. Please try again.");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Verification failed:", err);
      toast.error("An error occurred during verification.");
      navigate("/");
    }
  };

  return (
    <>
      <Header2 />
      <div className='h-screen w-full bg-slate-200 flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start py-8 px-14 shadow-lg gap-6 bg-white/85 h-72">
          <h1 className="text-center text-2xl font-semibold">Change Password</h1>
          {/* <div className="h-4 w-28 bg-slate-700 -mt-2 text-[1px] text-slate-700 rounded"> . </div> */}
  
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className='py-2 px-4 text-sm border border-gray-300 focus:outline-none focus:border-slate-700'
              required
            />
          </div>
  
          <button type="submit" className='bg-slate-700 hover:bg-slate-800 hover:shadow-md px-6 py-2 text-white'>Change Password</button>
        </form>
      </div>
      <GFooter />
    </>
  );
  
};
