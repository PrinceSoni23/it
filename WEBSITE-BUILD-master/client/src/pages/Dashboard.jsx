import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/state";
import { toast } from "react-toastify";
import Header2 from "../components/Header2";
import Footer from "../components/GFOOTER";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const modelType = useSelector((state) => state.modelType);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || {};

  useEffect(() => {
    if (user === null || token === null || modelType === null) {
      if (role === null) {
        toast.warn("You need to be logged in for accessing dashboard.");
        navigate("/");
      } else {
        role === "user" ? navigate("/login") : navigate("/host_login");
      }
    }
  }, [user, role, token, modelType, navigate]);

  if (user === null || token === null || modelType === null) {
    return null;
  }


  // const [isEditing, setIsEditing] = useState(false);
  //const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const [hostData, setHostData] = useState({
    firstName: user?.firstName || "Jane",
    lastName: user?.lastName || "Smith",
    email: user?.email || "jane.smith@example.com",
    phoneNumber: user?.phoneNumber || "+0987654321",
    profilePicture: user?.avatar || "",
    emailVerified: user?.emailVerified || false,
    password: "",
    work: user?.work || "",
    languages: user?.languages || "",
    timeZone: user?.timeZone || "",
    about: user?.about || "",
  });
  console.log("Host Data", user);

  const triplists = modelType === "user" ? user.tripList : [];
  // const wishlists = modelType==="user" ? user.wishList : [];
  const propertylists = modelType === "host" ? user.propertyList : [];

  const handleProfilePictureChange = async (e) => {
    //console.log("dekhu")
    e.preventDefault();
    const file = e.target.files[0];
    // console.log("dekhu chal rha ya nahi",file);
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/update-avatar`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT if required
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to update avatar");
        }

        const data = await response.json();
        //console.log("Updated profile picture URL:", data);
        // Update the local state with the new profile picture URL
        dispatch(setLogin({
          user: { ...user, avatar: data.data.avatar },
          token: token,
          modelType: modelType
        }));
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        toast.error("Error updating profile picture.", error);
      }
    }
  };
  const htmlContent = `<div style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="color: #2a9d8f;">Welcome to Trip It Today!</h2>
                        <p>Dear Traveler,</p>
                        <p>Thank you for choosing Trip It Today to plan your next adventure! We're excited to have you on board.</p>
                        <p>Before you can start exploring the best destinations, we just need to verify your email address to ensure your account is secure.</p>
                        <p style="text-align: center;">
                          <a href="{{verificationUrl}}"  
                            style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #2a9d8f; text-decoration: none; border-radius: 5px;">
                            Confirm Your Email
                          </a>
                        </p>
                        <p>If you did not sign up for Trip It Today, please ignore this email.</p>
                        <p>Safe travels!</p>
                        <p>The Trip It Today Team</p>
                        <hr>
                      </div>
                    `

  const handleEmailVerification = async () => {
    try {
      //console.log("Sending verification email to:", user.email,"\n",htmlContent);
      toast.info(`Verification mail sent to ${user.email}.`);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          htmlContent: htmlContent,
          role: modelType,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to send verification email.");
        throw new Error("Failed to send verification email");
      }
      // eslint-disable-next-line
      // const data = await response.json();
      //console.log("Email verification response:", data);
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Error sending verification email.");
    }
  }


  return (
    <>
      <Header2 />
      <br /><br />
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-4xl bg-white rounded-sm shadow-lg p-5 sm:p-8 transition-transform transform">
          <h2 className="text-3xl text-center font-bold text-slate-800 mb-10 animate_animated animate_fadeIn ">
            {modelType === "host" ? "Host" : "User"} Dashboard
          </h2>
          <div className="flex flex-col md:flex-row gap-8 ">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              {/* Profile Section */}
              <div className="relative">
                <img
                  src={
                    hostData.profilePicture
                      ? `${process.env.REACT_APP_BACKEND_URL}/${user?.avatar?.replace("public", "")}`
                      : "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full border-2 border-gray-300 shadow-md transition-transform transform hover:scale-105"
                />
                <label
                  htmlFor="profilePictureInput"
                  className="absolute bottom-2 right-2 bg-slate-800 text-white rounded-full p-2 cursor-pointer transition-transform transform hover:scale-105"
                >
                  <FaPen />
                </label>
                <input
                  id="profilePictureInput"
                  name="profilePictureInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-slate-800">{hostData.name}</p>
                <p className="text-sm text-slate-700">{hostData.email}</p>
                <p className="text-sm text-slate-700">{hostData.phoneNumber}</p>
              </div>
            </div>

            {/* Host Information Section */}
            <div className="w-full md:w-2/3 ">

              <div className="flex flex-col gap-x-4 gap-y-6">
                {/* Displaying user details as plain text */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col w-full">
                    <label className=" text-sm text-slate-700 ">First Name</label>
                    <p className="mt-1  font-bold text-slate-800">{hostData.firstName}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col w-full">
                    <label className="text-sm text-slate-700">Last Name</label>
                    <p className="mt-1 text-md font-bold text-slate-800">{hostData.lastName}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col w-full">
                    <label className="text-sm text-slate-700">Email</label>
                    <span className="!flex  sm:gap-x-3 !items-center"> <p className="mt-1 text-md font-bold text-slate-800">{hostData?.email}  </p>
                      <MdMarkEmailRead className={` sm:text-lg ${hostData?.emailVerified ? "text-green-500" : "hidden"}`} />
                    </span>
                  </div>

                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col w-full">
                    <label className="text-sm text-slate-700">Phone Number</label>
                    <p className="mt-1 text-md font-bold text-slate-800">{hostData.phoneNumber}</p>
                  </div>
                  {/* <Link to="/update-details" className="ml-4 text-slate-700 hover:text-slate-800">
                  <FaPen />
                </Link> */}
                </div>
                {modelType === "host" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col w-full">
                        <label className="text-sm text-slate-700">Work</label>
                        <p className="mt-1 text-md font-bold text-slate-800">{hostData.work}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col w-full">
                        <label className="text-sm text-slate-700">Languages</label>
                        <p className="mt-1 text-md font-bold text-slate-800">{hostData.languages}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col w-full">
                        <label className="text-sm text-slate-700">Time Zone</label>
                        <p className="mt-1 text-md font-bold text-slate-800">{hostData.timeZone}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col w-full">
                        <label className="text-sm text-slate-700">About</label>
                        <p className="mt-1 text-md font-bold text-slate-800">{hostData.about}</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Password Field (Conditional on isEditing) */}
                {/* {isEditing && (
                  <div className="flex flex-col">
                    <label className="text-slate-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={hostData.password}
                        onChange={handleInputChange}
                        name="password"
                        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm transition-shadow duration-300 focus:shadow-outline-green w-full"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        onClick={handlePasswordToggle}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )} */}
              </div>
              <div className=" flex justify-end gap-1 sm:gap-2">
                <Link to={"/change-password"}>
                  <div className="mt-6 flex justify-end">
                    <button
                      className={`px-1.5 sm:px-2 py-1.5 font-semibold text-xs sm:text-sm text-white shadow-md transition-all duration-300 tracking-wide bg-slate-700 hover:bg-slate-800`}>
                      Change Password
                    </button>
                  </div>
                </Link>
                <Link to={"/update-details"}>
                  <div className="mt-6 flex justify-end">
                    <button
                      className={`px-1.5 sm:px-2 py-1.5 font-semibold text-xs sm:text-sm text-white shadow-md transition-all duration-300 tracking-wide bg-slate-700 hover:bg-slate-800`}>
                      Edit Profile
                    </button>
                  </div>
                </Link>
                {!hostData?.emailVerified &&
                  <Link to={"/dashboard"}>
                    <div className="mt-6 flex justify-end">
                      <button onClick={() => handleEmailVerification()}
                        className={`px-1.5 sm:px-2 py-1.5 font-semibold text-xs sm:text-sm text-white shadow-md transition-all duration-300 tracking-wide bg-slate-700 hover:bg-slate-800`}>
                        Verify Email
                      </button>
                    </div>
                  </Link>}

              </div>
            </div>
          </div>

          {/* Conditionally Render Listed Properties and Reservations */}
          {modelType === "host" && (
            <>
              {/* Listed Properties Section */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b"> Listed Properties</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  {propertylists?.map((property) => (
                    <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/2 transition-transform transform hover:scale-105">
                      <h4 className="font-semibold text-gray-700">{property.title}</h4>
                      <p className="text-sm text-gray-500">Location: {property.country}, {property.city}</p>
                      <p className="text-sm text-gray-500">Price: {property.price}/night</p>
                      <Link to={`/properties/${property._id}`} className="text-slate-700 hover:text-slate-800 font-semibold">View Listing</Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* See Current Reservations Button */}
              <div className="mt-10 flex justify-end">
                <Link to={`/${user._id}/reservations`}>
                  <button className="px-6 py-3 rounded-lg bg-slate-700 text-white shadow-lg hover:bg-slate-800 transition-colors duration-300 transform hover:scale-105 border-b">
                    See Current Reservations
                  </button>
                </Link>
              </div>
            </>
          )}
          {modelType === "user" && (
            <>
              {/* Upcoming Trips Section */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b">Upcoming Trips</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  {triplists?.map((trip) => (
                    <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 transition-transform transform hover:scale-105">
                      <h4 className="font-semibold text-gray-700">{trip.listing.title}</h4>
                      <p className="text-sm text-gray-500">Check-in: {format(new Date(trip.checkIn), "do MMM yyyy")}</p>
                      <p className="text-sm text-gray-500">Check-out: {format(new Date(trip.checkOut), "do MMM yyyy")}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Trips Section */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b">Recent Trips</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 transition-transform transform hover:scale-105">
                    <h4 className="font-semibold text-gray-700">Hotel DEF</h4>
                    <p className="text-sm text-gray-500">Stayed: 10th Aug 2024 - 15th Aug 2024</p>
                  </div>
                  <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 transition-transform transform hover:scale-105">
                    <h4 className="font-semibold text-gray-700">Hotel GHI</h4>
                    <p className="text-sm text-gray-500">Stayed: 1st Aug 2024 - 5th Aug 2024</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );


};

export default Dashboard;