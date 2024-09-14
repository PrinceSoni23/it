import { useState, useRef, } from "react";
import { Link, useNavigate } from "react-router-dom"
import bg_img from "../assets/agent_avatar.png"
import CRMError from "./CRMError";
import { useSelector } from "react-redux";
import CRMHeader from "./CRMHeader";
import CRMSidebar from "./CRMSidebar";
import LeadCard from "./LeadCard";
import Widgets from "./Widgets";
import { toast } from "react-toastify"
import { FaUserEdit } from "react-icons/fa";

const backendData = {
  firstName: "Gautam",
  lastName: "Arora",
  email: "gtmdhoni@gmail.com",
  contact: "1234567890",
  avatar: `${bg_img}`
}
//AGENT AVATAR - GTM
//AGENT _id ROUTES FOR DASHBOARD AND ALL - GTM

const CRM = () => {
  const [STD, setSTD] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const modelType = useSelector((state) => state.modelType);
  //console.log("User - ", user);

  const [exist, setExist] = useState(false);
  const [isFreshLead, setIsFreshLead] = useState(false);
  const [hostData, setHostData] = useState({});
  const [msg, setMsg] = useState("");

  const hostDataRef = useRef(null);
  const actionDivRef = useRef(null);

  const smoothScrollToRef = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleCheckLead = async () => {
    // Combine STD code and phone number
    const fullPhoneNumber = STD ? `${STD}${phoneNumber}` : phoneNumber;
    // console.log("FullPhoneNumber from frontend CRM.jsx →", fullPhoneNumber);

    // Reset state before making the request
    setExist(false);
    setHostData({});
    setIsFreshLead(false); // Reset fresh lead state
    setMsg("Checking Lead...");
    try {
      // Post the phoneNumber data to the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/agents/check-host`, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
      })

      const data = await response.json();
      if (data.message === "Host already exists") {
        setExist(true);
        setMsg("Host already exists");
        setHostData(data.data);
        toast.info("Host already exists.");
        smoothScrollToRef(hostDataRef);

      } else {
        setExist(false);
        setIsFreshLead(true);
        setMsg("This is a FRESH Lead!");
        toast.info("This is a FRESH Lead!");
        smoothScrollToRef(actionDivRef);

      }


    } catch (error) {
      console.error('Error:', error);
      toast.error(error)
    }
  };

  const navigate = useNavigate();
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && selectedValue[0] === '/') {
      navigate(selectedValue , { state: { phoneNumber } }); 
    }
  };



  const data = user ? user.agent : backendData;



  return (
    <>
      {user && modelType === "agent"
        ? <>
          <CRMHeader />
          <CRMSidebar />
          <div className="ml-16 h-full  bg-gray-100 ">

            {/* ---------------------------- MAIN CONTENT ---------------------------- */}
            <div className="p-4">
              <Widgets />
              <div className="bg-white shadow px-4 py-2 rounded-lg">
                <div className="text-xl font-semibold w-full pb-2 mb-3 border-b">
                  Welcome to <Link to="/" className="font-bold">TripItToday</Link> , <span className="text-rose-500 text-2xl font-medium">{"  " + data?.firstName + "  " + data?.lastName}</span>
                </div>

                <div className="flex justify-between items-center  gap-x-8">
                  {/* -----AGENT AVATAR DIV------ */}
                  <div className=" bg-white border-r w-full flex justify-center items-center">
                    <span className="w-40 h-40 rounded-full shadow bg-white flex justify-center items-center">
                      {(!data?.avatar || data?.avatar === "")
                        ?
                        <img src={`${backendData.avatar}`} alt="Profile Pic" className="object-cover w-40 h-40 rounded-full" />
                        :
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${data?.avatar?.replace("public", "")}`} alt="Profile Pic" className="object-cover w-40 h-40 rounded-full" />
                      }
                    </span>
                  </div>

                  {/* -----AGENT DETAILS DIV------ */}
                  <div className="relative w-full rounded-md bg-white  flex flex-col gap-2 py-8 items-center">
                    <span className="font-semibold tracking-wide w-full text-center text-xl py-2">
                      Agent Details
                    </span>
                    {/* -----AGENT FULL NAME----- */}
                    <div className="w-full py-2 px-14  flex gap-2">
                      <div className="w-[100px]  flex justify-between font-medium">
                        <span className="">Name</span>
                        <span className="">:</span>
                      </div>
                      <div className=" tracking-wider">
                        {data.firstName + " " + data.lastName}
                      </div>
                    </div>
                    {/* -----AGENT CONTACT----- */}
                    <div className="w-full py-2 px-14  flex gap-2">
                      <div className="w-[100px]  flex justify-between font-medium">
                        <span className="">Contact</span>
                        <span className="">:</span>
                      </div>
                      <div className=" tracking-wider">
                        {data.phoneNumber}
                      </div>
                    </div>
                    {/* -----AGENT EMAIL----- */}
                    <div className="w-full py-2 px-14  flex gap-2">
                      <div className="w-[100px]  flex justify-between font-medium">
                        <span className="">Email</span>
                        <span className="">:</span>
                      </div>
                      <div className=" tracking-wider">
                        {data.email}
                      </div>
                    </div>

                    {/* -----EDIT DETAILS BUTTON----- */}
                    <Link to="/CRM/update-agent">
                      <div className={`absolute bottom-4 right-4 w-12 h-12 rounded-full shadow-lg font-bold text-lg bg-white text-rose-500 border border-rose-500 flex justify-center items-center `}>
                        < FaUserEdit className="text-xl" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>


              <div className="bg-white my-5 p-4 shadow rounded-md flex flex-col justify-center items-center">
                <p className="text-center py-4 text-sm text-gray-700 ">Check the status of the contact number, you would like to call.</p>
                <div className="flex font-semibold gap-4">
                  Contact no.
                  <input type="text"
                    className="w-12 px-2 py-0.5 outline-none border border-slate-700/50 rounded font-normal"
                    placeholder="STD"
                    value={STD}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
                      setSTD(value);
                    }} />
                  <input type="text"
                    className="px-2 py-0.5 outline-none border border-slate-700/50 rounded font-normal"
                    placeholder="10-digit Mobile"
                    value={phoneNumber}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
                      setExist(false)
                      setIsFreshLead(false);
                      setMsg("");
                      setPhoneNumber(value);
                    }} />
                </div>
                <button className="mt-4 py-1 px-3 flex justify-center items-center bg-slate-700 text-white hover:bg-slate-800"
                  onClick={() => phoneNumber.length !== 10 ? toast.error("Phone Number should have 10 digits.") : handleCheckLead()}
                  > {/*disabled={phoneNumber.length !== 10}*/}
                  Check Lead
                </button>

                <p className={`text-sm font-semibold mt-2 ${exist ? "text-blue-500" : "text-green-500"}`}>{msg}</p>

                {
                  (exist && hostData) &&
                  <div ref={hostDataRef} className="mt-4 flex flex-col gap-2  w-full">
                    <span className="text-xl font-semibold text-center ">Host Details</span>
                    <LeadCard lead={hostData} />
                  </div>
                }

                {
                  (isFreshLead) &&
                  <div ref={actionDivRef} className="flex justify-center mb-5 p-4 gap-2 w-full bg-white rounded-sm">
                    <div className="shadow-md p-1">
                      <select name="Choose Action" id="" className="outline-none px-3 py-2" onChange={handleSelectChange} > Choose Action
                        <option value="">Choose Action</option>
                        <option value="/CRM/create-offer">Send Offer</option>
                        <option value="/CRM/fresh/callback">Callback</option>
                        <option value="/CRM/fresh/paid">Paid</option>
                        <option value="/CRM/fresh/lang_barrier">Language Barrier</option>
                        <option value="/CRM/fresh/no_interest">Not Interested</option>
                        <option value="/CRM/fresh/DND">DND</option>
                        <option value="/CRM/fresh/not_connected">Not Connected</option>
                      </select>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </>
        :
        <CRMError model={modelType} />
      }
    </>
  )
}

export default CRM;