import React, { useState, useEffect } from 'react';
import l1 from "../assets/l1.jpg";
import l2 from "../assets/l2.jpg";
import GSEARCH from "./GSEARCH";

const images = [
  {
    src: l1,
    heading: 'BOOK TODAY WANDER TOMORROW',
    text: 'Experience luxury and comfort like never before.',
  },
  {
    src: l2,
    heading: 'FIND YOUR DREAM STAY',
    text: 'Discover stunning properties tailored to your needs.',
  }
];

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative overflow-hidden h-[100vh] sm:h-[100vh] md:h-[120vh]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
        >
          <img
            src={image.src}
            alt={image.heading}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-start pt-32 sm:pt-0 sm:justify-center items-center text-center text-white pb-10">
            <h2 className="text-2xl sm:text-6xl leading-[140%] tracking-[1.5px] px-7 sm:px-20 my-4 drop-shadow-2xl font-extrabold">
              {image.heading}
            </h2>
            <p className=" hidden sm:block md:block text-xl  font-medium tracking-wide drop-shadow-md">
              {image.text}
            </p>
          </div>
        </div>
      ))}



      {/* SEARCHBAR */}
      <GSEARCH className="absolute bottom-6 sm:bottom-0 left-0 right-0 mx-auto w-full max-w-6xl z-40" />
    </div>
  );
};

export default ImageSlider;


// import React, { useState, useEffect } from 'react';
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import l1 from "../assets/l1.jpg";
// import l2 from "../assets/l2.jpg";
// import GSEARCH from "./GSEARCH";


// const images = [
//   {
//     src: l1,
//     heading: 'BOOK TODAY WANDER TOMORROW',
//     text: 'Experience luxury and comfort like never before.',
//   },
//   {
//     src: l2,
//     heading: 'FIND YOUR DREAM STAY',
//     text: 'Discover stunning properties tailored to your needs.',
//   }
// ];

// const ImageSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [direction, setDirection] =useState('right');

//   const nextSlide = () => {
//     setDirection('right');
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setDirection('left');
//     setCurrentSlide((prevSlide) =>
//       prevSlide === 0 ? images.length - 1 : prevSlide - 1
//     );
//   };

//   useEffect(() => {
//     const slideInterval = setInterval(nextSlide, 5000);
//     return () => clearInterval(slideInterval);
//   }, []);

//   return (
//     <div className="relative overflow-hidden h-[100vh] sm:h-[95vh] md:h-[120vh] lg:h-[120vh] xl:h-[120vh]">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-transform duration-1000 ease-linear transform ${
//             index === currentSlide
//               ? 'translate-x-0 scale-100 opacity-100'
//               : direction === 'left'
//               ? '-translate-x-full scale-98 opacity-0'
//               : 'translate-x-full scale-102 opacity-0'
//           }`}
//         >
//           <img
//             src={image.src}
//             alt={image.heading}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/50 flex flex-col justify-start  sm:justify-center pt-24 sm:pt-0 items-center text-center text-white">
//             <h2 className="text-2xl sm:text-5xl text-white leading-[140%] tracking-[1.5px] px-7 sm:px-20 my-4 drop-shadow-2xl font-bold">
//               {image.heading}
//             </h2>
//             <p className="font-libre hidden sm:block md:block text-lg drop-shadow-md">
//               {image.text}
//             </p>
//           </div>
//         </div>
//       ))}

// <button
//   onClick={prevSlide}
//   className="absolute left-1 md:left-10 top-1/2 transform -translate-y-1/2 hover:bg-gray-50/20 text-white p-4 duration-1000 ease-out rounded-full z-30 hidden md:block"
// >
//   <FaChevronLeft className='text-4xl font-extrabold' />
// </button>
// <button
//   onClick={nextSlide}
//   className="absolute right-1 md:right-10 top-1/2 transform -translate-y-1/2 hover:bg-gray-50/20 text-white p-4 duration-1000 ease-out rounded-full z-30 hidden md:block"
// >
//   <FaChevronRight className='text-4xl font-extrabold' />
// </button>

//       {/* SEARCHBAR */}
//       <GSEARCH className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-4xl z-40" />
//     </div>
//   );
// };

// export default ImageSlider;
