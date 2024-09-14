import { useState, useEffect, useCallback } from 'react';
import CRMHeader from './CRMHeader';
import Sidebar from './CRMSidebar';
import { useParams } from 'react-router-dom';
import Loader from "../components/Loader";
import moment from 'moment';

const LeadDetails = () => {
    const [loading, setLoading] = useState(true);
    const [host, setHost] = useState(null);
    const { hostId } = useParams();

    const getHostDetails = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/hosts/get-host/${hostId}`,
                {
                    method: "GET",
                }
            );

            const data = await response.json();
            console.log("(LeadDetails.jsx)Host Details - ", data);
            setHost(data.data);
            setLoading(false);
        } catch (err) {
            console.log("Fetch Host Details Failed", err.message);
        }
    }, [hostId])

    useEffect(() => {
        getHostDetails();
    }, [getHostDetails]);

    if (loading) {
        return <Loader />;
    }

    const handleStatusChange = (event) => {
        const updatedStatus = event.target.value;
        setHost({ ...host, hostStatus: updatedStatus });
    };

    return (
        <>
            <CRMHeader />
            <Sidebar />
            <div className='main-container h-screen bg-slate-100 ml-16 p-6'>
                <div className="bg-white p-8 rounded-lg shadow-md relative">
                    <span className="absolute top-4 right-4 text-sm text-slate-700 font-semibold">
                        Lead assigned to Agent ID : <span className={`text-rose-500`}> {host?.agentId}</span>
                    </span>

                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Lead Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700 mb-8">
                        <div className="p-4 border rounded-lg shadow-sm">
                            <span className="block font-semibold text-slate-900 text-xs">Name</span>
                            <span className="text-slate-800 text-sm font-semibold">{host?.firstName} {host?.lastName}</span>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <span className="block font-semibold text-slate-900 text-xs">Phone</span>
                            <span className="text-slate-800 text-sm font-semibold">{host?.phoneNumber}</span>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <span className="block font-semibold text-slate-900 text-xs">Email</span>
                            <span className="text-slate-800 text-sm font-semibold">{host?.email}</span>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <span className="block font-semibold text-slate-900 text-xs">Languages</span>
                            <span className="text-slate-800 text-sm font-semibold">{host?.languages?.split(',').map(lang => lang.trim()).join('; ')}</span>
                        </div>
                    </div>

                    {/* Detailed Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700 mb-8">
                        <div className="p-4 border rounded-lg shadow-sm">
                            <span className="block font-semibold text-slate-900 text-xs">Work</span>
                            <span className="text-slate-800 text-sm font-semibold">{host?.work}</span>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <span className="block font-semibold text-slate-900 text-xs">Company</span>
                            <span className="text-slate-800 text-sm font-semibold">{host?.company}</span>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <span className="block font-semibold text-slate-900 text-xs">Property Address / URL </span>

                            <span className='text-slate-800 text-sm font-semibold'> {host?.propertyURL} </span>

                        </div>
                    </div>

                    {/* Callback Time */}
                    <div className="p-4 border rounded-lg shadow-sm text-slate-700 mb-8">
                        <span className="block font-semibold text-slate-900 text-xs">Callback Time</span>
                        <span className="text-slate-800 text-sm font-semibold">{moment(host?.callBackTime).format('MMMM Do YYYY, h:mm A')}</span>
                    </div>

                    {/* Status and Reason */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-700 mb-8">
                        <div className="p-4 border rounded-lg shadow-sm">
                            <span className="block font-semibold text-slate-900 text-xs">Status Reason</span>
                            <span className="text-slate-800 text-sm font-semibold">{host?.statusReason}</span>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                                <span className="block font-semibold text-slate-900 text-xs">Current Status</span>
                                <span className="text-slate-800 text-sm font-semibold">{host?.hostStatus === "Ok to send offer" ? "Offer Sent" : host?.hostStatus}</span>
                            </div>

                        </div>
                        { host?.hostStatus !=="Paid" &&
                        <div className="p-4 border border-slate-500 rounded-lg shadow-sm flex justify-between items-center">
                            <div className=" flex gap-x-4 items-center">
                                <span className="block font-semibold text-slate-900 text-sm">Change Lead Status</span>
                                <select
                                    value={host?.hostStatus}
                                    onChange={handleStatusChange}
                                    className="shadow border-none outline-none rounded-sm p-2 text-slate-800 text-sm font-semibold"
                                >
                                    <option value="Callback">Callback</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Not Interested">Not Interested</option>
                                    <option value="DND">DND</option>
                                    <option value="Offer sent">Offer sent</option>
                                </select>
                            </div>
                        </div> }
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeadDetails;

