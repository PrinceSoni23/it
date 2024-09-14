import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header2 from '../components/Header2';
import GFooter from '../components/GFOOTER';

export const GetOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const pathname = useLocation().pathname;
  const model = pathname === "/host-get-otp" ? "host" : "user";
  console.log("model", model);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/send-password-change-mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, role: model }), 
        }
      );

      if (response.ok) {
        toast.success("Password Change link sent successfully. Please check your mail for further instructions.");
        model === "host" ? navigate("/host_login") : navigate("/login");
      } else {
        toast.warn("Password change failed. Please try again.");
        model === "host" ? navigate("/host_login") : navigate("/login");
      }
    } catch (err) {
      console.error("Verification failed:", err);
      toast.error("An error occurred during verification.");
      model === "host" ? navigate("/host_login") : navigate("/login");
    }
  };

  return (
    <>
      <Header2 />
      <div className='h-screen w-full bg-slate-200 flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start py-8 px-14 shadow-lg gap-6 bg-white/85 h-72">
          <h1 className="text-center text-2xl font-semibold">Provide your account email</h1>
          {/* <div className="h-4 w-28 bg-slate-700 -mt-2 text-[1px] text-slate-700 rounded"> . </div> */}
  
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className='py-2 px-4 text-sm border border-gray-300 focus:outline-none focus:border-slate-700'
              required
            />
          </div>
  
          <button type="submit" className='bg-slate-700 hover:bg-slate-800 hover:shadow-md px-6 py-2 text-white'>Get OTP</button>
        </form>
      </div>
      <GFooter />
    </>
  );
  
};
