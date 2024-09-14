import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({ label, down, options, onSelect }) => {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onSelect(option);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full flex flex-col justify-center">
      <label className="block text-slate-700 !text-[10px]  !sm:text-xs font-semibold tracking-wider font-libre mb-1">
        {label}
      </label>
      <div
        className="w-full border bg-white text-xs md:text-sm rounded px-2 md:px-3 py-2 font-libre font-bold capitalize"
        onClick={() => setOpen(!open)}
      >
        {selected}
      </div>
      {open && (
        <div
          className={`absolute bg-white border rounded w-full z-50 ${down ? "top-[100%] translate-y-1" : "bottom-[100%] -translate-y-1"}  shadow-md`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 text-sm border-b outline-none"
          />
          <ul className="max-h-32 overflow-y-scroll">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="p-1.5 text-sm hover:bg-gray-200 cursor-pointer"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-1.5 text-sm text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
