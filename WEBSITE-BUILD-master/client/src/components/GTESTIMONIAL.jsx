import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image2 from "../assets/Slider/1.jpg";
import image3 from "../assets/Slider/2.jpg";
import image4 from "../assets/Slider/3.jpg";
import image5 from "../assets/Slider/4.jpg";
import image6 from "../assets/Slider/5.jpg";
import image7 from "../assets/Slider/6.jpg";
import image8 from "../assets/Slider/7.jpg";
// import image1 from "../assets/Slider/8.jpg";

const testimonials = [
  {
    name: "Olivia Martinez",
    text: "The property was amazing! The stay was comfortable and the location was perfect.",
    image: image2, // Add a path to the testimonial image if available
  },
  {
    name: "Emily Johnson",
    text: "Excellent service and wonderful experience. Highly recommended!",
    image: image3, // Add a path to the testimonial image if available
  },
  {
    name: "John Doe",
    text: "A wonderful experience from start to finish. The attention to detail was impressive.",
    image: image4, // Add a path to the testimonial image if available
  },
  {
    name: "Emily White",
    text: "Fantastic stay! The property was clean, well-maintained, and the amenities were top-notch.",
    image: image5, // Add a path to the testimonial image if available
  },
  {
    name: "Sophia Davis",
    text: "I had a great time. The staff was friendly, and the location was perfect for exploring the area.",
    image: image6, // Add a path to the testimonial image if available
  },
  {
    name: "James Wilson",
    text: "Highly recommended for anyone looking for a comfortable and enjoyable stay.",
    image: image7, // Add a path to the testimonial image if available
  },
  {
    name: "James Smith",
    text: "A beautiful property with excellent service. I will definitely be coming back!",
    image: image8, // Add a path to the testimonial image if available
  },
  // {
  //   name: "Liam Garcia",
  //   text: "The perfect getaway. Everything was as described and exceeded my expectations.",
  //   image: image1, // Add a path to the testimonial image if available
  // },
];

function App()  {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // For tablets and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 600, // For mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  };

  return (
    <div className="w-3/4 m-auto py-10">
      <h2 className="text-3xl font-bold text-slate-800 text-center mb-5">What Our Guests Say</h2>
      <p className="text-center text-slate-700 text-20px md:text-md">
        Hear directly from our guests about their experiences and why they love staying with us.
      </p>
      <div className="mt-5">
        <Slider {...settings}>
          {testimonials.map((d) => (
            <div key={d.name} className="bg-white h-[340px] text-black rounded-xl">
              <div className="h-40 bg-slate-300 flex justify-center items-center rounded-t-xl">
                <img src={d.image} alt="" className="h-32 w-32 rounded-full" />
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-xl font-semibold">{d.name}</p>
                <p className="text-center">{d.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default App;
