import React from 'react'
import Header2 from "../components/Header2"
import GSlider from "../components/GSLIDER"
import GCarousel from "../components/GCAROUSEL"
import GListings from "../components/GLISTINGS"
import GContact from "../components/GCONTACT"
import GFooter from "../components/GFOOTER"
import GTestimonial from "../components/GTESTIMONIAL"
//import GCurrency from "../components/GCURRENCY"
//import GSearch from "../components/GSEARCH"
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearError } from '../redux/state';
//import Offers from "./Offers"

const GHOME = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  //const user = useSelector(state => state.user);
  //const triplist = useSelector(state => state.user?.tripList);
 // const propertyList = useSelector(state => state.user?.propertyList);
  //console.log("user: ", user, "\ntriplist: ", triplist, "\npropertyList: ", user?.propertyList);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);


  return (
    <>
      <div className='relative bg-slate-100 '>

        <Header2/>
        <GSlider />
        <GCarousel />
        <div className={` bg-cover backdrop-opacity-10	bg-fixed bg-center h-screen w-[100%] bg-white flex justify-start items-center group `} style={{ backgroundImage: "url('https://img.freepik.com/free-photo/photorealistic-house-with-wooden-architecture-timber-structure_23-2151302742.jpg?size=626&ext=jpg&ga=GA1.1.932687991.1719332392&semt=ais_hybrid')" }}>
          <div className='h-full w-full md:w-1/2 flex flex-col justify-center items-center backdrop-blur-[3px] md:backdrop-blur-sm  bg-black/20 md:bg-black/40 px-2 md:px-10 lg:px-20 '>
            <h2 className="font-libre font-bold capitalize text-xl xs:text-2xl md:text-4xl mx-3 md:mx-8 md:my-8 text-white text-center drop-shadow-md tracking-wide group-hover:scale-110 duration-500 ">EXPLORE TOP CATEGORIES</h2>
            <p className="  text-gray-100 text-justify md:text-center text-xs xs:text-sm md:text-md drop-shadow-lg font-libre tracking-wider my-5 md:my-10 group-hover:scale-105 duration-500">Explore our wide range of vacation rentals that cater to all types of travelers. Immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination.</p>
          </div>
        </div>
        {/* <Offers/> */}
        <GListings />

        <div className={`bg-cover backdrop-opacity-10	bg-fixed bg-center h-screen w-[100%] bg-white flex justify-end items-center group `} style={{ backgroundImage: "url('https://img.freepik.com/free-photo/photorealistic-wooden-house-with-timber-structure_23-2151302660.jpg?size=626&ext=jpg&ga=GA1.1.932687991.1719332392&semt=ais_hybrid')" }}>
        {/* {console.log("error: ", error)}
        {error && <p className='font-bold bg-white text-red-700 text-xl' style={{ color: 'red' }}>{error}</p>} */}
          <div className='h-full w-full md:w-1/2 flex flex-col justify-center items-center backdrop-blur-[3px] md:backdrop-blur-sm  bg-black/20 md:bg-black/40 px-4 md:px-10 lg:px-20'>
            <h2 className="font-libre font-bold capitalize text-xl xs:text-2xl md:text-4xl m-8 text-white text-center drop-shadow-md tracking-wide group-hover:scale-110 duration-500 ">ESCAPE THE ORDINARY, TRAVEL EXTRAORDINARILY!</h2>
            <p className=" text-gray-100 text-justify md:text-center text-xs xs:text-sm md:text-md drop-shadow-lg font-libre tracking-wider my-5 md:my-10 group-hover:scale-105 duration-500">Embark on your dream adventure with our travel website, where personalized itineraries, exclusive deals, and expert insights come together to create unforgettable experiences. Whether you're seeking serene escapes or thrilling explorations, we make travel planning seamless and exciting. Discover your next destination and let us turn your wanderlust into reality.</p>
          </div>
        </div>
        


        
        <GTestimonial />
        <GContact />
        <GFooter />
      </div>


    </>
  )
}

export default GHOME