import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import GCL1 from '../components/GCL1';
import GCL2 from '../components/GCL2';
import Header from "../components/Header2"
import Footer from "../components/GFOOTER"
import { setLogin } from '../redux/state';

const CreateListing = () => {
    const [step, setStep] = useState(1);
    const [listId, setListId] = useState(null);
    const [formData, setFormData] = useState({
        _id: "",
        category: "",
        type: "",
        streetAddress: "",
        aptSuite: "",
        city: "",
        province: "",
        country: "",
        guestCount: "",
        bedroomCount: "",
        bedCount: "",
        bathroomCount: "",
        facilities: [],
        title: "",
        description: "",
        highlight: "",
        highlightDesc: "",
        price: "",
        listingPhotoPaths: [],
    });


    const user = useSelector((state) => state.user);
    const modelType = useSelector((state) => state.modelType);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    useEffect(() => {
        // Check if listId already exists in localStorage
        const savedListId = user.listId;
        // console.log('savedListId:', savedListId);
        if (savedListId) {
            setListId(savedListId);
            // Automatically redirect to step 2 if listing already exists
            setStep(2); // Replace '/step-2-url' with your actual Step 2 route
        }
    }, [user?.listId]);

    const handleNextStep = async () => {
        try {
            // Post Step1 data to the backend
            const listId = user?.listId;
            console.log('host listId:', listId);
            const url = listId 
                ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/listings/${listId}/update-details`
                : `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/listings`;

            const method = listId ? 'PATCH' : 'POST';
            const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                ,
                body: JSON.stringify({
                    category: formData.category,
                    type: formData.type,
                    streetAddress: formData.streetAddress,
                    aptSuite: formData.aptSuite,
                    city: formData.city,
                    province: formData.province,
                    country: formData.country,
                    guestCount: formData.guestCount,
                    bedroomCount: formData.bedroomCount,
                    bedCount: formData.bedCount,
                    bathroomCount: formData.bathroomCount,
                    facilities: formData.facilities,
                    title: formData.title,
                    description: formData.description,
                    highlight: formData.highlight,
                    highlightDesc: formData.highlightDesc,
                    price: formData.price,
                    listingPhotoPaths: formData.listingPhotoPaths,
                }),
            });

            // If successful, move to the next step
            if(response.ok){
                const listing = await response.json();
                setListId(listing.data._id);
                console.log("first step listing: ",listing);
                const updatedHostStep = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/update-step`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        listStep: 2,
                        listId: listing.data._id,
                    })
                })
                if (updatedHostStep.ok) {
                    const updatedHost = await updatedHostStep.json(); // Extract JSON data
                    console.log("updateHostStep: ", updatedHost);
                    
                    dispatch (
                        setLogin({
                          user: {...user, ...updatedHost.data},
                          token: token,
                          modelType: "host"
                        })
                    );
    
                    setStep(2);
                } else {
                    console.error("Failed to update host step");
                }
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <>
            <Header />
            {user && modelType === "host" ?
                <div className='pt-12 bg-gray-100/[0.8]'>
                    <div className='px-4 sm:px-4 md:px-8  lg:px-36  py-8  '>
                        <div className=" rounded-lg  flex flex-col  "> {/*MAIN CONTAINER*/}
                            <div className='font-bold  px-1.5 sm:px-2 md:px-2 lg:px-4 py-1 sm:py-1.5 md:py-2 lg:py-2 mb-4  h-10 sm:h-12 md:h-14 lg:h-14 text-lg sm:text-xl md:text-2xl lg:text-3xl w-full text-slate-700 text-center rounded-t-md tracking-wide '>
                                Publish Your Place Here
                            </div>

                            <div className="relative">
                                {step === 1 && (
                                    <GCL1
                                        formData={formData}
                                        setFormData={setFormData}
                                        handleNextStep={handleNextStep}
                                    />
                                )}
                                {step === 2 && (
                                    <GCL2
                                        formData={formData}
                                        setFormData={setFormData}
                                        setStep={setStep}
                                        id={listId}
                                        //CREATE-LISTING PAGE FINAL SUBMISSION ONLY AFTER GPAY.jsx PAGE - GTM
                                  />
                                )}
                            </div>
                        </div>
                    </div>
                </div> :
                //CAN USE TRAVELLING & EXPLORING QUOTES SOMEHWERE IN OUR PROEJCT - GTM
                //CAN MAKE THIS A SEPERATE COMPONENT "UNAUTHORIZED.jsx" - GTM
                
                 <div className="h-screen  bg-gradient-to-r from-slate-300 to-white flex justify-center items-center  tracking-wider text-lg">
                    Oops! You are not authorized to view this page. 
                    <Link to="/host_login" className=' text-blue-700 px-1 '> Login Here</Link>
                 </div>
            }
            <Footer />
        </>
    );
};

export default CreateListing;
