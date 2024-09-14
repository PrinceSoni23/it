import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setReservationList, setLogin } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpired } from "../utility/CheckToken";
import { format } from "date-fns";
import { toast } from "react-toastify"

import Loader from "../components/Loader";
import GCard from "../components/GCARD";
import Header from "../components/Header2";
import Footer from "../components/GFOOTER"
import { FiCheckCircle } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  //const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const reservationList = useSelector((state) => state.user?.reservationList);
  const model = useSelector((state) => state.modelType);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      //console.log("Token expired");
      dispatch(setLogin({
        user: null,
        token: null,
        modelType: null
      }));
      toast.warn('Session expired. Please log in again.');
      navigate('/host_login');
      return;
    }
  }, [token, model, dispatch, navigate]);

  const getReservationList = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/reservations`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      dispatch(setReservationList(data.data));
      console.log("Reservation List data: ", data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Fetch Reservation List failed!", err.message);
    }
  }, [token, dispatch]);

  const updateBookingStatus = async (id, status) => {
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
      toast.error('An error occurred during verification.');
      navigate('/'); // Redirect to an error page if something goes wrong
    }
  };

  useEffect(() => {
    getReservationList();
  }, [getReservationList]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />

      <h1 className="title-list text-center text-slate-700 text-2xl pt-14 font-bold bg-slate-100 ">Your Reservation Lists</h1>
      <div className="list flex flex-wrap md:px-28 py-10 justify-center items-center gap-8 bg-slate-100">

        {reservationList?.map((trip) => (
          <>
            <div key={trip._id} className="relative rounded-md overflow-hidden flex flex-col group items-center justify-center ">
              <GCard
                key={trip._id} // Unique key for each listing
                listingId={trip.listingDetails._id} // Use the correct `listId` from the trip object
                creator={trip.listingDetails.hostId}
                listingPhotoPaths={trip.listingDetails.listingPhotoPaths}
                city={trip.listingDetails.city}
                province={trip.listingDetails.province}
                country={trip.listingDetails.country}
                category={trip.listingDetails.category}
                startDate={trip.checkIn} // Use `checkIn` from the trip object
                endDate={trip.checkOut} // Use `checkOut` from the trip object
                totalPrice={trip.listingDetails.price} // Use the price from the listing object
                booking={true} // Assuming booking is true by default
              />

              <div className="absolute rounded-r-md  overflow-hidden flex flex-col  h-full w-3/4  -right-1 transform duration-500 bg-white/90 translate-x-full group-hover:translate-x-0 shadow-lg z-20">
                <div className={`flex justify-center items-center  p-1 font-semibold bg-slate-800 text-white tracking-wide `}>
                  Guest Details
                </div>
                {/* USER AVATAR */}
                <div className={`flex flex-col justify-center items-center p-2`}>
                  <img
                    src={
                      trip.userDetails.avatar && trip.userDetails.avatar !== ""
                        ? `${process.env.REACT_APP_BACKEND_URL}/${trip?.userDetails?.avatar.replace("public", "")}`
                        : "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-20 h-20 object-cover rounded-full shadow-md transition-transform transform "
                  />

                  <div className={`font-bold text-sm text-slate-800 tracking-wide py-0.5`}>{trip.userDetails.firstName + "   " + trip.userDetails.lastName}</div>
                  <p className={` text-xs font-semibold text-black`}>{trip.userDetails.email}</p>

                </div>
                {/*  PHONE, CHECKIN, CHECKOUT */}
                <div className={`flex text-wrap flex-wrap items-center p-3  `}>
                  <div className={`flex flex-col gap-2 gap-y-3`}>
                    {/* ----------------PHONE------------------ */}
                    <div className={`flex  items-center gap-2 text-xs text-slate-800 font-semibold`}>
                      <div className="flex justify-between w-16">
                        <span className={`font-semibold text-slate-700`}>Phone</span>
                        <span>:</span>
                      </div>
                      <p className={` text-black`}>{trip.userDetails.phoneNumber}</p>
                    </div>
                    {/* ----------------CHECK IN------------------ */}
                    <div className={`flex  items-center gap-2 text-xs text-slate-800 font-semibold`}>
                      <div className="flex justify-between w-16">
                        <span className={`font-semibold text-slate-700`}>Check In</span>
                        <span>:</span>
                      </div>
                      <p className={` text-black`}>{format(new Date(`${trip.checkIn}`), "do MMM yyyy")}</p>
                    </div>
                    {/* ----------------CHECK OUT------------------ */}
                    <div className={`flex items-center gap-2 text-xs text-slate-800 font-semibold`}>
                      <div className="flex justify-between w-16">
                        <span className={`font-semibold text-slate-700`}>Check Out</span>
                        <span>:</span>
                      </div>
                      <p className={` text-black`}>{format(new Date(`${trip.checkOut}`), "do MMM yyyy")}</p>
                    </div>
                  </div>
                </div>
                {/* ACCEPT / REJECT BUTTON */}

                <div className={`flex justify-center items-center  p-2 pt-4 gap-2`}>
                  {trip.status === "pending"
                    ? <>
                      <button onClick={() => updateBookingStatus(trip._id, "approved")} className={`rounded px-4 py-1 cursor-pointer bg-green-500 text-white  font-bold text-xs tracking-wider`}>Approve</button>
                      <button onClick={() => updateBookingStatus(trip._id, "rejected")} className={`rounded px-4 py-1 cursor-pointer bg-red-500 text-white  font-bold text-xs tracking-wider`}>Reject</button>
                    </>
                    :
                    <div className={`py-1 px-2 rounded bg-white  ${trip.status && trip?.status === "approved" && "!bg-green-500 text-white "} ${trip.status && trip.status === "rejected" && "!bg-red-400 text-white px-4"} text-slate-800 font-semibold text-xs text-center tracking-wide flex items-center gap-1 duration-600 ease`}>
                      {trip?.status?.charAt(0).toUpperCase() + trip?.status?.slice(1)}
                    </div>
                  }
                </div>
              </div>

              {trip?.status === "pending" ? <>
              </>
                :
                <>
                  <div className={`absolute top-0 w-full flex justify-center  items-center text-center  z-10`}>
                    <div className={`${trip?.status === "approved" ? "!bg-green-500" : " !bg-red-400"} py-1 px-3 rounded-b-lg text-center text-xs font-bold text-white flex items-center gap-x-1`}>
                      {trip?.status && trip?.status === "rejected" && <span className="inline"><IoMdCloseCircleOutline className="font-bold text-sm" /></span>}
                      {trip?.status && trip?.status === "approved" && <span className="inline"><FiCheckCircle className="font-bold text-sm" /></span>}
                      {trip?.status?.charAt(0).toUpperCase() + trip?.status?.slice(1)}
                    </div>
                  </div>
                </>}
            </div>
          </>
        ))}
      </div >
      <Footer />
    </>
  );
};