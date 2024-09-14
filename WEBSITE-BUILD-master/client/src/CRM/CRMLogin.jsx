import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import {  useDispatch } from "react-redux";
import { setLogin} from '../redux/state';
//import Header2 from '../components/Header2';
//import GFooter from '../components/GFOOTER';
import { toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //const currentPath = useLocation().pathname; // Get the current path or URL | Helpful for knowing if its USER or HOST

  const handleSubmit = async (e) => {
    e.preventDefault()

    const modelType = "agent";

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

      console.log("Logged in", loggedIn);

       if (loggedIn) {
         dispatch (
           setLogin({
             user: loggedIn.data,
            token: loggedIn.data.accessToken,
             modelType: modelType
           })
         )
        }
        // if(modelType === "user") {
        //   const wishlistResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/wishlists`, {
        //     headers: {
        //       Authorization: `Bearer ${loggedIn.data.accessToken}`
        //     }
        //   });
        //   const wishlistData = await wishlistResponse.json();
        //   console.log("Wishlist Data", wishlistData);
        //   dispatch(setWishList(wishlistData));

        //   const triplistResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/triplists`, {
        //     headers: {
        //       Authorization: `Bearer ${loggedIn.data.accessToken}`
        //     }
        //   });
        //   const triplistData = await triplistResponse.json();
        //   console.log("Triplist Data", triplistData);
        //   dispatch(setTripList(triplistData));
          
        // }

        // if(modelType === "host") {
        //       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/get-listings`, {
        //         method: "GET",
        //         headers: {
        //           "Authorization": `Bearer ${loggedIn.data.accessToken}`, // Include token in the Authorization header
        //           "Content-Type": "application/json"
        //         }
        //       })
        //       const data = await response.json()
        //       console.log("propertyList: ",data);
        //       dispatch(setPropertyList(data.data))

              
        // }
        
        console.log(modelType, typeof modelType);
        toast.success(` Successfully logged in! Welcome, AGENT`);
        navigate("/CRM")
      

    } catch (err) {
      console.log("Login failed", err.message)
      toast.error("Login failed. Please check your credentials and try again.");
      // setLoginError('Login failed. Please check your credentials and try again.');
    }
  }
  return (<>
    <div className='h-screen w-full bg-slate-200 flex  flex-col justify-center items-center '>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start py-8 px-14 shadow-lg  gap-6 bg-white/85 h-72  ">
      <h1 className = "text-center text-2xl font-semibold "> Agent Login</h1>
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
      <Link to='/CRM/register'>New Here? <span className="text-slate-700 font-semibold">Create an account. </span></Link>
      {/* {loginError && <p style={{ color: 'red' }}>{loginError}</p>} */}
    </div>
  </>);
};

export default Login;