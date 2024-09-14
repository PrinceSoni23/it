import { useState } from "react";
import {
    ArrowForwardIos,
    ArrowBackIosNew,
    Favorite,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";
import { format } from "date-fns";
import { toast } from "react-toastify";

const GCARD = ({
    listingId,
    creator,
    listingPhotoPaths,
    city,
    province,
    country,
    category,
    type,
    price,
    startDate,
    endDate,
    totalPrice,
    booking
}) => {
    /* SLIDER FOR IMAGES */
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevSlide = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
        );
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //   console.log("listingDetails: ", listingId,listingPhotoPaths);
    /* ADD TO WISHLIST */
    const user = useSelector((state) => state.user);
    const modelType = useSelector((state) => state.modelType);
    const token = useSelector((state) => state.token);
    // console.log("user: ", user);
    if(modelType === "user") {
      const wishList = user?.wishList?.data || [];
      //console.log("wishlist: ", wishList, typeof wishList);
      var isLiked = wishList?.find((item) => item?._id === listingId);
    }

    const updateWishList = async () => {
        if (modelType === "user") {
            try {
                // console.log("isLiked: ", isLiked);
                const url = isLiked 
                    ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/listings/${listingId}/wishlist` 
                    : `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/listings/${listingId}/wishlist`;
       const method = isLiked ? "DELETE" : "POST";

                const response = await fetch(url, {
                    method,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ listingId }),
                });

                const data = await response.json();
                // console.log("data", data);
                if (response.ok) {
                    dispatch(setWishList(data));
                    //console.log(`Wishlist ${isLiked ? 'removed from' : 'updated with'}: `, data);
                } else {
                    toast.error(`Failed to ${isLiked ? 'remove from' : 'update'} wishlist:`, data);
                }
            } catch (error) {
                toast.error("Error in updateWishList:", error);
            }
        } else {
            toast.error("User is not allowed to modify wishlist.");
        }
    };

    

    return (
        <div
            className="relative w-[240px] sm:w-[260px] flex flex-col text-wrap cursor-pointer bg-white rounded-md hover:border-none hover:shadow-lg"
            onClick={() => {
                navigate(`/properties/${listingId}`);
            }}
        >
            <div className="  rounded-t-md overflow-hidden ">

                {/* IMAGE SLIDER */}
                <div
                    className="slider flex duration-75 transition-transform ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {listingPhotoPaths?.map((photo, index) => (

                        // IMAGE
                        <div key={index} className="slide relative flex-[0_0_100%] w-[100%] h-[180px] sm:h-[200px] items-center">
                            <img
                                src={`${process.env.REACT_APP_BACKEND_URL}/${photo?.replace("public", "")}`}
                                alt={`slideImage ${index + 1}`}
                                className="w-full h-full object-cover filter brightness-90"
                            />
                            {/* PREVIOUS BUTTON */}
                            <div
                                className="prev-button absolute top-1/2 left-1 transform -translate-y-1/2 bg-white/80 hover:bg-white font-extrabold text-slate-600 p-1 rounded-full cursor-pointer flex items-center justify-center z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevSlide(e);
                                }}
                            >
                                <ArrowBackIosNew sx={{ fontSize: "12px"}} />
                            </div>
                            {/* NEXT BUTTON */}
                            <div
                                className="next-button absolute top-1/2 right-1 transform -translate-y-1/2 bg-white/80 hover:bg-white font-extrabold text-slate-600 p-1 rounded-full  cursor-pointer flex items-center justify-center z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNextSlide(e);
                                }}
                            >
                                <ArrowForwardIos sx={{ fontSize: "12px" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="info" className=" py-4 px-4 flex flex-col flex-grow justify-between items-between flex-wrap text-wrap">
                <div>
                    <h3 className="font-bold  text-sm">
                        {city}, {country}
                    </h3>
                    <p className="font-medium text-gray-900 text-xs">{category} { type && <span className="px-0.5"> | </span>} {type}</p>

                </div>
                <div className="flex justify-between items-end pt-4">
                    <span>
                    {!booking ? (
                        <>
                            {/* <p className="font-medium  text-sm text-slate-700">{type}</p> */}
                            <p className="font-semibold text-sm">
                                <span className="font-bold text-md">${price}</span> per night
                            </p>


                        </>
                    ) : (
                        <>
                            <p className="text-xs font-semibold text-black/80">
                                {format(new Date(startDate), "dd MMM yyyy")} - {format(new Date(endDate), "dd MMM yyyy")}
                            </p>
                            <p className="font-semibold text-sm">
                                <span className="font-bold text-md">${totalPrice}</span> per night
                            </p>
                        </>
                    )}
                    </span>
                    <Link className="text-xs text-semibold py-1.5 px-2 rounded-sm tracking-wide -mb-1 bg-gray-100  text-slate-700  " to={`/properties/${listingId}`}>
                        Explore 
                    </Link>
                </div>
            </div>

            <button
                className="favorite absolute drop-shadow-lg top-1 right-2 border-none text-lg cursor-pointer z-10 bg-none"
                onClick={(e) => {
                    e.stopPropagation();
                    updateWishList();
                }}
                // disabled={!user}
            >
                { user!==null && modelType === "user" ?      ( isLiked ? (
                    <Favorite sx={{ color: "red" , fontSize : "20px"}} />
                ) : (
                    <Favorite sx={{ color: "white" , fontSize : "20px"}} />
                )) : ""}
            </button>
        </div>
    );
};

export default GCARD;

// import { useState } from "react";
// import {
//     ArrowForwardIos,
//     ArrowBackIosNew,
//     Favorite,
// } from "@mui/icons-material";
// import { useNavigate, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setWishList, clearWishList } from "../redux/state";

// const GCARD = ({
//     listingId,
//     creator,
//     listingPhotoPaths,
//     city,
//     province,
//     country,
//     category,
//     type,
//     price,
//     startDate,
//     endDate,
//     totalPrice,
//     booking
// }) => {
//     /* SLIDER FOR IMAGES */
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const goToPrevSlide = () => {
//         setCurrentIndex(
//             (prevIndex) =>
//                 (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
//         );
//     };

//     const goToNextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
//     };

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     //   console.log("listingDetails: ", listingId,listingPhotoPaths);
//     /* ADD TO WISHLIST */
//     const user = useSelector((state) => state.user);
//     const modelType = useSelector((state) => state.modelType);
//     const token = useSelector((state) => state.token);
//       const wishList = user?.wishList || [];

//     const isLiked = wishList?.find((item) => item?._id === listingId);

//     const updateWishList = async () => {
//         if (modelType === "user") {
//             try {
//                 console.log("isLiked: ", isLiked);
//                 const url = isLiked 
//                     ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/listings/${listingId}/wishlist` 
//                     : `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/listings/${listingId}/wishlist`;

//                 const method = isLiked ? "DELETE" : "POST";

//                 const response = await fetch(url, {
//                     method,
//                     headers: {
//                         "Authorization": `Bearer ${token}`,
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ listingId }),
//                 });

//                 const data = await response.json();
//                 console.log("data", data);
//                 if (response.ok) {
//                     dispatch(setWishList(data));
//                     console.log(`Wishlist ${isLiked ? 'removed from' : 'updated with'}: `, data);
//                 } else {
//                     console.error(`Failed to ${isLiked ? 'remove from' : 'update'} wishlist:`, data);
//                 }
//             } catch (error) {
//                 console.error("Error in updateWishList:", error);
//             }
//         } else {
//             console.log("User is not allowed to modify wishlist");
//         }
//     };



//     return (
//         <div
//             className="relative w-[245px] flex flex-col text-wrap cursor-pointer bg-white rounded-md hover:border-none hover:shadow-lg"
//             onClick={() => {
//                 navigate(`/properties/${listingId}`);
//             }}
//         >
//             <div className="  rounded-t-md overflow-hidden ">
//                 {/* IMAGE SLIDER */}
//                 <div
//                     className="slider flex duration-75 transition-transform ease-in-out"
//                     style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//                 >
//                     {listingPhotoPaths?.map((photo, index) => (

//                         // IMAGE
//                         <div key={index} className="slide relative flex-[0_0_100%] w-[100%] h-[200px] items-center">
//                             <img
//                                 src={`${process.env.REACT_APP_BACKEND_URL}/${photo?.replace("public", "")}`}
//                                 alt={`slideImage ${index + 1}`}
//                                 className="w-full h-full object-cover filter brightness-90"
//                             />
//                             {/* PREVIOUS BUTTON */}
//                             <div
//                                 className="prev-button absolute top-1/2 left-1 transform -translate-y-1/2 bg-white/80 hover:bg-white font-extrabold text-slate-600 p-1 rounded-full cursor-pointer flex items-center justify-center z-10"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     goToPrevSlide(e);
//                                 }}
//                             >
//                                 <ArrowBackIosNew sx={{ fontSize: "12px"}} />
//                             </div>
//                             {/* NEXT BUTTON */}
//                             <div
//                                 className="next-button absolute top-1/2 right-1 transform -translate-y-1/2 bg-white/80 hover:bg-white font-extrabold text-slate-600 p-1 rounded-full  cursor-pointer flex items-center justify-center z-10"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     goToNextSlide(e);
//                                 }}
//                             >
//                                 <ArrowForwardIos sx={{ fontSize: "12px" }} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div id="info" className=" py-4 px-4 flex flex-col flex-grow justify-between items-between flex-wrap text-wrap">
//                 <div>
//                     <h3 className="font-bold  text-sm">
//                         {city}, {province}, {country}
//                     </h3>
//                     <p className="font-medium text-gray-900 text-xs">{category} <span className="px-0.5"> | </span> {type}</p>

//                 </div>
//                 <div className="flex justify-between items-end pt-4">
//                     <span>
//                     {!booking ? (
//                         <>
//                             {/* <p className="font-medium  text-sm text-slate-700">{type}</p> */}
//                             <p className="font-semibold text-sm">
//                                 <span className="font-bold text-md">${price}</span> per night
//                             </p>


//                         </>
//                     ) : (
//                         <>
//                             <p className="font-medium text-sm text-slate-700">
//                                 {startDate} - {endDate}
//                             </p>
//                             <p className="font-semibold text-sm">
//                                 <span className="font-bold text-md">${totalPrice}</span> total
//                             </p>
//                         </>
//                     )}
//                     </span>
//                     <Link className="text-xs text-semibold py-1.5 px-2 rounded-sm tracking-wide -mb-1 bg-gray-100  text-slate-700  " to={`/properties/${listingId}`}>
//                         Explore 
//                     </Link>
//                 </div>
//             </div>

//             <button
//                 className="favorite absolute drop-shadow-lg top-1 right-2 border-none text-lg cursor-pointer z-10 bg-none"
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     updateWishList();
//                 }}
//                // disabled={!user}
//             >
//                 {isLiked ? (
//                     <Favorite sx={{ color: "red" , fontSize : "20px"}} />
//                 ) : (
//                     <Favorite sx={{ color: "white" , fontSize : "20px"}} />
//                 )}
//             </button>
//         </div>
//     );
// };

// export default GCARD;