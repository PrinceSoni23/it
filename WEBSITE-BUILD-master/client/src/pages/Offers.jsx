import React from 'react';
import { FaMoneyBillWave, FaGift, FaExchangeAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

import offerImage1 from "../assets/Carousel/tour.jpg";
import offerImage2 from "../assets/Carousel/host.jpg";
import Header from "../components/Header2";
import Footer from "../components/GFOOTER";
const OfferPage = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5 pt-14">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Exclusive Offers for Travelers & Hosts
        </h1>
        <p className="text-lg md:text-2xl text-gray-600">
          Convert your spending into rewards and cash them out!
        </p>
      </header>

      {/* Offer Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
        {/* Offer 1 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={offerImage1} alt="Traveler Offers" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">For Travelers</h2>
            <p className="text-gray-600 mb-4">
              Every time you book with us, earn points that you can convert to cash or use for future bookings.
            </p>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMoneyBillWave className="text-green-500 text-3xl mr-4" />
              <span>Earn points for every dollar spent.</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <FaGift className="text-blue-500 text-3xl mr-4" />
              <span>Get exclusive deals and discounts.</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaExchangeAlt className="text-yellow-500 text-3xl mr-4" />
              <span>Convert points to real cash anytime.</span>
            </div>
          </div>
        </div>

        {/* Offer 2 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={offerImage2} alt="Host Offers" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">For Hosts</h2>
            <p className="text-gray-600 mb-4">
              Earn points every time you host a guest. Convert your points into cash rewards or use them for promotions.
            </p>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMoneyBillWave className="text-green-500 text-3xl mr-4" />
              <span>Earn points with each successful booking.</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <FaGift className="text-blue-500 text-3xl mr-4" />
              <span>Receive bonuses for consistent hosting.</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaExchangeAlt className="text-yellow-500 text-3xl mr-4" />
              <span>Cash out your points whenever you want.</span>
            </div>
          </div>
        </div>
      </div>



      <div className="min-h-screen bg-cover bg-no-repeat bg-center p-8" style={{ backgroundImage: "url('https://source.unsplash.com/featured/?travel')" }}>
            <div className="bg-white bg-opacity-80 rounded-3xl shadow-2xl p-10 max-w-5xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-12">PayBack Offers</h1>

                {/* USD to Points Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">USD to Points Conversion</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <OfferCard 
                            title="Owner"
                            image="https://img.freepik.com/free-vector/happy-character-winning-prize-with-flat-design_23-2147900453.jpg?ga=GA1.1.932687991.1719332392&semt=ais_hybrid"
                            silver="250$ - 349$"
                            gold="349$ - 499$"
                            platinum="500$ - < $"
                        />
                        <OfferCard 
                            title="Guest"
                            image="https://img.freepik.com/premium-vector/parents-kids-makes-home-budget-finance-management-plan_189557-1115.jpg?ga=GA1.1.932687991.1719332392&semt=ais_hybrid"
                            silver="200$ - 500$"
                            gold="500$ - 1000$"
                            platinum="1000$ - < $"
                        />
                        <OfferCard 
                            title="Agency"
                            image="https://img.freepik.com/premium-vector/realistic-office-moments-vector-illustration-concepts_1253202-147131.jpg?ga=GA1.1.932687991.1719332392&semt=ais_hybrid"
                            silver="2000$ - 5000$"
                            gold="5000$ - 7500$"
                            platinum="7500$ - < $"
                        />
                    </div>
                </div>

                {/* Points to USD Section */}
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Points to USD Conversion</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <OfferCard 
                            title="Silver (New Property)"
                            image="https://img.freepik.com/premium-vector/gold-medal-with-red-ribbon-metallic-winner-award-illustration_144920-179.jpg?ga=GA1.1.932687991.1719332392&semt=ais_hybrid"
                            silver="75 Points = 1$"
                            gold="100 Points = 4$"
                            platinum="75 Points = 2$"
                        />
                        <OfferCard 
                            title="Gold (Same Property)"
                            image="https://img.freepik.com/premium-photo/reward-certificate-with-gold-medal-vector-icon-illustration-certificate-medal-reward-icon-concept-white-isolated-flat-cartoon-style-suitable-web-landing-page-banner-sticker-background_839035-1769821.jpg?ga=GA1.1.932687991.1719332392&semt=ais_hybrid"
                            silver="50 Points = 25$"
                            gold="75 Points = 1.5$"
                            platinum="50 Points = 50$"
                        />
                        <OfferCard 
                            title="Platinum (Same Property)"
                            image="https://img.freepik.com/free-psd/medals-3d-render-champion-award-composition_314999-3096.jpg?ga=GA1.1.932687991.1719332392&semt=ais_hybrid"
                            gold="50 Points = 37.5$"
                            platinum="100 Points = 2$"
                        />
                    </div>
                </div>
            </div>
        </div>
        
      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Start Earning Today!
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Sign up or log in to start earning points on your bookings or hosting activities.
        </p>
        <Link to="/Home">
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition duration-300">
          Get Started
        </button>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
};


const OfferCard = ({ title, image, silver, gold, platinum }) => {
  return (
      <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 overflow-hidden">
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <h3 className="relative text-2xl font-bold text-indigo-600 mb-4">{title}</h3>
          <div className="relative space-y-2">
              {silver && <p className="text-gray-700"><span className="font-semibold">Silver:</span> {silver}</p>}
              {gold && <p className="text-gray-700"><span className="font-semibold">Gold:</span> {gold}</p>}
              {platinum && <p className="text-gray-700"><span className="font-semibold">Platinum:</span> {platinum}</p>}
          </div>
      </div>
  );
};

export default OfferPage;
