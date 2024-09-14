import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import Header2 from "../components/Header2"
import GFooter from "../components/GFOOTER"
import { useDispatch, useSelector } from "react-redux"
import { setLogin } from "../redux/state"
import { isTokenExpired } from "../utility/CheckToken"

export const RegisterPage = () => {
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const currentPath = useLocation().pathname; // Get the current path or URL | Helpful for knowing if its USER or HOST

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "avatar" ? files[0] : value,
    });
  };
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword || formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);
  

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const model = useSelector((state) => state.modelType);
  
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
    }
  }, [token,model, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }
      console.log("register_form", register_form, "formData", formData);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${currentPath==="/host_register"?"hosts":"users"}/register`, {
        method: "POST",
        body: register_form,
      })

      if (response.ok) {
        navigate(`/${currentPath==="/host_register"?"host_":""}login`)
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }

  return (
    <>
    <Header2/>
    <div className="register">
      <div className="register_content h-screen w-full bg-slate-100 flex flex-col justify-center items-center">
        <form  onSubmit={handleSubmit} className="flex flex-col items-center justify-start py-8 px-10 shadow-lg  gap-4 bg-white/85"    >
        <h1 className = "text-center text-2xl font-semibold"> {`${currentPath === '/host_register' ? "Host" : "User"}`} Register</h1>
        <div className="h-1 w-28 bg-slate-800 -mt-3 rounded"></div>

          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className='py-2 px-4 w-60 text-sm border border-gray-300 focus:outline-none  focus:border-slate-800 '
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className='py-2 px-4 w-60 text-sm border border-gray-300 focus:outline-none  focus:border-slate-800 '
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className='py-2 px-4 w-60 text-sm border border-gray-300  focus:outline-none  focus:border-slate-800 '
            required
          />
          <input
            placeholder="Phone Number"
            name="phoneNumber"
            type="text"
            value={formData.phoneNumber}
            onChange={handleChange}
            className='py-2 px-4 w-60 text-sm border border-gray-300  focus:outline-none  focus:border-slate-800 '
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className='py-2 px-4 w-60 text-sm border border-gray-300  focus:outline-none  focus:border-slate-800 '
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            className='py-2 px-4 w-60 text-sm border border-gray-300 focus:outline-none  focus:border-slate-800 '
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="avatar"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            className='py-2 px-4 text-sm border border-gray-300  focus:outline-none  focus:border-slate-800 '
            
          />
          <label htmlFor="image">
            {/* <img src="/assets/addImage.png" alt="add profile pic" /> */}
            <p className="text-semibold text-xs ">Upload Your Photo</p>
          </label>

          {formData.avatar && (
            <img
              src={URL.createObjectURL(formData.avatar)}
              alt="profile pic"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch} className='bg-slate-800 hover:bg-slate-800 hover:shadow-md px-6 py-2 text-white '>REGISTER</button>
        </form>
        <Link to={`/${currentPath==="/host_register"?"host_":""}login`}>Already have an account? <span className="text-slate-800 font-semibold">Log In Here</span></Link>
      </div>
    </div>
    <GFooter/>
    </>
  );
};

