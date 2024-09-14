import React, { useState, useEffect, useCallback } from 'react'
//import { useNavigate } from 'react-router-dom'
import CRMHeader from './CRMHeader'
import Sidebar from './CRMSidebar'
import CRMError from './CRMError'
import LeadCard from './LeadCard'
import { useSelector } from 'react-redux'

const Leads = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const modelType = useSelector((state) => state.modelType);
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]); // State to store filtered leads
    const [selectedStatus, setSelectedStatus] = useState(''); // State for selected lead status
   // const navigate = useNavigate();

   
    const handleAllLeads = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/agents/all-hosts`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, // Include token in the Authorization header
                },
                credentials: "include"
            });
            const data = await response.json();
            console.log("(Leads.jsx) LEADS → ", data.data);
            setLeads(data.data);
            setFilteredLeads(data.data); 
        } catch (err) {
            console.log("Fetch Listings Failed", err.message);
        }
    }, [token]);

    useEffect(() => {
        handleAllLeads();
    }, [handleAllLeads]);

    const handleStatusFilter = (event) => {
        const status = event.target.value;
        setSelectedStatus(status);
        if (status === '') {
            setFilteredLeads(leads); 
        } else {
            setFilteredLeads(leads.filter((lead) => lead.hostStatus === status));
        }
    };

    return (
        <>
            {user && modelType === "agent" ?
                <div>
                    <CRMHeader />
                    <Sidebar />
                    <div className='main-container h-screen  bg-slate-100 ml-16 z-50 flex flex-col p-4 justify-start items-center gap-2'>
                        <h1 className='w-full text-4xl font-extrabold border-b pb-4 text-center'>Leads</h1>
                        <div className='mt-1 grid grid-cols-4 gap-2  w-full'>
                            <div className="tracking-wider font-bold text-base text-center min-w-full">Name</div>
                            <div className="tracking-wider font-bold text-base  text-center min-w-full">Phone</div>
                            <div className="tracking-wider font-bold text-base text-center min-w-full">Email</div>
                            <div className="tracking-wider font-bold text-base text-center min-w-full">
                                Lead Status
                                <select
                                    value={selectedStatus}
                                    onChange={handleStatusFilter}
                                    className="ml-2 border rounded p-1 outline-none"
                                >
                                    <option value="">All</option>
                                    <option value="Callback">Callback</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Language Barrier">Language Barrier</option>
                                    <option value="Not Interested">Not Interested</option>
                                    <option value="DND">DND</option>
                                    <option value="Not Connected">Not Connected</option>
                                    <option value="Ok to send offer">Ok to send offer</option>
                                </select>
                            </div>
                        </div>

                        <div className='w-full'>
                            {filteredLeads?.map((lead, index) => (
                                <LeadCard key={index} lead={lead} />
                            ))}
                        </div>
                    </div>
                </div> :
                <CRMError modelType={modelType} />
            }
        </>
    );
}

export default Leads;
