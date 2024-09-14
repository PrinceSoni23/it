import React , {useState} from 'react'
import { Link } from "react-router-dom"
import { FaCircleChevronRight } from "react-icons/fa6";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { FaTasks, FaSignOutAlt } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { TbReport } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import logo from "../assets/TripItLOGO.png"


const options = [

  {
    name: "Dashboard",
    icon: <BsFillPersonVcardFill />,
    link: "/CRM/dashboard"
  },
  {
    name: "Leads",
    icon: <IoMdContacts />,
    link: "/CRM/leads",
  },


  {
    name: "Deals",
    icon: <BiSolidOffer />,
    link: "/CRM/offers"
  },
  // {
  //   name: "Tasks",
  //   icon: <FaTasks />,
  //   link: "/CRM/tasks"
  // },
  //{
  //   name: "Calendar",
  //   icon: <CgCalendarDates />,
  //   link: "/CRM/calendar"
  // },
  // {
  //   name: "Reports",
  //   icon: <TbReport />,
  //   link: "/CRM/reports"
  // },
  // {
  //   name: "Settings",
  //   icon: <IoSettings />,
  //   link: "/CRM/settings"
  // },
  // {
  //   name: "Logout",
  //   icon: <FaSignOutAlt />,
  //   link: "/CRM"
  // },
]

const CRMSidebar = () => {
    const [open, setOpen] = useState(false)

  return (
    <div>
        <div className={`flex flex-col fixed h-screen top-0 left-0 z-10  bg-white shadow ${open ? "w-60" : "w-16"}   duration-[500ms]  `}>
          <div className="text-bold pt-2  absolute -right-2  top-3.5 cursor-pointer" onClick={() => setOpen(!open)}>
            <FaCircleChevronRight className={`text-gray-700 text-xl ${open ? "rotate-180" : "rotate-0"} duration-[600ms] ring-2 rounded-full ring-gray-200`} />
          </div>


          <div className={`w-full flex items-center mx-auto bg-gray-200 `}>
            <img className={`mx-auto ${open && "w-44"} duration-[600ms] `} src={`${logo}`} alt="" />
          </div>

          <div className={`flex flex-col gap-2  mt-4`}>
            {options?.map((option, index) => (
              <Link key={index} to={option.link} className="flex items-center  gap-4 p-2  hover:bg-slate-100 text-gray-800   cursor-pointer">
              <div key={index} className="flex items-center  gap-4 p-2  hover:bg-slate-100 text-gray-800   cursor-pointer">
                <span className={`${!open && "w-full flex items-center justify-center text-3xl"} ${open && "pl-4"} text-xl`}>
                  {option.icon}
                </span>
                <span className={`${!open && "hidden "} duration-700 transition-all  `}>
                  {option.name}
                </span>
              </div>
              </Link>
            ))}
          </div>
        </div>

    </div>
  )
}

export default CRMSidebar