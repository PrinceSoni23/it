import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BiSolidCheckSquare } from "react-icons/bi";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { facilities } from '../data/data';
import { setLogin, setPropertyList } from '../redux/state';

const GCL2 = ({ formData, setFormData, setStep, id }) => {
  const [facilityDivs, setFacilityDivs] = useState(formData.facilityDivs || []);
  const [imgs, setImgs] = useState(formData.imgs || []);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const propertyLists = user.propertyList;
  console.log("propertyLists: ",propertyLists, "user", user);
  const [placeDesc, setPlaceDesc] = useState(formData.placeDesc || {
    title: "",
    description: "",
    highlight: "",
    h_description: "",
    price: 0
  });
  console.log("id", id);  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Facility Selection
  const handleFacilityClick = (name) => {
    if (facilityDivs.includes(name)) {
      setFacilityDivs(facilityDivs.filter(selectedName => selectedName !== name));
    } else {
      setFacilityDivs([...facilityDivs, name]);
    }
  };

  // Handle Image Upload
  const handleUploadImgs = (e) => {
    const newImgs = e.target.files;
    setImgs((prevImgs) => [...prevImgs, ...newImgs]);
  };

  // Handle Image Drag and Drop
  const handleDragImg = (result) => {
    if (!result.destination) return;
    const items = Array.from(imgs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImgs(items);
  };

  // Handle Image Removal
  const handleRemoveImg = (indexToRemove) => {
    setImgs((prevImgs) =>
      prevImgs.filter((_, index) => index !== indexToRemove)
    );
  };

  // Handle Place Description Change
  const handlePlaceDescChange = (e) => {
    const { name, value } = e.target;
    setPlaceDesc({
      ...placeDesc,
      [name]: value
    });
  };

const handlePost = async (e) => {
    e.preventDefault();
      setFormData({
      ...formData,
      facilityDivs,
      imgs,
      placeDesc
    });
  
    try {
      const formDataToSubmit = new FormData();
  
      // Append all the formData fields
      formDataToSubmit.append("category", formData.categDivs);
      formDataToSubmit.append("type", formData.type);
      formDataToSubmit.append("location", formData.location);
      formDataToSubmit.append("guests", formData.guests);
      formDataToSubmit.append("bedrooms", formData.bedrooms);
      formDataToSubmit.append("beds", formData.beds);
      formDataToSubmit.append("bathrooms", formData.bathrooms);
  
      // Append Step 2 fields
      formDataToSubmit.append("facilities", facilityDivs);
      formDataToSubmit.append("title", placeDesc.title);
      formDataToSubmit.append("description", placeDesc.description);
      formDataToSubmit.append("highlight", placeDesc.highlight);
      formDataToSubmit.append("highlightDesc", placeDesc.h_description);
      formDataToSubmit.append("price", placeDesc.price);
  
      // Append images to the formData
      imgs.forEach((photo) => {
        formDataToSubmit.append("listingPhotoPaths", photo);
      });
      console.log("formDataToSubmit",formDataToSubmit)
  
      /* Send a POST request to server */
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/listings/${id}/update-photos`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSubmit,
        credentials: 'include'
      });
  
      if (response.ok) {
        const newProperty = await response.json();
        dispatch(setPropertyList([
          ...propertyLists, 
          newProperty
        ]))
        const updatedHostResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/update-step`, {
          method: "PATCH",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              step: 1,
              listId: null
          })
        })
        if(updatedHostResponse.ok){
          const updatedHost = await updatedHostResponse.json();
          console.log("updateHost: ",updatedHost);
          dispatch (
              setLogin({
                user: updatedHost.data,
                token,
                modelType: "host",
              })
            )
            navigate("/payment");
            //CREATE-LISTING PAGE FINAL SUBMISSION ONLY AFTER GPAY.jsx PAGE - GTM
            //THEN POST REQUEST TO BACKEND
        }
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };
  
  return (
    <>
      <div className="py-4">
        <form onSubmit={handlePost}>
          {/* =================================== STEP 2 =================================== */}
          <div>
            <p className='text-slate-700 font-bold text-md sm:text-md md:text-lg lg:text-lg tracking-wider border-b border-slate-700 py-2 mt-8'>
              STEP 2 | MAKE YOUR PLACE STAND OUT
            </p>
            <div className="rounded-md bg-white py-4 px-2 sm:px-2 md:px-4 lg:px-6 mt-2 flex flex-col gap-4">

              <p className='font-semibold text-sm sm:text-sm md:text-md lg:text-lg text-justify px-1 sm:pl-2 md:pl-4 lg:pl-6 mt-4 lg:mt-6 text-slate-700'>
                Tell guests what your place has to offer.
              </p>
              <div className='flex flex-wrap gap-3 justify-center px-2 sm:px-6 md:px-10 lg:px-12'>
                {facilities?.map((facility, index) => (
                  <div key={index} className={`relative flex items-center justify-center h-[68px] w-[90px] md:h-20 md:w-28 p-2 rounded-lg cursor-pointer border hover:shadow ${facilityDivs.includes(facility.name) ? 'border border-slate-700 bg-gray-100/[0.5]' : ''}`} onClick={() => handleFacilityClick(facility.name)}>
                    <label htmlFor={facility.name} className={`flex flex-col items-center justify-center gap-2 cursor-pointer}`}>
                      <div className={`text-md sm:textlg lg:text-xl text-gray-700 cursor-pointer`}>
                        {facility.icon}
                      </div>
                      <p className={`text-[10px] sm:text-xs font-bold text-center text-gray-700 cursor-pointer`}>{facility.name}</p>
                    </label>
                    {facilityDivs.includes(facility.name) && (
                      <div className='absolute top-1 right-1'>
                        <BiSolidCheckSquare className='text-slate-700 h-5 w-5' />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className='font-semibold text-sm sm:text-sm md:text-md lg:text-lg text-justify px-1 sm:pl-2 md:pl-4 lg:pl-6 mt-4 lg:mt-6 text-slate-700'>
                Add some images of your place.
              </p>
              <div className='py-4 px-1 sm:px-6 md:px-10 flex items-center justify-center'>
                <DragDropContext onDragEnd={handleDragImg}>
                  <Droppable droppableId="photos" direction="horizontal">
                    {(provided) => (
                      <div id="photos" className="photos w-full h-full p-0 sm:p-1 lg:p-2 flex justify-around items-center" {...provided.droppableProps} ref={provided.innerRef}>
                        {imgs.length < 1 && (
                          <>
                            <input id="image" type="file" style={{ display: "none" }} accept="image/*" onChange={handleUploadImgs} multiple />
                            <label htmlFor="image" className="shadow-md p-2 text-gray-700 rounded flex flex-col justify-center items-center cursor-pointer hover:scale-105">
                              <div className="icon cursor-pointer">
                                <IoIosImages />
                              </div>
                              <p className='font-semibold cursor-pointer text-xs'>Upload from your device</p>
                            </label>
                          </>
                        )}

                        {imgs.length >= 1 && (
                          <>
                            {imgs.map((img, index) => (
                              <Draggable key={index} draggableId={index.toString()} index={index}>
                                {(provided) => (
                                  <div className="photo w-[135px] h-[80px] md:w-[250px] md:h-[170px] shadow-md" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <img src={URL.createObjectURL(img)} alt="place" />
                                    <button type="button" className='del_btn absolute top-0 right-0 p-1 bg-white hover:bg-slate-700 text-md cursor-pointer' onClick={() => handleRemoveImg(index)}>
                                      <BiTrash className='h-[13px] w-[13px] md:h-[16px] md:w-[16px] text-slate-700 hover:text-white font-bold' />
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            <input id="image" type="file" style={{ display: "none" }} accept="image/*" onChange={handleUploadImgs} multiple />
                            <label htmlFor="image" className="border border-slate-700 p-2 text-gray-700 rounded flex flex-col justify-center items-center cursor-pointer w-[135px] h-[80px] md:w-[250px] md:h-[170px]">
                              <div className="icon cursor-pointer">
                                <IoIosImages />
                              </div>
                              <p className='cursor-pointer font-semibold text-xs'>Add more images</p>
                            </label>
                          </>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>

              <p className='font-semibold text-sm sm:text-sm md:text-md lg:text-lg text-justify px-1 sm:pl-2 md:pl-4 lg:pl-6 mt-4 lg:mt-6 text-slate-700'>
                Add a title and description to your listing.
              </p>
              <div className='flex flex-col'>
                <div className="flex flex-col gap-3 p-2 sm:p-6">
                  <input type="text" className='rounded-sm outline-none px-2 py-1 border' placeholder='Title' name='title' value={placeDesc.title} onChange={handlePlaceDescChange} />
                  <input type="text" className='rounded-sm outline-none px-2 py-1 border' placeholder='Description (Minimum 200 words)' name='description' value={placeDesc.description} onChange={handlePlaceDescChange}  />
                  {/* <input type="text" className='rounded-sm outline-none px-2 py-1 border' placeholder='Highlight (optional)' name='highlight' value={placeDesc.highlight} onChange={handlePlaceDescChange} />
                  <input type="text" className='rounded-sm outline-none px-2 py-1 border' placeholder='Highlight Description (optional)' name='h_description' value={placeDesc.h_description} onChange={handlePlaceDescChange} /> */}
                </div>
              </div>

              <p className='font-semibold text-sm sm:text-sm md:text-md lg:text-lg text-justify px-1 sm:pl-2 md:pl-4 lg:pl-6 mt-4 lg:mt-6 text-slate-700'>
                Set a price for your place.
              </p>
              <div className='flex flex-col p-2 sm:p-6'>
                <input type="number" min={0} className='rounded-sm outline-none px-2 py-1 border' placeholder='Price per night in Rs.' name='price' value={placeDesc.price} onChange={handlePlaceDescChange} />
              </div>
            </div>

            {/* STEP 2 Next Buttons */}
            <div className="flex justify-between px-4 py-4">
              <button type="button" className="bg-slate-700 text-white py-2 px-3 rounded hover:bg-slate-800 transition duration-200" onClick={() => setStep(1)}>Go Back</button>
              <button type="submit" className="bg-slate-700 text-white py-2 px-3 rounded hover:bg-slate-800 transition duration-200">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default GCL2;
