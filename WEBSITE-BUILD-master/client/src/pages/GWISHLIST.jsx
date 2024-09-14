import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate} from "react-router-dom"
import Header2 from "../components/Header2";
import GCard from "../components/GCARD";
import GFooter from "../components/GFOOTER"
import { useEffect } from "react";
import { setLogin } from "../redux/state";
import { isTokenExpired } from "../utility/CheckToken";
import {toast} from "react-toastify"

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);
  //console.log("WishList", wishList);
  const token = useSelector((state) => state.token);
  const model = useSelector((state) => state.modelType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.log("Token expired");
      dispatch(setLogin({
        user: null,
        token: null,
        modelType: null
      }));
      toast.warn('Session expired. Please log in again.');
      model==="host" ? navigate('/host_login') : navigate('/login');
      return;
    }
  }, [token,model, dispatch, navigate]);

  return (
    <>
    
      <Header2 />
      <div className="bg-slate-100">
      <h1 className="text-center font-bold text-2xl sm:text-3xl py-20 mx-auto text-slate-800">Your Wish List</h1>
      { wishList?.data?.length === 0
        ? 
        <div  className="h-[65vh] flex flex-col  justify-center items-center font-bold text-xl mx-auto text-slate-700 pb-10 tracking-wider">No properties in your Wishlist!<br/> <Link to="/all-listings" className={`m-1 p-1 text-black text-lg animate-pulse` }>Add now</Link>
        </div> 
        :
      <div className="flex flex-wrap justify-center items-center gap-8 px-auto md:px-[100px] pb-[120px]">
        {wishList?.data?.map(
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
        </div> }
      </div>
      <GFooter />
    </>
  );
};

export default WishList;