import React, { useState, useEffect } from 'react';
import { useParams,  Link } from "react-router-dom";
import Loader from "../components/Loader";
import { IoClose } from "react-icons/io5";

const Gallery = () => {

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);


  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      //******************
      const f = data.data.facilities;
      const facilitiesArray = f.length === 1 ? f[0].split(',').map(item => item.trim()) : f;

      setListing({
        ...data.data,
        facilities: facilitiesArray, // Replace the 'facilities' string with the parsed array
      });

      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getListingDetails();
    // eslint-disable-next-line
  }, []);


  return (
    <>
      {
        loading ? (<Loader />) : (

          <div className="min-h-screen bg-gray-50 p-10">
            
            <div className=" flex justify-end p-6 font-bold">
            <Link to={`/properties/${listingId}`}>
              <IoClose className='text-2xl font-bold text-right'/>
            </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              {
                listing?.listingPhotoPaths?.map((image, index) => (
                  <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${image.replace("public", "")}`}
                  alt="Property pictures"
                  className="w-full h-[320px] object-cover"
                  key={index}
                />
                ))
              }

            </div>
          </div>
        )}
    </>
  );
};

export default Gallery;
