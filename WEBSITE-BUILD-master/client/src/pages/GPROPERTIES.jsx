import { useState, useEffect, useCallback, useRef } from "react";
import GCard from "../components/GCARD";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import Header2 from "../components/Header2";
import GFooter from "../components/GFOOTER";
import GSEARCH from "../components/GSEARCH";
import { useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaAnglesRight } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import { toast } from "react-toastify";

const GPROPERTIES = () => {
  const [listings, setListings] = useState([]);
  const [results, setResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedListings, setLoadedListings] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const sidebarRef = useRef(null);
  const token = useSelector((state) => state.token);
  const location = useLocation();
  const { data } = location.state || {};

  const getFeedListings = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/listings?page=1&limit=6`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const res_data = await response.json();
      setListings(res_data.listings);
      setLoading(false);
    } catch (err) {
      toast.error("Fetch Listings Failed");
    }
  }, [token]);

  const loadMoreListings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/listings?page=2&limit=6`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const res_data = await response.json();
      setLoadedListings(res_data.listings);
    } catch (err) {
      toast.error("Failed to load more listings");
    }
  };

  useEffect(() => {
    if (data) {
      setListings(data);
      setResults(true);
      setLoading(false);
    } else {
      getFeedListings();
    }
  }, [data, getFeedListings]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      <Header2 />
      {/* GSearch component */}
      <div className={`absolute w-full duration-200 transform ${expand ? "translate-y-0" : "h-2 -translate-y-full"} bg-slate-100 z-[60]`}>
        <GSEARCH
          className={`!pt-10 !sm:pt-24 !px-12 shadow-none bg-white transform ${expand ? "translate-y-0" : " -translate-y-full"} duration-200 z-[60]`}
          down={true}
        />
        <button
          className={`absolute ${expand ? "-bottom-6" : "-bottom-20 md:-bottom-24"} right-4 bg-white h-9 sm:h-11 w-9 sm:w-11 rounded-full flex items-center justify-center shadow-md z-[61] outline-none`}
          onClick={() => setExpand(!expand)}
        >
          <FaSearchLocation className="text-xl text-slate-700" />
        </button>
      </div>

      <div className="flex bg-slate-100 gap-6 py-16 px-5 justify-center">
        <button
          className="md:hidden text-gray-600 flex justify-center pl-3 shadow-md items-center bg-white outline-none w-10 h-10 rounded-full absolute top-[20%] -left-4 z-[99]"
          onClick={toggleSidebar}
        >
          <FaAnglesRight className="text-sm" />
        </button>
           {/* Sidebar idhar */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 w-64 p-5 bg-white z-[101] md:z-[59] rounded transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:relative md:flex md:flex-col md:w-1/4 shadow-sm`}
        >
          <button
            className="md:hidden text-gray-600 text-md font-bold absolute top-6 right-4 z-[62]"
            onClick={toggleSidebar}
          >
            <AiOutlineClose />
          </button>
          <h2 className="text-lg font-semibold mb-4 tracking-wide border-b">Filters</h2>

          <div className="mb-3 md:mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Suggested for You</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Shared Room
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Entire House
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Villas
              </label>
            </div>
          </div>

          <div className="mb-3 md:mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Price Per Night</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                $0 - $100
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                $100 - $200
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                $200 - $300
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                $300+
              </label>
            </div>
          </div>

          <div className="mb-3 md:mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">User Ratings</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                5 Stars
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                4 Stars
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                3 Stars
              </label>
            </div>
          </div>

          <button className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 rounded mt-4">
            Apply Filters
          </button>
        </div>
        <div className="relative pt-5 px-4 md:px-8  flex justify-center gap-5 z-[59]">
          <div className="flex-grow md:w-3/4">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="text-center text-slate-700 text-3xl md:text-4xl font-semibold mb-8">
                  {results ? "Search Results :" : "Explore from our amazing properties."}
                </div>
                <div className="listings justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 md:pb-14">
                  {listings?.map(
                    ({
                      _id,
                      creator,
                      listingPhotoPaths,
                      city,
                      province,
                      country,
                      category,
                      type,
                      price,
                      booking = false,
                    }) => (
                      <GCard
                        key={_id}
                        listingId={_id}
                        creator={creator}
                        listingPhotoPaths={listingPhotoPaths}
                        city={city}
                        province={province}
                        country={country}
                        category={category}
                        type={type}
                        price={price}
                        booking={booking}
                      />
                    )
                  )}
                  {/* AUR LISTINGS AANE DO */}
                  {loadedListings &&
                    loadedListings.map(
                      ({
                        _id,
                        creator,
                        listingPhotoPaths,
                        city,
                        province,
                        country,
                        category,
                        type,
                        price,
                        booking = false,
                      }) => (
                        <GCard
                          key={_id}
                          listingId={_id}
                          creator={creator}
                          listingPhotoPaths={listingPhotoPaths}
                          city={city}
                          province={province}
                          country={country}
                          category={category}
                          type={type}
                          price={price}
                          booking={booking}
                        />
                      )
                    )}
                </div>
                { loadedListings===null &&
                <div className="flex justify-center items-center mt-4 md:mt-6">
                  <button
                    onClick={loadMoreListings}
                    className="py-2 px-4 font-semibold tracking-wide bg-slate-700 hover:bg-slate-800 text-white rounded"
                  >
                    Load More
                  </button>
                </div>
              }
              { loadedListings!==null &&
                <div className="flex justify-center items-center mt-4 md:mt-6">
                  <button
                    onClick={() => setLoadedListings(null)}
                    className="py-2 px-4 font-semibold tracking-wide bg-slate-700 hover:bg-slate-800 text-white rounded"
                  >
                     Show Less
                  </button>
                </div>
      }
              </>
            )}
          </div>
        </div>
      </div>
      <GFooter />
    </>
  );
};

export default GPROPERTIES;
