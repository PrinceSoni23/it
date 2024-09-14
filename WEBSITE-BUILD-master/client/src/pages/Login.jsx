import React, { useState } from 'react';
import { Link,useNavigate, useLocation } from 'react-router-dom';

import {  useDispatch } from "react-redux";
import { setWishList, setPropertyList, setLogin } from '../redux/state';
import Header2 from '../components/Header2';
import GFooter from '../components/GFOOTER';
import { toast } from 'react-toastify';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentPath = useLocation().pathname; // Get the current path or URL | Helpful for knowing if its USER or HOST

  const handleSubmit = async (e) => {
    e.preventDefault()

    const modelType = currentPath === "/host_login" ? "host" : "user";

    try {
      const response = await fetch (`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      /* Get data after fetching */
      const loggedIn = await response.json()

      //console.log("Logged in", loggedIn);

      if (loggedIn) {
        dispatch (
          setLogin({
            user: loggedIn.data[modelType === "host" ? "hostData" : "user"],
            token: loggedIn.data.accessToken,
            modelType: modelType
          })
        )
        if(modelType === "user") {
          const wishlistResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/wishlists`, {
            headers: {
              Authorization: `Bearer ${loggedIn.data.accessToken}`
            }
          });
          const wishlistData = await wishlistResponse.json();
       //   console.log("Wishlist Data", wishlistData.data);
          dispatch(setWishList(wishlistData));
          
        }

        if(modelType === "host") {
              const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/get-listings`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${loggedIn.data.accessToken}`, // Include token in the Authorization header
                  "Content-Type": "application/json"
                }
              })
              const data = await response.json()
             // console.log("propertyList: ",data);
              dispatch(setPropertyList(data.data))

              
        }
        
     //   console.log(modelType, typeof modelType);
        toast.success(` Successfully logged in! Welcome, ${loggedIn.data[modelType === "host" ? "hostData" : "user"].firstName}. `);
        modelType === "host" ? navigate("/create-listing") : navigate("/")
      }

    } catch (err) {
      console.log("Login failed", err.message)
      toast.error(`Login failed. Please try again.`);
      // setLoginError('Login failed. Please check your credentials and try again.');
    }
  }
  return (<>
  <Header2/>
    <div className='h-screen w-full bg-slate-200 flex  flex-col justify-center items-center '>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start py-8 px-14 shadow-lg  gap-6 bg-white/85 h-72  ">
      <h1 className = "text-center text-2xl font-semibold "> {`${currentPath === '/host_login' ? "Host" : "User"}`} Login</h1>
      <div className="h-4 w-28 bg-slate-700 -mt-2 text-[1px] text-slate-700 rounded"> . </div>

        <input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="email" 
          className='py-2 px-4 text-sm border border-gray-300 focus:outline-none  focus:border-slate-700 '
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className='py-2 px-4 text-sm border border-gray-300  focus:outline-none  focus:border-slate-700 '

          required 
        />
        <button type="submit" className='bg-slate-700 hover:bg-slate-800 hover:shadow-md px-6 py-2 text-white '>Login</button>
      </form>
      <Link to={`/${currentPath==="/host_login"?"host_":""}register`}>New Here? <span className="text-slate-700 font-semibold">Create an account. </span></Link>
      <Link to={`/${currentPath==="/host_login"?"host-":""}get-otp`}>Forgot <span className="text-slate-700 font-semibold">password? </span></Link>
      {/* {loginError && <p style={{ color: 'red' }}>{loginError}</p>} */}
    </div>
    <GFooter/>
  </>);
};
