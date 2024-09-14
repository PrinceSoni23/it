// import "../styles/List.scss";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header2";
import ListingCard from "../components/GCARD";
import { setPropertyList, setLogin } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/GFOOTER"
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utility/CheckToken";

export const PropertyList = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const model = useSelector((state) => state.modelType)
  const propertyList = user?.propertyList;
  console.log(user, token)

  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  const getPropertyList = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/get-listings`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Include token in the Authorization header
          "Content-Type": "application/json"
        }
      })
      console.log("in here",response)
      const data = await response.json()
      console.log(data)
      dispatch(setPropertyList(data.data))
      setLoading(false)
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  },[token,dispatch]);

  useEffect(() => {
    getPropertyList()
  }, [getPropertyList])

  return loading ? <Loader /> : (
    <>
      <Header />
      <h1 className="title-list text-center text-slate-700 text-2xl pt-14 font-bold bg-slate-100 mt-100">Your Property List</h1>
      <div className="list flex flex-wrap gap-8 justify-center items-center bg-slate-100 py-10 mt-100 ">
        {propertyList?.map(
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

      <Footer />
    </>
  );
};
