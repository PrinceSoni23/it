import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/state";
import CRMHeader from './CRMHeader'
import Sidebar from './CRMSidebar'
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Tasks = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const modelType = useSelector((state) => state.modelType);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [submit, setSubmit] = useState(false);
    useEffect(() => {
          // Set initial form values based on user data from Redux
          setFirstName(user.firstName || '');
          setLastName(user.lastName || '');
          setEmail(user.email || '');
          setPhoneNumber(user.phoneNumber || '');

      }, [user, modelType]);
    
    const updateDetails = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/agents/update-agent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phoneNumber
                }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(setLogin({ user: data.data, token, modelType }));
                navigate("/CRM/dashboard");
                toast.success("Details updated successfully!");
            }
        } catch (err) {
            toast.error("Couldn't update your details.", err.message);
        }
    }, [dispatch, email, firstName, lastName, modelType, navigate, phoneNumber, token]);

    useEffect(() => {
        if (submit) {
            updateDetails();
            setSubmit(false); // Reset submit to avoid infinite loop
        }
    }, [submit, updateDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true); // Trigger the useEffect to call updateDetails
    };

    return (
        <div>
            <CRMHeader />
            <Sidebar />
            <div className='main-container h-screen flex justify-center items-center  bg-slate-100 ml-16 px-0 sm:px-24  z-50'>
                <div className="w-full mx-auto bg-white/85  shadow-md  sm:px-16 sm:py-10 rounded-md">
                    <h2 className="text-3xl font-semibold text-slate-700 mb-6 ">Edit Profile</h2>
                    <form className="flex flex-col  space-y-8" onSubmit={handleSubmit}>
                        <div className={`flex flex-col sm:flex-row justify-between  sm:gap-x-6`}>
                        <label htmlFor="firstName" className="text-slate-700 w-full font-bold text-sm">First Name
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full text-base font-medium px-4 py-2 border focus:border-slate-700  text-slate-700 focus:outline-none "
                            required
                        />
                        </label>
                        <label htmlFor="lastName" className="text-slate-700 w-full font-bold text-sm">Last Name
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full text-base font-medium px-4 py-2 border focus:border-slate-700  text-slate-700 focus:outline-none "
                            required
                        />
                        </label>
                        </div>
                        <label htmlFor="email" className="text-slate-700 w-full font-bold text-sm ">Email
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-base font-medium px-4 py-2 border focus:border-slate-700  text-slate-700 focus:outline-none "
                            required
                        />
                        </label>
                        <label htmlFor="phoneNumber" className="text-slate-700 w-full font-bold text-sm ">Phone Number
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full text-base font-medium px-4 py-2 border focus:border-slate-700  text-slate-700 focus:outline-none "
                            required
                        />
                        </label>

                        <div className={`flex justify-end gap-x-2 items-center p-1 w-full`}>

                        <Link to="/CRM/dashboard" className={`border border-slate-700 bg-white text-slate-700 font-semibold py-2 px-6 outline-none`}>
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="border border-slate-700 bg-slate-700 text-white font-semibold py-2 px-4 hover:bg-slate-800 outline-none "
                        >
                            Save Changes
                        </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Tasks