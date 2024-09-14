import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import CRMHeader from './CRMHeader';
import Sidebar from './CRMSidebar';

const Offers = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const modelType = useSelector((state) => state.modelType);
  const [offers, setOffers] = useState([]);
  const [filter, setFilter] = useState('all-offers');
  const navigate = useNavigate();
  const fetchOffers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/offers/${filter}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include"
      });

      const data = await response.json();
      if (filter === 'all-offers') { setOffers(data.offers); console.log(data.offers); }
      else if (filter === 'pending-offers') { setOffers(data.pendingOffers); }
      else if (filter === 'rejected-offers') { setOffers(data.rejectedOffers); }
      else { setOffers(data.expiredOffers); }
    } catch (error) {
      toast.error("Error fetching offers");
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [filter]);

  const handleAction = (offerId, action) => {
    console.log('Action:', action, 'on offer:', offerId);
    switch (action) {
      case 'History':
        console.log('Checking history for offer:', offerId);
        break;
      case 'PO Callback':
        break;
      case 'Send R-1':
        break;
      case 'Send R-2':
        break;
      case 'Send R-3':
        break;
      case 'Send RL':
        break;
      case 'Reject':
        break;
      case 'Pay Now':
        break;
      case 'DND':
        break;
      case 'PAID':
        break;
      default:
        break;
    }
  };

  return (
    <>
      <CRMHeader />
      <Sidebar />
      <div className='  h-screen  bg-slate-50 ml-16 z-50'>
        <div className="p-6">
          <div className="flex justify-center space-x-0 mb-4">
            <button
              className={`py-1 px-3 rounded-l-md text-sm font-semibold  ${filter === 'all-offers' ? 'bg-slate-700 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter('all-offers')}
            >
              All Offers
            </button>
            <button
              className={`py-1 px-3 text-sm font-semibold ${filter === 'pending-offers' ? 'bg-slate-700 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter('pending-offers')}
            >
              Pending Offers
            </button>
            <button
              className={`py-1 px-3 text-sm font-semibold ${filter === 'rejected-offers' ? 'bg-slate-700 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter('rejected-offers')}
            >
              Rejected Offers
            </button>
            <button
              className={`py-1 px-3 text-sm rounded-r-md font-semibold ${filter === 'expired-offers' ? 'bg-slate-700 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter('expired-offers')}
            >
              Expired Offers
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white  text-sm">
              <thead className=''>
                <tr className='rounded-t-md'>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Property</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Host Detail</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Plan</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Details</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Price</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Quantity</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Status</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Reason</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Created At</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Expiry Date</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Callback Time</th>
                  <th className="py-2 bg-slate-200 px-3  text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className='rounded-b-md'>
                {offers?.map((offer) => (
                  <tr key={offer?.id} className='border-b last:rounded-b-md'>
                    <td className="py-1 px-3 font-semibold text-xs text-center">{offer?.propertyURL}</td>
                    <td className="py-1 px-3 font-semibold text-xs text-center cursor-pointer text-blue-600" onClick={() => navigate(`/CRM/lead-details/${offer?.hostId}`)}>Host</td>
                    <td className="py-1 px-3 font-semibold text-xs text-center">{offer?.membershipPlan}</td>
                    <td className="py-1 px-3 font-semibold text-xs text-center">{offer?.planDetail}</td>
                    <td className="py-1 px-3 font-semibold text-xs text-center">{offer?.price}</td>
                    <td className="py-1 px-3 font-semibold text-xs text-center">{offer?.quantity}</td>
                    <td className="py-1 px-3 font-semibold text-xs text-center">{offer?.offerStatus}</td>
                    <td className="py-1 px-3 font-semibold text-xs text-center">{offer?.statusReason}</td>
                    <td className="py-1 px-3 font-semibold text-xs text-center">
                      {offer?.createdAt && format(new Date(offer?.createdAt), 'dd-MM-yyyy HH:mm')}
                    </td>
                    <td className="py-1 px-3  font-semibold text-xs text-center">
                      {offer?.expiryDate && format(new Date(offer?.expiryDate), 'dd-MM-yyyy HH:mm')}
                    </td>
                    <td className="py-1 px-3  font-semibold text-xs text-center">
                      {offer?.callBackTime && format(new Date(offer?.callBackTime), 'dd-MM-yyyy HH:mm')}
                      </td>
                    <td className="py-1 px-3  font-semibold text-xs text-center relative">
                      <select
                        className="bg-gray-100  text-sm rounded-md p-2"
                        onChange={(e) => handleAction(offer?.id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled hidden>Select Action</option>
                        <option value="History">History</option>
                        <option value="PO Callback">PO Callback</option>
                        <option value="Send R-1">Send R-1</option>
                        <option value="Send R-2">Send R-2</option>
                        <option value="Send R-3">Send R-3</option>
                        <option value="Send RL">Send RL</option>
                        <option value="Reject">Reject</option>
                        <option value="Pay Now">Pay Now</option>
                        <option value="DND">DND</option>
                        <option value="PAID">PAID</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </>
  );
};

export default Offers;
