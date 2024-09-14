import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import logo1 from "../assets/logo1.png";


const GFOOTER = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <>
      <footer className="bg-[#f1f5f9] text-black py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap text-sm">
            <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
              <Link to="/">
              <img src= {logo1} alt="logo" className="w-52 sm:w-52" />
                            </Link>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
              <h4 className="text-lg font-libre mb-3">Company</h4>
              <ul>
                <li className="mb-1">
                  <Link to="/about" className="hover:text-gray-400">
                    About Us
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/Cp" className="hover:text-gray-400">
                    Cancellation Policies
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/FAQ" className="hover:text-gray-400">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
              <h4 className="text-lg font-libre mb-3">Explore</h4>
              <ul>
                <li className="mb-1">
                  <Link to="/Offer" className="hover:text-gray-400">
                    Offers
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/TC" className="hover:text-gray-400">
                    Terms And Conditions
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/It" className="hover:text-gray-400">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
              <h4 className="text-lg font-libre mb-3">Contact Info</h4>
              <p className="mb-1">202 Al Wasl Road, Jumeirah 1, Dubai, UAE</p>
              <p className="mb-1 flex items-center">
                <a href="mailto:dummy123@gmail.com" className="hover:text-gray-400">
                  info@tripittoday.com
                </a>
              </p>
              {/* <Link to="/CRM" className="hover:text-gray-400">
                CRM
              </Link> */}
              <img src="/assets/payment.png" alt="payment" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 font-libre font-bold capitalize mt-3 pt-3 text-center text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} TripItToday. All rights reserved.
        </div>
      </footer>

      <div
        id="back-top"
        onClick={scrollTop}
        className={`fixed bottom-3 right-3 p-2 bg-gray-800 text-white font-extrabold h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center rounded-full cursor-pointer ${visible ? "block" : "hidden"
          }`}
      >
        <FaChevronUp />
      </div>
    </>
  );
};

export default GFOOTER;
