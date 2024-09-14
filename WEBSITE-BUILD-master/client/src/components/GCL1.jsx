import { useState, useEffect } from 'react';
import { BiSolidCheckSquare } from "react-icons/bi";
import { categories, types } from '../data/data';
import Counter from './Counter';

const GCL1 = ({ formData, setFormData, handleNextStep }) => {
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { category, type, streetAddress,  city, province, country, guestCount, bedroomCount, bedCount, bathroomCount } = formData;
        // Check if all required fields are filled out
        const allFieldsFilled = category.length > 0 && type && streetAddress && city && province && country && guestCount !== undefined && bedroomCount !== undefined && bedCount !== undefined && bathroomCount !== undefined;
        setIsFormValid(allFieldsFilled);
    }, [formData]);

    const [categDivs, setCategDivs] = useState( formData.category[0] || "");
    const [typesDivs, setTypesDivs] = useState(formData.type || "");

    const handleCatgClick = (label) => {
        let updatedCategDivs;

        if (label === 'All') {
            if (categDivs.length === categories.length - 1) {
                updatedCategDivs = [];
            } else {
                updatedCategDivs = categories.slice(1).map(cat => cat.label);
            }
        } else {
            if (categDivs.includes(label)) {
                updatedCategDivs = categDivs.filter(selectedLabel => selectedLabel !== label);
            } else {
                updatedCategDivs = [...categDivs, label];
            }
        }

        setCategDivs(updatedCategDivs);

        setFormData({
            ...formData,
            category: updatedCategDivs
        });
    };

    const handleTypeClick = (name) => {
        const updatedType = typesDivs === name ? '' : name;
        setTypesDivs(updatedType);

        setFormData({
            ...formData,
            type: updatedType
        });
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        const updatedLocationInfo = {
            ...formData,
            [name]: value
        };
        setFormData(updatedLocationInfo);
    };

    const countGuests = (val) => {
        setFormData({
            ...formData,
            guestCount: val
        });
    };

    const countBedrooms = (val) => {
        setFormData({
            ...formData,
            bedroomCount: val
        });
    };

    const countBeds = (val) => {
        setFormData({
            ...formData,
            bedCount: val
        });
    };

    const countBathrooms = (val) => {
        setFormData({
            ...formData,
            bathroomCount: val
        });
    };

    return (
        <>

            <div className="py-4">

                <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} >
                    <div>
                        <p className='text-slate-700 font-bold text-md sm:text-md md:text-lg lg:text-lg tracking-wider border-b border-slate-700 py-2  '>STEP 1  |  TELL US ABOUT YOUR PLACE</p>
                        <div className="rounded-md bg-white/20 py-4 px-2 sm:px-2 md:px-4 lg:px-6 mt-2 flex flex-col gap-4 ">
                            <p className='font-semibold text-sm sm:text-sm md:text-md lg:text-lg text-justify px-1 sm:pl-2 md:pl-4 lg:pl-6 mt-4 lg:mt-6 text-slate-700'>Which of the following categories best describes your place ?</p>

                            <div className='flex flex-wrap gap-3 justify-center px-4 sm:px-6 md:px-10 lg:px-12'>
                                {categories?.map((category, index) => (
                                    <div key={index} className={`relative flex items-center justify-center h-16 w-20 lg:h-20 lg:w-24 p-1.5 rounded-lg cursor-pointer border hover:shadow-md ${categDivs.includes(category.label) ? 'border-2 border-slate-700 ' : ''}`} onClick={() => handleCatgClick(category.label)}>
                                        <label htmlFor={category.label} className={`flex flex-col items-center justify-center gap-2 cursor-pointer`}>
                                            <div className={`text-xl text-gray-700 cursor-pointer`}>
                                                {category.icon}
                                            </div>
                                            <p className={`text-xs font-semibold md:font-bold lg:font-bold text-center text-gray-700 cursor-pointer ${index === 0 ? 'text-slate-700' : ''}`}>{category.label}</p>
                                        </label>

                                        {categDivs.includes(category.label) &&
                                            <div className='absolute top-1 right-1'>
                                                <BiSolidCheckSquare className='text-slate-700 h-5 w-5' />
                                            </div>}
                                    </div>
                                ))}
                            </div>

                            <p className='font-semibold text-sm sm:text-sm md:text-md lg:text-lg text-justify px-1 sm:pl-2 md:pl-4 lg:pl-6 mt-4 lg:mt-6 text-slate-700'>What type of place will guests have ?</p>
                            <div className='flex flex-col items-center px-2 md:px-6 lg:px-8 mt-4 gap-4'>
                                {types?.map((type, index) => (
                                    <div className={`border rounded-md w-[300px] sm:w-[400px] md:w-[500px] lg:w-[650px] bg-gray-100/[0.3] hover:border-slate-700 flex items-center gap-2 md:gap-4 p-3 md:p-2 cursor-pointer hover:shadow-md ${typesDivs === type.name ? 'bg-white  border-slate-700' : ''}`} key={index} onClick={() => handleTypeClick(type.name)}>
                                        <div className='text-xl h-12 flex items-center justify-center px-2.5 sm:px-3 md:px-4 lg:px-6 text-gray-700 cursor-pointer'>
                                            {type.icon}
                                        </div>
                                        <div className='flex flex-col h-12 items-start justify-center'>
                                            <p className='font-bold text-slate-700 text-xs md:text-sm lg:text-sm tracking-wider cursor-pointer'>{type.name}</p>
                                            <p className='font-medium text-xs text-justify md:text-sm lg:text-sm text-gray-700 cursor-pointer'>{type.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className='font-semibold text-sm sm:text-sm md:text-md lg:text-lg text-justify px-1 sm:pl-2 md:pl-4 lg:pl-6 mt-4 lg:mt-6 text-slate-700'>Where's your place located ?</p>
                            <div className='flex flex-col py-4 px-2 sm:px-16 md:px-20 lg:px-24 gap-4'>
                                <label htmlFor="street" className='flex flex-col text-sm sm:text-sm md:text-md lg:text-md font-semibold text-gray-700 tracking-wide'>
                                    Street Address
                                    <input type="text" className='border focus:border-slate-700 outline-none py-1.5 px-3 rounded-md' name="streetAddress" value={formData.streetAddress} onChange={handleLocationChange} />
                                </label>

                                <div className='flex flex-col lg:flex-row justify-between gap-2'>
                                    <label htmlFor="aptSuite" className='flex flex-col text-sm sm:text-sm md:text-md lg:text-md w-full font-semibold text-gray-700 tracking-wide'>
                                       <span> Apartment, Suite, etc. <span className='text-[10px] p-0'>(If applicable)</span></span>
                                        <input type="text" className='border focus:border-slate-700 outline-none py-1.5 px-3 rounded-md' name="aptSuite" value={formData.aptSuite} onChange={handleLocationChange} />
                                    </label>
                                    <label htmlFor="city" className='flex flex-col text-sm sm:text-sm md:text-md lg:text-md w-full font-semibold text-gray-700 tracking-wide'>
                                        City
                                        <input type="text" className='border focus:border-slate-700 outline-none py-1.5 px-3 rounded-md' name="city" value={formData.city} onChange={handleLocationChange} />
                                    </label>
                                </div>

                                <div className='flex flex-col lg:flex-row justify-between gap-2'>
                                    <label htmlFor="province" className='flex flex-col text-sm sm:text-sm md:text-md lg:text-md w-full font-semibold text-gray-700 tracking-wide'>
                                        State / Province
                                        <input type="text" className='border focus:border-slate-700 outline-none py-1.5 px-3 rounded-md' name="province" value={formData.province} onChange={handleLocationChange} />
                                    </label>
                                    <label htmlFor="country" className='flex flex-col text-sm sm:text-sm md:text-md lg:text-md w-full font-semibold text-gray-700 tracking-wide'>
                                        Country / Region
                                        <input type="text" className='border focus:border-slate-700 outline-none py-1.5 px-3 rounded-md' name="country" value={formData.country} onChange={handleLocationChange} />
                                    </label>
                                </div>
                            </div>

                            <p className='font-semibold text-sm sm:text-sm md:text-md lg:text-lg text-justify px-1 sm:pl-2 md:pl-4 lg:pl-6 mt-4 lg:mt-6 text-slate-700'>How many guests would you like to welcome?</p>
                            <div className='flex flex-col md:flex-row items-center justify-center gap-x-3 mt-4'>
                                <Counter For="Guests" store_val={countGuests} />
                                <Counter For="Bedrooms" store_val={countBedrooms} />
                                <Counter For="Beds" store_val={countBeds} />
                                <Counter For="Bathrooms" store_val={countBathrooms} />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center items-center py-6 md:py-10'>

                        <button className={`text-white bg-slate-700 border border-slate-700 hover:bg-white hover:text-slate-700 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2.5 text-center ${isFormValid ? '' : 'cursor-not-allowed opacity-50'}`} disabled={!isFormValid}>Next</button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default GCL1;
