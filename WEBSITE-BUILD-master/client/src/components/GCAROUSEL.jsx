import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import tour4 from "../assets/Carousel/Rome.jpg";
import tour5 from "../assets/Carousel/bali1.jpg";
import tour6 from "../assets/Carousel/Ams.jpg";
import tour7 from "../assets/Carousel/Paris.jpg";
import tour8 from "../assets/Carousel/Berlin.jpg";
import tour9 from "../assets/Carousel/madrid.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className} !bg-gray-800`}>
            <FaChevronLeft className="arrows" style={{ color: "white" }} />
        </div>
    );}

const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div onClick={onClick} className={`arrow ${className} !bg-gray-800`}>
            <FaChevronRight className="arrows" style={{ color: "white" }} />
        </div>
    );
}

const GCAROUSEL = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false,
                    autoplay: true,
                    prevArrow: false,
                    nextArrow: false,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,
                    prevArrow: false,
                    nextArrow: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoplay: true,
                    prevArrow: false,
                    nextArrow: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: false,
                    nextArrow: false,
                },
            },
        ],
    };

    const destinations = [
        { id: 0, name: "New York", tours: "5 tours and activities", image: tour5, link: "/tour", location: "New York" },
        { id: 1, name: "Rome", tours: "9 tours and activities", image: tour4, link: "/tour", location: "Rishikesh" },
        { id: 2, name: "Amsterdam", tours: "5 tours and activities", image: tour6, link: "/tour", location: "Mussoorie" },
        { id: 3, name: "Paris", tours: "4 tours and activities", image: tour7, link: "/tour", location: "Uttarkhashi" },
        { id: 4, name: "Berlin", tours: "9 tours and activities", image: tour8, link: "/tour", location: "Manali" },
        { id: 5, name: "Madrid", tours: "4 tours and activities", image: tour9, link: "/tour", location: "Haridwar" },
    ];

    return (
        <>
            <div className="w-full py-12 md:py-16 mt-0 flex flex-col items-center justify-center">
                <h2 className="font-libre font-bold capitalize text-3xl md:text-5xl px-3 md:px-1.5 text-center text-gray-600 mb-10">Top Destinations for you to visit</h2>
                <div className="w-full md:w-[90%] mx-auto px-7">
                    <Slider {...settings}>
                        {destinations.map((destination) => (
                            <div key={destination.id} className="relative !w-full md:!w-[240px] rounded-xl !shadow-md flex flex-col items-center justify-center overflow-hidden group">
                                <img src={destination.image} alt={destination.name} className="w-full h-100 object-cover z-40 group-hover:scale-110 duration-500" />
                                <h2 className="absolute top-0 z-50 text-xl px-4 font-libre font-bold capitalize mt-4 text-white drop-shadow-md">{destination.name}</h2>
                                <p className="absolute bottom-2 right-2 z-50 text-sm py-2 px-3 text-slate-700 bg-white font-libre font-bold capitalize rounded-md translate-x-80 group-hover:translate-x-0 duration-100">{destination.tours}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}

export default GCAROUSEL;
