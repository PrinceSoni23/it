
import { useEffect, useState, useCallback } from "react";
import { categories } from "../data/data";
import GCard from "./GCARD";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
const Listings = () => {
//    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const token = useSelector((state) => state.token);

    const [selectedCategory, setSelectedCategory] = useState("All");

    const listings = useSelector((state) => state.listings);

    const getFeedListings = useCallback(async () => {
        try {
            const response = await fetch(selectedCategory !== 'All'
                ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/properties/category/${selectedCategory}`
                : `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/listings?page=${page}&limit=5`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include token in the Authorization header
                    },
                    credentials: "include"
                }
            );

            const data = await response.json();
            //console.log("category",selectedCategory,"\ndata: ", data);
            if(selectedCategory === 'All'){
                dispatch(setListings({ listings: data?.listings }));
            }else{
                dispatch(setListings({ listings: data?.data }));
            }
            //console.log("listings: ", listings);
            setLoading(false);
        } catch (err) {
            console.log("Fetch Listings Failed", err.message);
        }
    }, [selectedCategory, page, token, dispatch]);

    
     const handleMore = (x) => {
        setPage(x);
         };

    useEffect(() => {
        getFeedListings();
    }, [getFeedListings]);

    return (
        <>

            <div className="category-list p-6 md:p-16 flex flex-col justify-center flex-wrap  gap-3 sm:gap-5">

                <div className="w-full">
                    <h2 className="font-libre text-center font-bold capitalize text-4xl my-2 text-gray-600 ">Your Dream Stay Awaits</h2>
                    <p className="font-libre  text-gray-500 text-md md:text-lg  tracking-wide">Effortless Planning, Unmatched Vibes. Explore Diverse Destinations, From Beachfront Bliss to Desert.</p>
                </div>
                <br />
                <div className="flex -mx-4 -my-2 md:-mx-0 md:-my-0 md:px-2 py-4 flex-wrap justify-center gap-2 md:gap-4 ">
                    {categories?.map((category, index) => (
                        <div
                            className={`rounded px-2 py-1 gap-x-2 sm:gap-x-3 flex items-center text-slate-600 bg-white/60 hover:bg-white/80 duration-200 cursor-pointer ${category.label === selectedCategory ? "selected !bg-gray-600 !text-white" : ""}`}
                            key={index}
                            onClick={() => setSelectedCategory(category?.label)}
                        >
                            <div className="category_icon text-sm  sm:text-md">{category?.icon}</div>
                            <p className="text-xs sm:text-sm font-libre font-bold capitalize">{category?.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : ( <>
                <div className="relative listings flex justify-center gap-y-4 md:gap-y-7 gap-x-8 md:gap-x-16 flex-wrap font-libre font-bold capitalize pb-10 md:pb-20 mx-auto md:mx-40">
                    {listings?.map(
                        ({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (

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

                <div className="absolute bottom-2  duration-300 ease  flex items-center justify-center w-full gap-4 ">             
                    <button className="mt-6 h-5 w-5 bg-white text-slate-800 text-xs font-extrabold shadow-md outline-none" onClick={()=>handleMore(1)}>
                     1
                 </button>
                    <button className="mt-6 h-5 w-5 bg-white text-slate-800 text-xs font-extrabold shadow-md outline-none" onClick={()=>handleMore(2)}>
                     2
                 </button>
                    <button className="mt-6 h-5 w-5 bg-white text-slate-800 text-xs font-extrabold shadow-md outline-none" onClick={()=>handleMore(3)}>
                     3
                 </button>
                
             </div>
                </div>
           </> )
           }
        </>
    );
};

export default Listings;
// import { useEffect, useState, useCallback } from "react";
// import { categories } from "../data/data";
// import GCard from "./GCARD";
// import Loader from "./Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { setListings } from "../redux/state";
// import { useNavigate } from "react-router-dom";

// const Listings = () => {
//     //const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
//     // console.log("backend url", `${BACKEND_URL}/api/v1/hosts/properties`);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const token = useSelector((state) => state.token);

//     const [selectedCategory, setSelectedCategory] = useState("All");

//     const listings = useSelector((state) => state.listings);
//     //const limitListings = listings.slice(0,4);

//     // console.log("backend url", BACKEND_URL);
//     const getFeedListings = useCallback(async () => {
//         try {
//             const response = await fetch(selectedCategory !== 'All'
//                 ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/properties/category/${selectedCategory}`
//                 : `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/listings?page=1&limit=5`,
//                 {
//                     method: "GET",
//                     headers: {
//                         "Authorization": `Bearer ${token}`, // Include token in the Authorization header
//                     },
//                     credentials: "include"
//                 }
//             );
//             console.log("response: ", response);

//             const data = await response.json();
//             console.log("listings: ", data.data);
//             // console.log("data: ", data.data[0].listingPhotoPaths);
//             dispatch(setListings({ listings: data.data }));
//             setLoading(false);
//         } catch (err) {
//             console.log("Fetch Listings Failed", err.message);
//         }
//     }, [selectedCategory, /*BACKEND_URL*/ dispatch]);

//     useEffect(() => {
//         getFeedListings();
//     }, [getFeedListings]);

//     const handleAll = () => {
//         navigate("/all-listings");
//     };

//     return (
//         <>

//             <div className="category-list p-6 md:p-16 flex flex-col justify-center flex-wrap  gap-3 sm:gap-5">

//                 <div className="w-full">
//                     <h2 className="font-bold text-4xl my-2 text-gray-600 ">Your Dream Stay Awaits</h2>
//                     <p className="font-medium text-gray-500 text-md md:text-lg  tracking-wide">Effortless Planning, Unmatched Vibes. Explore Diverse Destinations, From Beachfront Bliss to Desert Serenity.</p>
//                 </div>
//                 <br />
//                 <div className="flex -mx-4 -my-2 md:-mx-0 md:-my-0 md:px-2 py-5 flex-wrap justify-center gap-2 md:gap-4 ">
//                     {categories?.map((category, index) => (
//                         <div
//                             className={`rounded px-2 py-1 gap-x-2 sm:gap-x-3 flex items-center text-slate-600 bg-white/60 hover:bg-white/80 duration-200 cursor-pointer ${category.label === selectedCategory ? "selected !bg-gray-600 !text-white" : ""}`}
//                             key={index}
//                             onClick={() => setSelectedCategory(category.label)}
//                         >
//                             <div className="category_icon text-sm  sm:text-md">{category.icon}</div>
//                             <p className="text-xs sm:text-sm text-bold">{category.label}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {loading ? (
//                 <Loader />
//             ) : (
//                 <div className="relative group  listings flex justify-center gap-y-4 md:gap-y-8 gap-x-6 md:gap-x-12 flex-wrap  pb-10 md:pb-14 my-10 mx-16 md:mx-24 overflow-hidden">
//                     {listings?.map(
//                         ({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (

//                             <GCard
//                                 listingId={_id}
//                                 creator={creator}
//                                 listingPhotoPaths={listingPhotoPaths}
//                                 city={city}
//                                 province={province}
//                                 country={country}
//                                 category={category}
//                                 type={type}
//                                 price={price}
//                                 booking={booking}
//                             />
//                         )
//                     )}
//                      <div className="absolute translate-y-28 group-hover:translate-y-0 -bottom-4 duration-300 ease  flex justify-center w-full py-3">
//                 <button
//                     className="mt-6 bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 "
//                     onClick={handleAll}
//                 >
//                     Show All Listings
//                 </button>
//             </div>
//                 </div>
//             )}

           
//         </>
//     );
// };

// export default Listings;
