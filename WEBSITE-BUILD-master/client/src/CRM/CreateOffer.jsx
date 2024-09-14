import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useSelector } from "react-redux";


import CRMHeader from './CRMHeader'
import Sidebar from './CRMSidebar'
import CRMError from './CRMError'


const CreateOffer = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const modelType = useSelector((state) => state.modelType);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        hostStatus: '',
        propertyURL: '',
        offerStatus: '',
        statusReason: '',
        expiryDate: '',
        callBackTime: '',
        membershipPlan: '',
        quantity: '',
        planDetail: '',
        price: '',
        work: '',
        company: '',
        languages: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, expiryDate: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/offers/create-offer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Offer created successfully!');
                // navigate('/success'); // Redirect on success
            } else {
                alert('Failed to create offer');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the offer');
        }
    };



    return (
        <>
            {user && modelType === "agent"
                ? <>
                    <div>
                        <CRMHeader />
                        <Sidebar />
                        <div className='  h-screen  bg-slate-50 ml-16 z-50'>
                            <div className="container w-full p-4 flex flex-col justify-center items-between">
                                <h1 className="text-3xl border-b   text-center font-semibold mb-4 p-4 ">Create Offer</h1>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-7 py-5">
                                        {/* ------ FIRST NAME , LAST NAME, EMAIL, PHONE NUMBER ----- */}
                                        <div className="flex flex-col">
                                            <label htmlFor="firstName" className="mb-1 font-medium text-sm ">First Name</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="lastName" className="mb-1 font-medium text-sm">Last Name</label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="email" className="mb-1 font-medium text-sm">Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="phoneNumber" className="mb-1 font-medium text-sm">Phone Number</label>
                                            <input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="number"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        {/* ------- PASSWORD, HOST STATUS, PROPERTY URL, OFFER STATUS ------ */}
                                        <div className="flex flex-col">
                                            <label htmlFor="password" className="mb-1 font-medium text-sm">Password</label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter password"
                                            />
                                        </div>
                                        {/* -------WORK------new*/}
                                        <div className="flex flex-col">
                                            <label htmlFor="work" className="mb-1 font-medium text-sm">Work</label>
                                            <input
                                                id="work"
                                                name="work"
                                                type="text"
                                                value={formData.work}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter your work"
                                            />
                                        </div>

                                        {/* ------COMPANY-----new*/}
                                        <div className="flex flex-col">
                                            <label htmlFor="company" className="mb-1 font-medium text-sm">Company</label>
                                            <select
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="h-full p-2 outline-none  border border-gray-300 rounded"
                                            >
                                                <option value="">Company</option>
                                                <option value="owner">Owner</option>
                                                <option value="manager">Manager</option>
                                                <option value="agency">Agency</option>
                                            </select>
                                        </div>

                                        {/* ----PROPERTY URL---- */}
                                        <div className="flex flex-col">
                                            <label htmlFor="propertyURL" className="mb-1 font-medium text-sm">Property </label>
                                            <input
                                                id="propertyURL"
                                                name="propertyURL"
                                                type="text"
                                                value={formData.propertyURL}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter property address/URL"
                                            />
                                        </div>

                                        {/* -------LANGUAGES-------new */}
                                        <div className="flex flex-col">
                                            <label htmlFor="languages" className="mb-1 font-medium text-sm">Languages</label>
                                            <input
                                                id="languages"
                                                name="languages"
                                                type="text"
                                                value={formData.languages}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter Languages"
                                            />
                                        </div>

                                        {/* ----HOST STATUS---- */}
                                        <div className="flex flex-col">
                                            <label htmlFor="hostStatus" className="mb-1 font-medium text-sm">Host Status</label>
                                            <select
                                                id="hostStatus"
                                                name="hostStatus"
                                                value={formData.hostStatus}
                                                onChange={handleChange}
                                                className="h-full p-2 outline-none  border border-gray-300 rounded"
                                            >
                                                <option value="">Select Host Status</option>
                                                <option value="Ok to send offer">Offer Sent</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="offerStatus" className="mb-1 font-medium text-sm">Offer Status</label>
                                            <select
                                                id="offerStatus"
                                                name="offerStatus"
                                                value={formData.offerStatus}
                                                onChange={handleChange}
                                                className="h-full p-2 outline-none  border border-gray-300 rounded"
                                            >
                                                <option value="">Select Offer Status</option>
                                                <option value="paid">Paid</option>
                                                <option value="pending">Pending</option>
                                                <option value="expired">Expired</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>
                                        {/* ------- STATUS REASON, EXPIRY DATE, CALLBACK TIME, MEMBERSHIP PLAN ------- */}
                                        <div className="flex flex-col">
                                            <label htmlFor="statusReason" className="mb-1 font-medium text-sm">Status Reason</label>
                                            <input
                                                id="statusReason"
                                                name="statusReason"
                                                type="text"
                                                value={formData.statusReason}
                                                onChange={handleChange}
                                                className="h-full w-full p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter status reason"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="expiryDate" className="mb-1 font-medium text-sm">Expiry Date</label>
                                            <input
                                                id="expiryDate"
                                                name="expiryDate"
                                                type="date"
                                                value={formData.expiryDate}
                                                onChange={(e) => handleDateChange(e.target.value)}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="callBackTime" className="mb-1 font-medium text-sm">Callback Time</label>
                                            <div className="flex flex-col space-y-2 h-full" >
                                                <DatePicker
                                                    selected={formData.callBackTime ? new Date(formData.callBackTime) : null}
                                                    onChange={(date) => setFormData({ ...formData, callBackTime: date })}
                                                    showTimeSelect
                                                    dateFormat="Pp"
                                                    className="!h-full w-full px-2 py-3 outline-none  border border-gray-300 rounded"
                                                    placeholderText="Select date and time"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="membershipPlan" className="mb-1 font-medium text-sm">Membership Plan</label>
                                            <select
                                                id="membershipPlan"
                                                name="membershipPlan"
                                                value={formData.membershipPlan}
                                                onChange={handleChange}
                                                className="h-full p-2 outline-none  border border-gray-300 rounded"
                                            >
                                                <option value="" className='!text-gray-300'>Select Membership Plan</option>
                                                <option value="basic">Basic</option>
                                                <option value="premium">Premium</option>
                                                <option value="enterprise">Enterprise</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 py-4 border-t">
                                        <div className="flex flex-col">
                                            <label htmlFor="quantity" className="mb-1 font-medium text-sm">Quantity</label>
                                            <input
                                                id="quantity"
                                                name="quantity"
                                                type="number"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter quantity"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="planDetail" className="mb-1 font-medium text-sm">Plan Detail</label>
                                            <input
                                                id="planDetail"
                                                name="planDetail"
                                                type="text"
                                                value={formData.planDetail}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter plan detail"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="price" className="mb-1 font-medium text-sm">Price</label>
                                            <input
                                                id="price"
                                                name="price"
                                                type="number"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="p-2 outline-none  border border-gray-300 rounded"
                                                placeholder="Enter price"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <button
                                            type="submit"
                                            className="px-6 py-2  bg-slate-700 text-white  hover:bg-slate-800"
                                        >
                                            SEND
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </>
                : <CRMError model={modelType} />
            }
        </>
    )
}

export default CreateOffer