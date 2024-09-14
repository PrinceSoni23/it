import React, { useState, useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import CRMHeader from './CRMHeader'
import Sidebar from './CRMSidebar'
import CRMError from './CRMError'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const Callback = () => {

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const modelType = useSelector((state) => state.modelType);
    const [status, setStatus] = useState('');

    const navigate = useNavigate();
    const currentPath = useLocation().pathname.split('/')[3];

    useEffect(() => {
        const statusFromPath = (path) => {
            switch (path) {
                case 'callback':
                    return 'Callback';
                case 'paid':
                    return 'Paid';
                case 'lang_barrier':
                    return 'Language Barrier';
                case 'no_interest':
                    return 'Not Interested';
                case 'DND':
                    return 'DND';
                case 'not_connected':
                    return 'Not Connected';
                default:
                    return '';
            }
        };
        setStatus(statusFromPath(currentPath));
    }, [currentPath]); 

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber:  useLocation().state?.phoneNumber || '',
        password: '',
        hostStatus: '',
        propertyURL: '',
        statusReason: '',
        callBackTime: '',
        work: '',
        company: '',
        languages: '',
        // isHost: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData.work);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("formData: ", formData);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/host-without-offer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Lead Registered!');
                //SEND EMAIL TO LEAD's EMAIL ID HAVING CREDETNIALS , CALLBACK TIME , etc - GTM
                navigate('/CRM/leads');
            } else {
                toast.error('Failed to create call back');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while registering lead.');
        }
    };

    return <>
        {user && modelType === "agent" ?
            <div>
                <CRMHeader />
                <Sidebar />
                <div className='  h-screen  bg-slate-50 ml-16 z-50'>
                    <div className="container w-full p-4">
                        <h1 className="text-3xl border-b text-center font-semibold mb-6 p-4"> Lead Registration</h1>
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
                                {/* -----LAST NAME----- */}
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
                                {/* -----EMAIL----- */}
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
                                {/* -----PHONE NUMBER----- */}
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
                                {/* -----PASSWORD----- */}
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
                                    <label htmlFor="propertyURL" className="mb-1 font-medium text-sm">Property URL</label>
                                    <input
                                        id="propertyURL"
                                        name="propertyURL"
                                        type="text"
                                        value={formData.propertyURL}
                                        onChange={handleChange}
                                        className="p-2 outline-none  border border-gray-300 rounded"
                                        placeholder="Enter property URL"
                                    />
                                </div>
                                {/* -------LANGUAGES-------new */}
                                <div className="flex flex-col">
                                    <label htmlFor="languages" className="mb-1 font-medium text-sm">Language</label>
                                    <select
                                        id="languages"
                                        name="languages"
                                        value={formData.languages}
                                        onChange={handleChange}
                                        className="h-full p-2 outline-none  border border-gray-300 rounded"
                                    >
                                        <option value="">Choose Language</option>
                                        <option value="English(US)">English(US)</option>
                                        <option value="English(UK)">English(UK)</option>
                                        <option value="French">French</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Spanish">Spanish</option>
                                    </select>
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
                                        <option value={`${status}`}>{status}</option>
                                    </select>
                                </div>
                                {/* ------- STATUS REASON ------- */}
                                <div className="flex flex-col">
                                    <label htmlFor="statusReason" className="mb-1 font-medium text-sm">Status Reason</label>
                                    <select
                                        id="statusReason"
                                        name="statusReason"
                                        value={formData.statusReason}
                                        onChange={handleChange}
                                        className="h-full p-2 outline-none border border-gray-300 rounded"
                                    >
                                        <option value="">Select Reason</option>
                                       { (status === "Not Interested") && <option value="Budget">Budget</option> }
                                       { (status === "DND") && <option value="Salesman pushy">Salesman pushy</option>}
                                       { (status === "Not Interested") && <option value="High Price">High Price</option>}
                                       { (status === "Not Interested") && <option value="Fully booked">Fully booked</option>}
                                       { (status === "Not Interested") &&<option value="Simply Not Interested">Simply Not Interested</option>}
                                       { (status === "Not Interested") &&  <option value="Wants Free Trial">Wants Free Trial</option>}
                                       { (status === "Not Interested") && <option value="Website Feedback">Website Feedback</option>}
                                       { (status === "DND") && <option value="Paid Customer">Paid Customer</option>}
                                        { (status === "Not Connected") &&<option value="Invalid Number">Invalid Number</option>}
                                        { (status === "Not Connected") &&<option value="Wrong Number">Wrong Number</option>}
                                        { (status === "Not Connected" || status==="Callback") && <option value="Phone Not Reachable">Phone Not Reachable</option>}
                                        { (status === "Not Connected") &&<option value="Answering Machine">Answering Machine</option>}
                                        {  (status === "Language Barrier") && <option value="Language Barrier">Language Barrier</option>}
                                        { (status === "Callback") &&<option value="Want to talk later">Want to talk later</option>}
                                    </select>
                                </div>

                                {/* -----CALLBACK TIME----- */}
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

                            </div>



                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-1.5  bg-slate-700 text-white  hover:bg-slate-800"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>


                </div>
            </div> :
            <CRMError modelType={modelType} />
        }
    </>
}

export default Callback

