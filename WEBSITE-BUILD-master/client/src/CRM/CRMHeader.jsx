import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLogout } from '../Helper/LogoutHelper'
import agent_placeholder_img from "../assets/agent_avatar.png"


const CRMHeader = () => {
  const date = new Date()
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const displayDate = week[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()

  const [menu, setMenu] = useState(false)

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const model = useSelector((state) => state.modelType);

  const data = user?.agent;
  //console.log("((CRMHeader) Agent data → ", user.agent)



  //------------- STATUS HANDLE ---------------
  const [currentStatus, setCurrentStatus] = useState(null);

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
  };

  //----------CLOSE MENU FUNCTIONALITY ----------------
  useEffect(() => {
    const handleClickOutside2 = (e) => {
      if (menu && e.target.closest("#agent_menu") === null && e.target.closest("#agent_menu") === null) {
        setMenu(false);
      }
    };

    if (menu) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside2);
      }, 500); // Delay the event listener activation
    }

    return () => {
      document.removeEventListener("click", handleClickOutside2);
    };
  }, [menu]);


  //----------AGENT LOGOUT FUNCTIONALITY ----------------
  const logout = useLogout();

  const handleAgentLogout = () => {
    const modelType = model;
    const tokenValue = token;
    logout(modelType, tokenValue);
  };


  return (
    <>
      {user && model === "agent" ?
        <div className="relative flex items-center justify-between bg-white/80 shadow p-1 pl-20">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">Dashboard</div>
            <div className="text-sm text-gray-400">{displayDate}</div>
          </div>

          <div className='flex justify-center items-center gap-x-4'>
            {/* <div>
              <select> Status
                <option value="">Status</option>
                <option value="Online">Online</option>
                <option value="Away">Away</option>
                <option value="DND">Do Not Disturb</option>

              </select>
            </div> */}

            <div className=" relative  flex items-center gap-4 bg-white  px-3 py-1 cursor-pointer" onClick={() => setMenu(!menu)}>
              <div className=" bg-slate-400 text-white h-10 w-10 rounded-full p-[1px] cursor-pointer flex justify-center items-center" >
                {/* //IF AGENT AVATAR IS NULL - GTM */}
                {(!data?.avatar || data?.avatar === "")
                  ?
                  <img src={`${agent_placeholder_img}`} alt="Profile Pic" className="object-cover rounded-full" />
                  :
                  <img src={`${process.env.REACT_APP_BACKEND_URL}/${data?.avatar?.replace("public", "")}`} alt="Profile Pic" className="object-cover rounded-full" />
                }
              </div>
               {/* ----------------STATUS INDICATOR---------------- */}
              <div className={`h-3 w-3 rounded-full absolute bottom-1 right-3 bg-gray-100 ${currentStatus === "Online" && "!bg-green-500"} ${currentStatus === "Away" && "!bg-red-500"} ${currentStatus === "Do Not Disturb" && "!bg-yellow-500"} `}></div>

              {/* -----------------MENU---------------- */}
              {menu && <div  id='agent_menu' className="absolute w-44 bg-white top-12 right-4 rounded border shadow-xl p-1 z-50 ">
                <div className="flex flex-col ">
                  <div className="text-sm flex flex-col border-b font-semibold text-slate-700 p-2 mb-1 tracking-wider">
                    <span>Welcome, {data?.firstName}</span>
                    <span className="text-xs text-slate-500">{data?.email}</span>
                  </div>

                  <Link to="/CRM/dashboard" >
                    <div className="text-sm font-semibold text-slate-700  hover:text-rose-500 py-1 px-2 cursor-pointer tracking-wider ">Profile</div>
                  </Link>
                  <div className='text-sm font-semibold text-slate-700  hover:text-rose-500 py-1 px-2  cursor-pointer tracking-wider '>
                    Notifications
                  </div>
                  {/* -------------STATUS---------------- */}
                  <div className="px-2 py-1 text-sm flex flex-col text-slate-500 font-semibold gap-y-1">
                    <span className="border-b font-semibold text-slate-700">Status</span>
                    <div className="flex flex-col justify-between items-between space-y-1 px-1 py-1">

                      {/* Online Status */}
                      <div className="flex justify-between items-center" onClick={() => handleStatusChange('Online')}>
                        <span className="text-sm">Online</span>
                        <div
                          className={`w-3 h-3 p-1 flex items-center justify-center cursor-pointer rounded-full border border-green-500 ${currentStatus === 'Online' ? 'bg-green-500' : 'bg-white'
                            }`}
                        >
                          {currentStatus === 'Online' && (
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          )}
                        </div>
                      </div>

                      {/* Away Status */}
                      <div className="flex justify-between items-center" onClick={() => handleStatusChange('Away')}>
                        <span className="text-sm">Away</span>
                        <div
                          className={`w-3 h-3 p-1 flex items-center justify-center cursor-pointer rounded-full border border-red-500 ${currentStatus === 'Away' ? 'bg-red-500 ' : 'bg-white'
                            }`}
                        >
                          {currentStatus === 'Away' && (
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          )}
                        </div>
                      </div>

                      {/* DND Status */}
                      <div className="flex justify-between items-center" onClick={() => handleStatusChange('Do Not Disturb')}>
                        <span className="text-sm">Do Not Disturb</span>
                        <div
                          className={`w-3 h-3 p-1 flex items-center justify-center cursor-pointer rounded-full border border-yellow-500 ${currentStatus === 'Do Not Disturb' ? 'bg-yellow-500' : 'bg-white'
                            }`}
                        >
                          {currentStatus === 'Do Not Disturb' && (
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/CRM/login" onClick={handleAgentLogout}>
                    <div className="text-sm border-t font-semibold text-red-400  hover:text-rose-500 pt-1 pb-2 px-2 cursor-pointer tracking-wider">Log Out </div>
                  </Link>
                </div>
              </div>}
            </div>
          </div>
        </div>
        :
        <>
        </>
      }
    </>)
}

export default CRMHeader