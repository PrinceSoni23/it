import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setError } from './redux/state.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollToTop from './components/ScrollToTop.jsx';
import ItineraryPage from "./pages/ItineraryPage.jsx"

import { Login, RegisterPage, TripList, ReservationList, ChangePasswordPage, PropertyList,  CategoryPage } from './pages';

import GHOME from "./pages/GHOME";
import GWISHLIST from "./pages/GWISHLIST";
import GCONTACTPAGE from "./pages/GCONTACTPAGE";
import GABOUT from "./pages/GABOUT";
import GWORK from "./pages/GWORK.jsx";
import GPROPERTIES from "./pages/GPROPERTIES.jsx";
import GCREATELISTING from "./pages/GCREATELISTING.jsx";
import GPAY from "./pages/GPAY.jsx";
import Dashboard from './pages/Dashboard.jsx';
import { UpdateDetails } from './pages/EditDetails.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import Details from './pages/Details.jsx';
import OfferPage from './pages/Offers.jsx';
import Gallery from './pages/PhotoDetails.jsx';
import TermsAndCondition from './pages/TermsAndCondition.jsx';
import FAQ from './pages/FAQ.jsx';
import CancellationPolicies from './pages/CancellationPolicies.jsx';
import { EmailVerification } from './pages/EmailVerification.jsx';
import { ConfirmBooking } from './pages/ConfirmBooking.jsx';
import { GetOTP } from './pages/GetOtpMail.jsx';
import { ChangeForgotPassword } from './pages/ForgotPassword.jsx';

//-----------------CRM-----------------
import CRMLogin from './CRM/CRMLogin.jsx';
import CRMRegister from './CRM/CRMRegister.jsx';
import CRM from './CRM/CRM.jsx';
import Leads from './CRM/Leads.jsx';
import CreateOffer from './CRM/CreateOffer.jsx';
import FreshLead from './CRM/FreshLead.jsx';
import UpdateAgent from './CRM/UpdateAgent.jsx';
import LeadDetails from './CRM/LeadDetails.jsx';
import Offers from './CRM/Offerss.jsx';

function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user);
  //console.log("isLoggedIn - ", isLoggedIn);
  const location = useLocation();
  
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setError("You are already logged in"));
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div>
      <ScrollToTop />
      <TransitionGroup>
        <CSSTransition
        key={location.key}
        timeout={500}  // Increased timeout for smoother effect
        classNames="fade-slide"
        >
          <Routes location={location}>

            {/* NEW HOME PAGE */}
            <Route path='/' element={<GHOME />} />
            <Route path='/GHOME' element={<GHOME />} />
            <Route path='/home' element={<GHOME />} />
            <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/about' element={<GABOUT />} />
            <Route path='/contact' element={<GCONTACTPAGE />} />
            <Route path='/how-we-work' element={<GWORK />} />
            <Route path='/all-listings' element={<GPROPERTIES />} />
            <Route path='/gcl' element={<GCREATELISTING />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/payment' element={<GPAY />} />
            <Route path='/change-password' element={<ChangePasswordPage />} />
            <Route path='/host-get-otp' element={<GetOTP />} />
            <Route path='/get-otp' element={<GetOTP />} />
            <Route path='/:userId/reset-password/:otpToken' element={<ChangeForgotPassword />} />

            <Route path='/update-details' element={<UpdateDetails />} />
            <Route path='/PrivacyPolicyPage' element={<PrivacyPolicyPage />} />
            {/* <Route path='/Details' element={<Details />} /> */}
            <Route path='/Offer' element={<OfferPage />} />
            <Route path='/It' element={<ItineraryPage />} />
            <Route path='/gallery/:listingId' element={<Gallery />} />

            {/* SEARCH */}
            {/* <Route path="/properties/search/:search" element={<SearchPage />} /> */}

            {/* AFTER LOGIN AND AUTHENTICATION */}
            <Route path="/:userId/trips" element={<TripList />} />
            <Route path="/:userId/wishList" element={<GWISHLIST />} />
            <Route path="/:userId/reservations" element={<ReservationList />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/TC" element={<TermsAndCondition />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Cp" element={<CancellationPolicies />} />
            <Route path="/verify-email/:verificationToken" element={<EmailVerification />} />

            {/* HOST */}
            {/* <Route path='/host_login' element={isLoggedIn ? <Navigate to="/" /> : <Login />} /> */}
            <Route path='/host_login' element={<Login />} />
            <Route path='/host_register' element={<RegisterPage />} />
            <Route path='/create-listing' element={<GCREATELISTING />} />
            <Route path="/:userId/properties" element={<PropertyList />} />
            <Route path="/properties/:listingId" element={<Details />} />
            <Route path="/properties/category/:category" element={<CategoryPage />} />
            <Route path="/verify-booking/:id" element={<ConfirmBooking />} />

            {/* CRM */}
            <Route path='/CRM' element={<CRM />} />
            <Route path='/CRM/login' element={<CRMLogin />} />
            <Route path='/CRM/register' element={<CRMRegister />} />
            <Route path='/CRM/dashboard' element={<CRM />} />
            <Route path='/CRM/leads' element={<Leads />} />
            {/* <Route path='/CRM/deals' element={<Deals />} /> */}
            {/* <Route path='/CRM/tasks' element={<Tasks />} />
            <Route path='/CRM/reports' element={<Reports />} /> */}
            <Route path='/CRM/update-agent' element={<UpdateAgent />} />
            
            <Route path='/CRM/lead-details/:hostId' element={<LeadDetails />} />
             {/* ------------FRESH LEAD------------- */}
            <Route path='/CRM/create-offer' element={<CreateOffer />} />
            <Route path='/CRM/fresh/callback' element={<FreshLead />} />
            <Route path='/CRM/fresh/paid' element={<FreshLead />} />
            <Route path='/CRM/fresh/lang_barrier' element={<FreshLead />} />
            <Route path='/CRM/fresh/no_interest' element={<FreshLead />} />
            <Route path='/CRM/fresh/DND' element={<FreshLead />} />
            <Route path='/CRM/fresh/not_connected' element={<FreshLead />} />
            

            {/* --------------------OFFERS--------------------- */}
            <Route path='/CRM/offers' element={<Offers />} />
            

          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
