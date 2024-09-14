import React from 'react'
import { Link } from 'react-router-dom'

const LeadCard = ({lead}) => {
    // console.log("(LeadCard.jsx) LEAD → ", lead)
  return (
    <>
    <Link to={`/CRM/lead-details/${lead._id}`}>
    <div className="grid grid-cols-4 m-2 p-4 gap-2 w-full shadow-md bg-white border rounded-md">
                      <div className="flex gap-2">
                        <div className="w-[85px]  flex justify-between font-medium">
                          <span className="">Name</span>
                          <span className="">:</span>
                        </div>
                        <div className=" tracking-wider">
                          {lead.firstName + " " + lead.lastName}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-[85px]  flex justify-between font-medium">
                          <span className="">Contact</span>
                          <span className="">:</span>
                        </div>
                        <div className=" tracking-wider">
                          {lead.phoneNumber}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-[85px]  flex justify-between font-medium">
                          <span className="">Email</span>
                          <span className="">:</span>
                        </div>
                        <div className=" tracking-wider">
                          {lead.email}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-[85px]  flex justify-between font-medium">
                          <span className="">Lead Status</span>
                          <span className="">:</span>
                        </div>
                        <div className=" tracking-wider">
                          {lead.hostStatus}
                        </div>
                        
                      </div>
                    </div>

    </Link>
    </>
  )
}

export default LeadCard