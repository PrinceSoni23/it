import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useLogout } from "../Helper/LogoutHelper";
import { MenuIcon, XIcon, UserCircleIcon } from '@heroicons/react/outline';
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import { isTokenExpired } from "../utility/CheckToken";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";

const default_links = [
    {
        name: 'Log In',
        link: '/login'
    },
    {
        name: 'Sign Up',
        link: '/register'
    }
]

const Header2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    //-----------CURRENCY DROPDOWN USESTATE----------------
    const [GCurrOpen, setGCurrOpen] = useState(false);
    const [country, setCountry] = useState("USA");
    const [language, setLanguage] = useState("ENG");
    const [currency, setCurrency] = useState("$");
    //------------USER/HOST MENU USESTATE----------------
    //const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false)
    //------------HOST DROPDOWN OPTIONS-------------------
    const [hostdrop, setHostdrop] = useState(false)
    //-----------CURRENCY DROPDOWN FUNCTIONS----------------
    useEffect(() => {
        const handleClickOutside1 = (e) => {
            if (GCurrOpen && e.target.closest("#GCurrComponent") === null && e.target.closest("#GCurrButton") === null) {
                setGCurrOpen(false);
            }
        };

        if (GCurrOpen) {
            setTimeout(() => {
                document.addEventListener("click", handleClickOutside1);
            }, 0); // Delay the event listener activation
        }

        return () => {
            document.removeEventListener("click", handleClickOutside1);
        };
    }, [GCurrOpen]);
    const saveSettings = () => {
        setGCurrOpen(false);
    };

    //-----------PROFILE  MENU FUNCTIONS-------------
    useEffect(() => {
        const handleClickOutside2 = (e) => {
            if (active && e.target.closest("#profile_menu") === null && e.target.closest("#profile_menu") === null) {
                setActive(false);
            }
        };

        if (active) {
            setTimeout(() => {
                document.addEventListener("click", handleClickOutside2);
            }, 0); // Delay the event listener activation
        }

        return () => {
            document.removeEventListener("click", handleClickOutside2);
        };
    }, [active]);
    //-----------HOST LOGIN/SIGNUP MENU FUNCTIONS-------------
    useEffect(() => {
        const handleClickOutside3 = (e) => {
            if (hostdrop && e.target.closest("#host_menu") === null && e.target.closest("#host_menu") === null) {
                setHostdrop(false);
            }
        };

        if (hostdrop) {
            setTimeout(() => {
                document.addEventListener("click", handleClickOutside3);
            }, 0); // Delay the event listener activation
        }

        return () => {
            document.removeEventListener("click", handleClickOutside3);
        };
    }, [hostdrop]);

    //---------USER/HOST MENU FUNCTIONS--------------
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const model = useSelector((state) => state.modelType);
    const userId = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token && isTokenExpired(token)) {
          console.log("Token expired");
          dispatch(setLogin({
            user: null,
            token: null,
            modelType: null
          }));
          console.log('Session expired. Please log in again.');
          model==="host" ? navigate('/host_login') : navigate('/login');
          return;
        }
    }, [token, model, dispatch, navigate]);

    const user_links = [
        {
            name: 'Your profile',
            link: `/dashboard`
        },
        {
            name: 'Trip List',
            link: `/${userId}/trips`
        },
        {
            name: 'Wish List',
            link: `/${userId}/wishList`
        },
        {
            name: 'Log Out',
            link: '/'
        }
    ]

    const host_links = [
        {
            name: 'Your profile',
            link: `/dashboard`
        },
        {
            name: 'Property List',
            link: `/${userId}/properties`
        },
        {
            name: 'Reservations',
            link: `/${userId}/reservations`
        },
        {
            name: 'Create Listing',
            link: '/create-listing'
        },
        {
            name: 'Log Out',
            link: '/'
        }
    ]
    // const dispatch = useDispatch();
    const logout = useLogout();

    const handleLogout = () => {
        // console.log("token", token, "model", model);
        const modelType = model; // Ensure these are set correctly
        const tokenValue = token;

        logout(modelType, tokenValue);
    };
    const nav_links = user ? (model === 'user' ? user_links : host_links) : default_links;



    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    // const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];
    // const handleCurrencyChange = (event) => {
    //     setCurrency(event.target.value);
    // };

    const toggleMenu = () => setIsOpen(!isOpen);


    return (
        <header className={`fixed top-0 w-full  shadow-sm z-[100] transition-all duration-300 ease-in-out backdrop-blur-[2px]  ${isScrolled ? 'bg-white/80 !text-slate-800 shadow-md' : 'bg-black/20 text-white '}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex  justify-between items-center  ">

                    {/* LOGO */}
                    <div className="flex items-center ">
                        <div className="flex-shrink-0 ">
                            <Link to="/" className='flex items-center gap-x-2'>
                            <img src={isScrolled ? logo3 : logo4} className="h-8 w-auto"  alt='logo'/>
                                <span className={`hidden md:block font-libre font-bold capitalize tracking-wide text-xl  ${isScrolled ? 'text-slate-800' : 'text-white'}`}>Trip It Today</span>
                            </Link>
                        </div>
                    </div>

                    {/*   DESKTOP MENU LINKS    AND   CURRENCY   AND   LOGIN/PROFILE */}
                    <div className=" hidden md:flex  md:gap-x-4 items-center">

                        <div className="hidden md:flex gap-x-1.5  items-center ">
                            {/* Desktop Menu */}
                            <div className="hidden md:block">
                                <div className="mx-auto flex items-baseline space-x-4">
                                    <Link to="/" className={`drop-shadow-lg tracking-wide ${isScrolled ? 'text-slate-800' : 'text-white'} px-1 py-3 text-sm font-libre font-bold capitalize group relative `}>
                                        Home
                                        <span className={`absolute left-0 bottom-0 w-full h-0.5 ${isScrolled ? "bg-slate-800" : "bg-white"} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out`}></span>
                                    </Link>
                                    <Link to="/about" className={`drop-shadow-lg tracking-wide ${isScrolled ? 'text-slate-800' : 'text-white'} px-1 py-3 text-sm font-libre font-bold capitalize group relative `}>
                                        About Us
                                        <span className={`absolute left-0 bottom-0 w-full h-0.5 ${isScrolled ? "bg-slate-800" : "bg-white"} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out`}></span></Link>
                                    <div className={`relative drop-shadow-lg tracking-wide ${isScrolled ? 'text-slate-800' : 'text-white'} w-20 py-3 text-sm font-libre font-bold capitalize group text-center cursor-pointer `} onClick={() => setHostdrop(!hostdrop)} >
                                        Host
                                        {hostdrop && <div id="host_menu" className={`absolute top-[98%] w-full bg-white/80  p-0.5 overflow-hidden`} >

                                            <Link to="/host_login">
                                                <div className="text-xs text-slate-800 hover:bg-slate-700 hover:text-white  p-2 cursor-pointer tracking-wider font-libre font-bold capitalize">Log In</div>
                                            </Link>
                                            <Link to="/host_register">
                                                <div className="text-xs text-slate-800 hover:bg-slate-700 hover:text-white  p-2 cursor-pointer tracking-wider font-libre font-bold capitalize">Sign Up </div>
                                            </Link>
                                        </div>
                                        }

                                    </div>

                                </div>
                            </div>
                            {/* Currency Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setGCurrOpen(!GCurrOpen)}
                                    className=" bg-black/10 text-xs font-libre font-bold capitalize px-6 py-2.5 "
                                >
                                    {`${country} | ${language} | ${currency}`}
                                </button>

                                {/* GCurrency dropdown */}
                                {GCurrOpen && (
                                    <div
                                        id="GCurrComponent"
                                        className="absolute  w-full  bg-white/80 text-slate-800 text-xs font-libre font-bold capitalize p-2  shadow-lg z-50 transition-opacity duration-300 ease-in-out opacity-100 "
                                        style={{ opacity: GCurrOpen ? 1 : 0 }}
                                    >
                                        <div>
                                            <label className="block mb-1 font-libre font-bold capitalize">Country</label>
                                            <select
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="block w-full p-1 border rounded mb-1 outline-none cursor-pointer"
                                            >
                                                <option value="ITY">Italy</option>
                                                <option value="SPA">Spain</option>
                                                <option value="USA">USA</option>
                                                <option value="AUS">Australia</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-libre font-bold capitalize">Language</label>
                                            <select
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                className="block w-full p-1 border rounded mb-1 outline-none cursor-pointer"
                                            >
                                                <option value="ENG">English</option>
                                                <option value="ITL">Italian</option>
                                                <option value="ESP">Spanish</option>
                                                <option value="FRE">French</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-libre font-bold capitalize">Currency</label>
                                            <select
                                                value={currency}
                                                onChange={(e) => setCurrency(e.target.value)}
                                                className="block w-full p-1 border rounded mb-1 outline-none cursor-pointer"
                                            >
                                                <option value="¥">YEN</option>
                                                <option value="$">USD</option>
                                                <option value="€">EUR</option>
                                            </select>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <button
                                                onClick={saveSettings}
                                                className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 mt-2 font-libre font-bold capitalize"
                                            >
                                                Save
                                            </button>
                                        </div>

                                    </div>
                                )}
                            </div>

                            {/* Profile/Login */}
                            <div className="relative inline-block z-50" >

                                <div className={`relative min-w-32 max-w-40 hidden md:flex  justify-start gap-x-2 items-center cursor-pointer ${isScrolled ? "text-slate-800" : "text-white"} text-semibold ${user ? 'px-3 pl-1' : 'px-2'} ${user ? 'py-0.5' : 'py-1'}  text-sm font-medium  `} onClick={() => setActive(!active)}>
                                    {(user === null || user?.avatar === "" || user?.avatar === '') ? (
                                        <UserCircleIcon className='h-8 w-8 ' />
                                    ) : (
                                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${user?.avatar?.replace("public", "")}`} alt="user_img" className='h-8 w-8 rounded-full inline-flex' />
                                    )}
                                    <p className={`  text-xs font-semibold capitalize`}>{user ? `${user.firstName}` : "LOGIN / SIGNUP"}</p>
                                </div>
                                <div>
                                    {active && <div id="profile_menu" className={`absolute w-full bg-white/80  p-0.5 overflow-hidden`}>

                                        {nav_links.map((link, index) => (

                                            (link.name === "Log Out")
                                                ?
                                                <Link to={link.link} onClick={handleLogout}>
                                                    <div className="text-xs text-slate-800 hover:bg-slate-700 hover:text-white  p-2 cursor-pointer tracking-wider font-libre font-bold capitalize">{link.name} </div>
                                                </Link>
                                                : (
                                                    <Link to={link.link} key={index}>
                                                        <div className='text-xs text-slate-800 hover:bg-slate-700 hover:text-white  p-2 cursor-pointer tracking-wider princefont font-bold capitalize' >{link.name}</div>
                                                    </Link>))
                                        )
                                        }


                                    </div >
                                    }

                                </div>
                            </div>
                        </div>
                    </div>


                    {/*======================== Mobile menu button ======================= */}
                    <div className="md:hidden flex items-center gap-x-2 duration-500 ">

                        {/*------------MOBILE USER PROFILE / LOGIN------------ */}
                        <div className="relative inline-block z-50" >

                            <div className={`relative flex  justify-start gap-x-2 items-center  cursor-pointer   text-slate-800 text-libre font-bold capitalize ${user ? 'px-3 pl-1' : 'px-3'} ${user ? 'py-0.5' : 'py-1'}  text-sm font-medium `} onClick={() => setActive(!active)}>
                                {(user === null || user?.avatar === "" || user?.avatar === '') ? (
                                    <UserCircleIcon className={`${isScrolled ? 'text-slate-800' : 'text-white'} h-8 w-8  `} />
                                ) : (
                                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${user?.avatar?.replace("public", "")}`} alt="user_img" className='h-8 w-8 rounded-full inline-flex' />
                                )}
                                {/* <p className={` text-xs font-semibold`}>{user ? `${user.firstName}` : "LOGIN / SIGNUP"}</p> */}
                            </div>
                            <div>
                                {active && <div id="mob_profile_menu" className={`absolute -left-14 text-center w-28 bg-white/80  p-0.5`}>

                                    {nav_links.map((link, index) => (
                                        (link.name === "Log Out")
                                            ?
                                            <Link to={link.link} onClick={handleLogout}>
                                                <div className="text-[10px] sm:text-xs text-slate-800 hover:bg-slate-700 hover:text-white  p-2 cursor-pointer tracking-wider font-libre font-bold capitalize">{link.name} </div>
                                            </Link>
                                            :
                                            <Link to={link.link} key={index}>
                                                <div className='text-[10px] sm:text-xs text-slate-800 hover:bg-slate-700 hover:text-white  p-2 cursor-pointer tracking-wider font-libre font-bold capitalize' >{link.name}</div>
                                            </Link>
                                    ))
                                    }
                                </div>
                                }

                            </div>
                        </div>
                        <button onClick={toggleMenu} className={`${isScrolled ? 'text-slate-800' : 'text-white'} duration-500 transition-all focus:outline-none`}>
                            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>



                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">

                    {/*------------MOBILE COUNTRY | LANGUAGE | CURRENCY------------ */}
                    {/* Currency Dropdown */}
                    <div className="relative mx-auto  w-1/2 flex justify-center">
                        <button
                            onClick={() => setGCurrOpen(!GCurrOpen)}
                            className="relative bg-black/10 text-[10px] font-libre font-bold capitalize px-6 py-2.5 mx-auto  "
                        >
                            {`${country} | ${language} | ${currency}`}
                        </button>

                        {/* GCurrency dropdown */}
                        {GCurrOpen && (
                            <div
                                id="GCurrComponent"
                                className="absolute top-7 w-full  bg-white/80 text-slate-800 text-xs font-libre font-bold capitalize p-2  shadow-lg z-50 transition-opacity duration-300 ease-in-out opacity-100 "
                                style={{ opacity: GCurrOpen ? 1 : 0 }}
                            >
                                <div>
                                    <label className="block mb-1 font-libre font-bold capitalize">Country</label>
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="block w-full p-1 border rounded mb-1 outline-none cursor-pointer"
                                    >
                                        <option value="ITY">Italy</option>
                                        <option value="SPA">Spain</option>
                                        <option value="USA">USA</option>
                                        <option value="AUS">Australia</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-libre font-bold capitalize">Language</label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="block w-full p-1 border rounded mb-1 outline-none cursor-pointer"
                                    >
                                        <option value="ENG">English</option>
                                        <option value="HIN">Italian</option>
                                        <option value="ESP">Spanish</option>
                                        <option value="FRE">French</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-libre font-bold capitalize">Currency</label>
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="block w-full p-1 border rounded mb-1 outline-none cursor-pointer"
                                    >
                                        <option value="¥">YEN</option>
                                        <option value="$">USD</option>
                                        <option value="€">EUR</option>
                                    </select>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button
                                        onClick={saveSettings}
                                        className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 mt-2 font-libre font-bold capitalize"
                                    >
                                        Save
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>



                    {/*------------ MOBILE NAV LINKS------------ */}

                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className={`block ${isScrolled ? 'text-slate-800' : 'text-white'} text-sm hover:text-white hover:bg-slate-600 px-3 py-1 font-libre font-semibold capitalize `}>Home</Link>
                        <Link to="/about" className={`block  ${isScrolled ? 'text-slate-800' : 'text-white'} text-sm hover:text-white hover:bg-slate-600 px-3 py-1 font-libre font-semibold capitalize `}>About Us</Link>
                 
                        <div className={`block  relative ${isScrolled ? 'text-slate-800' : 'text-white'} text-sm  px-3 py-1 font-libre font-semibold capitalize cursor-pointer `} onClick={() => setHostdrop(!hostdrop)} >
                                        Host
                                        {hostdrop && <div  className={`absolute  w-[50%] h-full top-0 left-20 bg-black/20 shadow-md  overflow-hidden gap-3 flex justify-around item-center rounded ${hostdrop ? " -translate-x-20" : "-translate-x-0"}duration-800 ease`} >

                                            <Link to="/host_login" className='flex items-center justify-center'>
                                                <div className="text-[11px]  text-white  p-0.5 cursor-pointer tracking-wider font-libre font-bold capitalize">Log In</div>
                                            </Link>
                                            <Link to="/host_register" className='flex items-center justify-center'>
                                                <div className="text-[11px]  text-white  p-0.5 cursor-pointer tracking-wider font-libre font-bold capitalize">Sign Up </div>
                                            </Link>
                                        </div>
                                        }

                                    </div>



                    </div>
                </div>
            )}
        </header>
    );
};

export default Header2;
