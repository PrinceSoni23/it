import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GDROPDOWN from "./GDROPDOWN";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import react-toastify CSS

const GSearch = ({ className, down }) => {
  const [startDate, setStartDate] = useState(null);  
  const [endDate, setEndDate] = useState(null);  
  const [city, setCity] = useState("Select City");  // Default value
  const [guest, setGuest] = useState("Select Guests");  // Default value
  const navigate = useNavigate();

  const selectedCity = (value) => {
    setCity(value);
  };

  const selectedGuest = (value) => {
    setGuest(value);
  };

  const handleSubmit = async () => {
    if (city === "Select City" ||guest === "Select Guests" || !startDate || !endDate) {
      toast.error("Please fill in all fields before searching.");
      return;
    }
    if(startDate >= endDate){
      toast.error("Check out date should be greater than check in date.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/available-properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          checkIn: startDate.toISOString(),
          checkOut: endDate.toISOString(),
          city
        })
      });

      if (response.ok) {
        const { data } = await response.json();
        //console.log("data of search: ", data);
        navigate("/all-listings", { state: { data } });
      }
    } catch (error) {
      toast.error("An error occurred while fetching data.", error);
    }
  };

  return (
    <div >
      <section
        className={`px-6 sm:px-4 py-4  ${className}`}
      >
        <div className="relative w-full bg-white p-4  flex justify-center items-center rounded-md mx-auto  ">
          <div className="grid w-full  grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-5">
            <div className=" item-search ">
              <GDROPDOWN
                label="Location"
                down={down}
                onSelect={selectedCity}
                options={[
                  "Select City",
                  "Paris",
                  "Rome",
                  "Madrid",
                  "Berlin",
                  "Amsterdam",
                  "Lucknow"
                ]}
              />
            </div>
            <div className="item-search ">
              <label className="block  text-slate-700 !text-[10px]  !sm:text-xs tracking-wider font-semibold font-libre mb-1">
                Check in
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd, MMMM, yyyy"
                className="w-full border bg-white placeholder:text-black text-black outline-none text-xs md:text-sm rounded px-2 md:px-3 py-2 font-libre font-bold "
                placeholderText="Select check-in date" 
                wrapperClassName="w-full text-black outline-none"
              />
            </div>
            <div className="item-search">
              <label className="block text-slate-700 !text-[10px]  !sm:text-xs tracking-wider font-semibold font-libre mb-1">
                Check Out
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd, MMMM, yyyy"
                className="w-full border bg-white placeholder:text-black text-black outline-none text-xs md:text-sm rounded px-2 md:px-3 py-2 font-libre font-bold "
                placeholderText="Select check-out date"  
                wrapperClassName="w-full " 
              />
            </div>
            <div className="item-search">
              <GDROPDOWN
                label="Guest"
                onSelect={selectedGuest}
                down={down}
                options={[
                  "Select Guests",
                  "2 adults, 1 child",
                  "2 adults, 2 children",
                  "2 adults, 3 children",
                ]}
              />
            </div>
            <div className="flex  items-center justify-center sm:col-span-2 lg:col-span-1 mt-5 ">
              <button
                className="bg-slate-700 text-white !text-sm !md:text-md tracking-wider font-bold rounded w-full p-2 md:p-2 hover:bg-slate-800"
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
        
        </div>
      </section>
    </div>
  );
};

export default GSearch;
