import React, { useState } from "react";
import "../styles/changePassword.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header2";
import Footer from "../components/GFOOTER";


export const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = useSelector((state) => state.token);
  const modelType = useSelector((state) => state.modelType);
  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      //const data = await response.json();
      //console.log("Password change response: ", data);
      if (response.ok) {
        navigate("/dashboard");
        toast.success("Password changed successfully!");
      }
    } catch (err) {
      toast.error("Password change failed!", err.message);
    }
    // Add your password change logic here
    //console.log("currentPassword: ", currentPassword, "\nnewPassword: ", newPassword, "\nconfirmPassword: ", confirmPassword);
  };

  return (
    <>
    <Header />
      {/* <div className="h-screen w-screen flex flex-col justify-center items-center bg-center bg-cover" style={{ background: "url('/assets/login.jpg')" }}>
        <div className=" flex flex-col gap-4 bg-black/80 rounded-xl w-[90%] sm:w-[50%] md:w-[60%] p-16">
          <h2 className="text-center text-white text-lg">Change Password</h2>
          <form className="flex flex-col items-center gap-3" onSubmit={handlePasswordChange}>
            <input
              className="w-full px-2 py-4 bg-transparent border-b border-white text-center text-white placeholder:text-white outline-none"
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              className="w-full px-2 py-4 bg-transparent border-b border-white text-center text-white placeholder:text-white outline-none"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              className="w-full px-2 py-4 bg-transparent  border-b border-white text-center text-white placeholder:text-white outline-none"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="mt-4 w-1/2 p-2 text-white bg-transparent border border-white border-sm cursor-pointer hover:shadow-xl hover:shadow-white duration-300 ease">Change Password</button>
          </form>
        </div>
      </div> */}



      <div className='min-h-screen  bg-slate-200 flex  justify-center items-center '>
        <form onSubmit={handlePasswordChange} className="flex flex-col items-center justify-start p-7 shadow-lg  space-y-5 bg-white/85 w-full  sm:max-w-sm  ">
          <h1 className="text-center text-3xl font-semibold text-gray-800 "> Change Password</h1>
          <div className="h-1 w-28 bg-slate-700 -mt-2 text-[1px] text-slate-700 rounded"> . </div>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className='py-2 px-4 text-sm border border-gray-300 focus:outline-none  focus:border-slate-700 '
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className='py-2 px-4 text-sm border border-gray-300  focus:outline-none  focus:border-slate-700 '

            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className='py-2 px-4 text-sm border border-gray-300  focus:outline-none  focus:border-slate-700 '

            required
          />
          <button type="submit" className='bg-slate-700 hover:bg-slate-800 hover:shadow-md mt-2 px-6 py-2 text-white'>Change Password</button>
        </form>
      </div>

      <Footer/>

    </>
  );
};
