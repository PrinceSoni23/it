
import { FaUser, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import { BsCheckCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";
//-----------------------------------
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { facilities } from "../data/data.js";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Header2 from "../components/Header2"
import GFooter from "../components/GFOOTER"
import { setTripList } from '../redux/state';
import { useSelector, useDispatch } from "react-redux";
import { removeProperty } from "../redux/state";
import { toast } from "react-toastify";


const Details = () => {
  const user = useSelector((state) => state.user);
  const modelType = useSelector((state) => state.modelType);
  const token = useSelector((state) => state.token);
 // const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const dispatch = useDispatch();

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/properties/${listingId}`,
        // `http://localhost:9000/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log("data : ", data)
      //******************
      const f = data.data.facilities;
      const facilitiesArray = f.length === 1 ? f[0].split(',').map(item => item.trim()) : f;
      console.log("facilitiesArray", facilitiesArray)

      // Updating the 'listing' state with the parsed facilities array
      setListing({// Spread the existing listing data
        ...data.data,
        facilities: facilitiesArray, // Replace the 'facilities' string with the parsed array
      });
      //****************** */
      console.log("new listing : ", listing)
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };
  console.log("hostId", user?._id, typeof user?._id);
  console.log("listingId", listingId, typeof listingId);
  useEffect(() => {
    // eslint-disable-next-line
    getListingDetails();
    // eslint-disable-next-line
  }, []);


  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  //   /* SUBMIT BOOKING */
  //const customerId = useSelector((state) => state?.user?._id)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        listingId,
        checkIn: new Date(dateRange[0].startDate).toISOString(), // Convert start date to ISO format
        checkOut: new Date(dateRange[0].endDate).toISOString(),
      }
      //console.log("booking form", bookingForm);

     if(!user || modelType !== "user") {toast.error("You need to be logged in to book the property."); navigate("/login"); return; }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/listings/${listingId}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bookingForm)
      })

      if (response.ok) {
        const newTrip = await response.json();
        const updatedTripList = [...(user.tripList), newTrip.data];
        console.log("new Trip: ", newTrip.data, "updatedTripList: ", updatedTripList);
        dispatch(setTripList(updatedTripList));
        navigate(`/${user?._id}/trips`)
      } else {
        toast.error("This property is already booked for the selected dates. Please try again.")}

    } catch (err) {
      console.log("Booking Failed.", err.message)
      toast.error("Booking Failed. Please try again.")
    }
  }
  console.log("condition", user?._id === listing?.hostId);

  const deleteListing = async (e) => {
    e.stopPropagation(); // Prevents the card click event from firing
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/listings/${listingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Use appropriate authentication method
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      // Handle the removal of the listing from the UI or update the state
      // console.log("localStorage checking: ", localStorage.getItem('listId'), localStorage.getItem('currentStep'));
      dispatch(removeProperty(listingId));
      // console.log("localStorageId==listingId", listingId == localStorage.getItem('listId'))
      if (listingId === localStorage.getItem('listId')) {
        localStorage.removeItem('listId');
        localStorage.removeItem('currentStep');
      }
      console.log("listing deleted successfully");
      navigate(`/${user?._id}/properties`);
      // You can add code here to update the state and remove the listing from the UI
    } else {
      alert("Failed to delete the listing");
    }
  };



  return (
    <>
      <Header2 />
      <div className="font-sans mt-10">
        {/* Main Content Section */}
        <main className="relative grid grid-cols-2 gap-4 p-4 h-full ">
          {/* -------IMAGES------- */}
          {
            listing?.listingPhotoPaths?.slice(0, 2).map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${img.replace("public", "")}`}
                  alt="Property pictures"
                  className="w-full  h-[250px] sm:h-[320px] object-cover"
                />
                {
                  index === 1 && (
                    <Link to={`/gallery/${listingId}`}>
                      <button className="absolute  bottom-2  sm:bottom-4 right-2 sm:right-4 bg-white text-black px-3 sm:px-4 py-1  sm:py-2 shadow-lg font-semibold text-xs sm:text-medium">
                        View All photos
                      </button>
                    </Link>)
                }

              </div>
            ))
          }

        </main>

        <div className="max-w-7xl mx-auto p-4 bg-gray-50">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold">{listing?.title}</h1>
              <div className="flex items-center space-x-4 mt-4 text-black text-xs sm:text-sm"> 
                <span className="flex items-center font-bold "> {listing?.city} </span>
                <span className="flex items-center font-bold"> {listing?.province} </span>
                <span className="flex items-center font-bold"> {listing?.country}</span>
              </div>
              <div className="flex items-center space-x-4 mt-4 text-gray-600 text-xs sm:text-sm">
                <span className="flex items-center"><FaUser className="mr-1" /> {listing?.guestCount} guests</span> 
                <span className="flex items-center "><FaBed className="mr-1" /> {listing?.bedroomCount} bedroom(s), {listing?.bedCount} bed(s)</span>
                <span className="flex items-center"><FaBath className="mr-1" /> {listing?.bathroomCount} bathroom(s)</span>
                <span className="flex items-center"><FaRulerCombined className="mr-1" /> 'Area' sq/m</span>
              </div>
              <p className="mt-4 text-gray-700">
                <b>{listing?.highlightDesc} </b> <br />
                {listing?.description}
              </p>
            </div>

            {/* Availability and Contact Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div>
                <h2 className="text-lg font-semibold mb-2">Add dates for price</h2>
                <div className="flex items-center space-x-2 mb-4">
                  {/* <button className="border border-gray-300 rounded-lg py-2 px-4 flex-1 text-center text-sm">
                    Select dates
                  </button> */}
                  {/* <button className="border border-gray-300 rounded-lg py-2 px-4 flex-1 text-center text-sm">
                    {listing?.guestCount} guest
                  </button> */}
                </div>
                <button className="bg-slate-500 text-white rounded-lg py-3 px-4 w-full text-center font-semibold hover:bg-slate-700">
                  Check availability
                </button>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Ask the host anything</h3>
                <p className="text-gray-600">Do you have a question about this home or the local area?</p>
                <Link to="#" className="text-yellow-600 font-semibold mt-2 inline-block">
                  Message the host <FiMessageSquare className="inline ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Plum Promise Section */}
          
          {/* Facilities Section */}
          <div className="booking  w-full flex flex-col lg:flex-row justify-between gap-4 my-4">
            <div>
              <h2 className="sm:text-2xl tracking-wide text-black text-2xl font-bold my-4">What this place offers?</h2>
              <div className="facilities grid grid-cols-2 gap-x-4 md:gap-x-10  ">
                {listing?.facilities?.map((item, index) => (
                  <div className="facility flex items-center p-1 gap-1 sm:gap-2" key={index}>
                    <div className="facility_icon text-lg md:text-xl font-bold m-0.5  sm:m-2 text-gray-900 ">
                      {
                        facilities.find((facility) => facility.name === item)
                          ?.icon
                      }
                    </div>
                    <p className="text-xs sm:text-sm font-medium tracking-wide text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              {(modelType === "host" && listing?.hostId === user?._id) && (
                <button
                  onClick={deleteListing}
                  className="button bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Delete Listing
                </button>
              )}
            </div>

            {modelType !== "host" && (
              <div className="lg:border-l lg:pl-6 lg:pr-4">
                <h2 className="text-xl sm:text-2xl tracking-wide font-semibold my-2 text-slate-700 ">How long do you want to stay?</h2>
                <div className="date-range-calendar flex flex-col items-center p-2 ">
                  <DateRange ranges={dateRange} onChange={handleSelect} rangeColors={['#f43f5e', '#f43f5e', '#f43f5e']} className=" " />

                  <div className="w-full flex flex-row justify-between items-center  font-medium text-[10px] sm:text-xs">

                    <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
                    <p>End Date: {dateRange[0].endDate.toDateString()}</p>
                  </div>
                  <div className="flex w-full justify-between items-center py-2 text-md">

                    <h2 className=" text-sm sm:text-md font-semibold">
                      {`${listing?.price} x ${dayCount} Night${dayCount > 1 ? "s" : ""}`}
                    </h2>

                    <span className="font-semibold text-right text-sm sm:text-md ">Total Price = ${listing?.price * dayCount}</span>
                  </div>



                  <button onClick={handleSubmit} className="button w-full rounded-md bg-slate-700 hover:bg-slate-800 text-white flex items-center justify-center font-semibold tracking-wider py-2 mt-2" type="submit" >
                    BOOK NOW
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">The Promise We Keep</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><BsCheckCircle className="h-6 w-6 text-yellow-500 mr-2" />No time for average – We rejected many homes , so you don't have to.</li>
              <li className="flex items-start"><BsCheckCircle className="h-6 w-6 text-yellow-500 mr-2" />Hosts we know – For high-quality hosting.</li>
              <li className="flex items-start"><BsCheckCircle className="h-6 w-6 text-yellow-500 mr-2" /> Exceptional service before, during and after your stay.</li>
            </ul>
            <Link to="/FAQ" className="text-slate-800 font-semibold mt-4 inline-block">
              Learn about our Promise
            </Link>
          </div>






        </div>

      </div>

      <GFooter/>
    </>
  );
};

export default Details;
