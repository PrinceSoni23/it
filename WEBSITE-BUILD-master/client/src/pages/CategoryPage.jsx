import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/GCARD";

export const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams()

  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings);
  console.log("CategoryPage | Listings :", listings);

  const getFeedListings = useCallback(async () => {
    try {
      const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/properties/category/${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  },[category, dispatch]);

  useEffect(() => {
    getFeedListings();
  }, [category, getFeedListings]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className="title-list text-center text-rose-500 font-semibold  text-3xl my-8 mx-24"> <span className="pr-2">{category}</span> Listings</h1>
      <div className="list px-20 py-24 pt-0 flex flex-wrap justify-center gap-5 ">
        {listings.data?.map(
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
            <ListingCard
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
 
    </>
  );
};

