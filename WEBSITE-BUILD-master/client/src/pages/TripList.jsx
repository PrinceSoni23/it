import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header2";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ListingCard from "../components/GCARD";
import Footer from "../components/GFOOTER";
import { setTripList, setLogin } from "../redux/state";
import { toast } from "react-toastify";
import { isTokenExpired } from "../utility/CheckToken";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";

  export const TripList = () => {
    const tripList = useSelector((state) => state.user?.tripList);
    const token = useSelector((state) => state.token);
    const model = useSelector((state) => state.modelType);
    const [confirmTripId, setConfirmTripId] = useState(null); // State to manage confirmation for a single card

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if (token && isTokenExpired(token)) {
        console.log("Token expired");
        dispatch(
          setLogin({
            user: null,
            token: null,
            modelType: null,
          })
        );
        console.log("Session expired. Please log in again.");
        model === "host" ? navigate("/host_login") : navigate("/login");
        return;
      }
    }, [token, model, dispatch, navigate]);

    const getTripList = useCallback( async() => {
      try{
        const triplistResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${model}s/triplists`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const triplistData = await triplistResponse.json();
        console.log("Triplist Data", triplistData.data);
        dispatch(setTripList(triplistData.data));
      }catch(error){
        toast.warn(`${error.message}`);
      }
    }, [token, model, dispatch]);
    useEffect(() => {
      if (token && model) {
        getTripList();
      }
    }, [token, model, dispatch, getTripList]);

  const updateTripLists = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/reservations/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      dispatch(setTripList(data.data));
      toast.info("Reservation cancelled.");
    } catch (err) {
      toast.error(err);
    }
  };

  const handleCancelClick = (tripId) => {
    setConfirmTripId(tripId); // Set the current trip ID for confirmation
    toast.warn("Clicking YES will cancel your reservation.");
  };

  const handleNoClick = () => {
    setConfirmTripId(null); // Reset the confirmation state
  };

  return (
    <>
      <Header />
      <div className="bg-slate-100">
        <h1 className="text-center font-bold text-2xl sm:text-3xl py-20 mx-auto text-slate-800">
          Your Trip List
        </h1>

        {tripList?.length === 0 ? (
          <div className="h-[65vh] flex flex-col  justify-center items-center font-bold text-xl mx-auto text-slate-700 pb-10">
            No trips to display. Book your trip now. <br />
            <Link
              to="/all-listings"
              className={`m-1 p-1 text-black text-lg animate-pulse`}
            >
              Explore
            </Link>
          </div>
        ) : (
          <div className="relative mx-auto w-full flex flex-wrap justify-center gap-6 pb-16">
            {tripList?.map((trip) => (
              <div
                key={trip._id}
                className="relative flex flex-col gap-0.5 items-center justify-center"
              >
                <ListingCard
                  listingId={trip.listId} // Use the correct `listId` from the trip object
                  creator={trip.listing.hostId}
                  listingPhotoPaths={trip.listing.listingPhotoPaths}
                  city={trip.listing.city}
                  province={trip.listing.province}
                  country={trip.listing.country}
                  category={trip.listing.category}
                  startDate={trip.checkIn} // Use `checkIn` from the trip object
                  endDate={trip.checkOut} // Use `checkOut` from the trip object
                  totalPrice={trip.listing.price} // Use the price from the listing object
                  booking={true} // Assuming booking is true by default
                />
                <div className={`absolute top-2 left-0 py-1 px-2 rounded-r-xl bg-white shadow-md ${trip.status==="approved" && "!bg-green-500 text-white "} ${trip.status==="rejected" && "!bg-red-500 text-white "} text-slate-800 font-semibold text-xs text-center tracking-wide flex items-center gap-1`}> 
                  
                  {trip.status==="pending" && <span>Status :</span> }
                  {trip.status==="rejected" && <span className="inline"><IoMdCloseCircleOutline className="font-bold text-lg" /></span> } 
                  {trip.status==="approved" && <span className="inline"><FiCheckCircle className="font-bold text-sm" /></span> } {trip.status?.charAt(0)?.toUpperCase() + trip.status?.slice(1)}
                 </div>

                <div className="w-full text-gray-600 hover:text-gray-800">
                  {confirmTripId === trip._id ? (
                    <div className={`w-full flex items-center justify-between px-2 py-1`}>
                      <p className="font-semibold text-slate-800">Are you sure?</p>
                      <div className={`flex gap-x-2 md:gap-x-4`}>
                        <button
                          className={`rounded px-3 md:px-4 py-1 bg-red-500 text-white font-bold text-xs tracking-wider`}
                          onClick={() => updateTripLists(trip._id)}
                        >
                          YES
                        </button>
                        <button
                          className={`rounded px-3 md:px-4 py-1 bg-slate-700 text-white font-bold text-xs tracking-wider`}
                          onClick={handleNoClick}
                        >
                          NO
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className={`text-center text-sm font-semibold text-slate-800 bg-white/60 p-1 w-full rounded-b hover:text-red-500 cursor-pointer duration-500`}
                      onClick={() => handleCancelClick(trip._id)}
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
