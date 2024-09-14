import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";
import { toast } from "react-toastify";
import Header from "../components/Header2";
import Footer from "../components/GFOOTER";

export const UpdateDetails = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [work, setWork] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [languages, setLanguages] = useState('');
  const [about, setAbout] = useState('');

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const modelType = useSelector((state) => state.modelType);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (user && modelType==="user") {
      // Set initial form values based on user data from Redux
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
    }else if(user && modelType==="host"){
        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
        setEmail(user.email || '');
        setPhoneNumber(user.phoneNumber || '');
        setWork(user.work || ''); 
        setTimeZone(user.timeZone || ''); 
        setLanguages(user.languages || ''); 
        setAbout(user.about || '');
    }
  }, [user, modelType]);

  const updateDetails = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/update-details`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          work,
          timeZone,
          languages,
          about
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        dispatch(setLogin({ user: data.data, token, modelType }));
        navigate("/dashboard");
        toast.success("Details updated successfully!");
      }
    } catch (err) {
      toast.error("Couldn't update your details", err.message);
    }
  }, [about, dispatch, email, firstName, lastName, modelType, navigate, phoneNumber, token, work, timeZone, languages]);

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
    <>
    <Header />
    <div className="flex justify-center items-center min-h-screen bg-slate-200">
      <div className="w-full  sm:max-w-sm bg-white/85  shadow-md p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300  text-slate-700 focus:outline-none "
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-slate-700 focus:outline-none "
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-slate-700 focus:outline-none "
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-slate-700 focus:outline-none "
            required
          />
            {modelType==="host" && (
              <>
                <input
                    type="text"
                    placeholder="Work"
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 text-slate-700 focus:outline-none "
                />
                <input
                    type="text"
                    placeholder="Time Zone"
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 text-slate-700 focus:outline-none "
                />
                <input
                    type="text"
                    placeholder="Languages"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 text-slate-700 focus:outline-none "
                />
                <textarea
                    placeholder="About"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 text-slate-700 focus:outline-none "
                />
              </>
            )}
          <button
            type="submit"
            className="w-full bg-slate-700 text-white font-semibold py-2  hover:bg-slate-800 focus:outline-none  focus:ring-opacity-50"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
    <Footer/> 
    </>
  );
};
