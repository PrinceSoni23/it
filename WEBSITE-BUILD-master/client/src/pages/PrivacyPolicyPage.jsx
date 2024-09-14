import React from 'react';
import logo from "../assets/TripItLOGO.png"; // Update this with your logo's correct path
import Header2 from "../components/Header2";
import GFooter from "../components/GFOOTER";

const PrivacyPolicyPage = () => {
 
  return (
    
    <>
     <Header2 />
    
    <div className="flex flex-col items-center p-5 min-h-screen w-full box-border bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/white-background-with-quote-from-artist-artist_1290686-24285.jpg?ga=GA1.1.452232739.1704961335&semt=ais_hybrid')" }}>
      <header className="mb-7 text-center">
        <img src={logo} alt="TripItToday Logo" className="max-w-xs h-28 bg-none border-none" />
      </header>
      <div className="flex flex-col gap-5 w-11/12 px-2 mb-5">
        <div className="bg-white/90 rounded-lg shadow-lg p-3 hover:translate-y-1 transition-transform">
          <h1 className="text-2xl mb-2 text-gray-800">Privacy Policy - Trip It Today</h1>
          <h6 className="text-lg font-light mb-2 text-gray-800">Last Updated: 23-08-2024</h6>
        </div>

        <div className="bg-white/90 rounded-lg shadow-lg p-3">
          <p className="text-lg text-gray-600">At Trip It Today (“we” or “us”), your privacy is crucial. We are dedicated to safeguarding your personal information and want to be transparent about how we manage it. This Privacy Policy explains our practices regarding the collection, use, and sharing of your personal data when you use our platform and services. It also outlines your rights concerning your personal information and how you can get in touch with us.</p>
        </div>

        <div className="bg-white/90 rounded-lg shadow-lg p-3">
          <h2 className="text-xl text-red-900 underline">Overview of Our Privacy Policy</h2>
          <p className="text-lg text-gray-600">This summary gives you an overview of our Privacy Policy. For a comprehensive explanation, please click here or continue reading below.</p>
          <br />
          <h3 className="text-lg text-gray-800">Scope of This Privacy Policy:</h3>
          <p className="text-lg text-gray-600">This Privacy Policy describes:</p>
          <ul className="list-decimal pl-7 text-lg font-serif text-gray-600">
            <li>The types of personal data we collect and how we use it</li>
            <li>When and with whom we share your personal information</li>
            <li>Your options regarding how we use and share your data</li>
            <li>How you can access and update your personal information</li>
          </ul>
          <br />
          <h3 className="text-lg text-gray-800">How We Collect and Use Your Personal Data:</h3>
          <p className="text-lg text-gray-600">We collect personal information in the following ways:</p>
          <ul className="list-decimal pl-7 text-lg font-serif text-gray-600">
            <li><span className="font-bold">Directly from You:</span> When you create an account, sign up for offers, or make a booking on our platform, you provide us with your personal details.</li>
            <li><span className="font-bold">Automatically:</span> We use automated technologies like cookies (with your consent where necessary) to collect data when you visit our sites or use our apps.</li>
            <li><span className="font-bold">From Third Parties:</span> We also receive personal data from affiliated entities, business partners, and other third parties. This helps us improve our services, keep accurate records, detect and prevent fraud, and market our offerings effectively.</li>
          </ul>
          <br />
          <h3 className="text-lg text-gray-800">How We Share Your Personal Information:</h3>
          <p className="text-lg text-gray-600">Your personal data may be shared for various purposes, including:</p>
          <ul className="list-decimal pl-7 text-lg font-serif text-gray-600">
            <li>To facilitate your travel bookings and accommodation arrangements</li>
            <li>To support you during your travel or stay</li>
            <li>To communicate with you, including sending information about our services or connecting you with travel providers and property owners</li>
            <li>To comply with legal requirements</li>
          </ul>
          <p className="text-lg text-gray-600">For more details on how we share your information, refer to the full Privacy Policy below.</p>
          <br />
          <h3 className="text-lg text-gray-800">Your Rights and Choices:</h3>
          <p className="text-lg text-gray-600">You have several options to manage your personal data. For example, you can opt out of marketing communications by clicking the “unsubscribe” link in emails, adjusting your account settings, or contacting our customer support team. The full Privacy Policy provides additional information on your rights and available choices.</p>
          <br />
          <h3 className="text-lg text-gray-800">Contact Us:</h3>
          <p className="text-lg text-gray-600">For more information about our privacy practices or to make inquiries or requests regarding your personal data, please refer to the “Contact Us” section in the full Privacy Policy.</p>
          <br />
          <h3 className="text-lg text-gray-800">Collection and Utilization of Personal Data:</h3>
          <p className="text-lg text-gray-600">In this section, we provide details on:</p>
          <ul className="list-decimal pl-7 text-lg font-serif text-gray-600">
            <li>The types of personal data we gather and utilize</li>
            <li>Our methods for collecting and using this data</li>
            <li>The reasons for collecting and using it</li>
            <li>The legal grounds for our data collection and use</li>
          </ul>
        </div>

        <div className="bg-white/90 rounded-lg shadow-lg p-3">
          <h2 className="text-xl text-red-900">Legal Grounds for Data Processing</h2>
          <p className="text-lg text-gray-600">Below, you will find the legal bases we rely on to collect and use your personal information:</p>
          <ul className="list-decimal pl-7 text-lg font-serif text-gray-600">
            <li><span className="font-bold">Consent:</span> We process your personal data when you have given us explicit permission to do so, such as subscribing to our marketing communications where consent is required.</li>
            <li><span className="font-bold">Legal Obligation:</span> We process your data to meet legal requirements, such as fulfilling our financial and tax obligations through the use of your transaction history.</li>
            <li><span className="font-bold">Contract Performance:</span> We use your personal data when it is necessary to fulfill a contract with you. This includes tasks such as managing your bookings, processing payments, or setting up an account upon your request.
              <br />
              <br />
              <p className="text-lg text-gray-600">When we need to collect personal data to comply with legal obligations or perform a contract, we will inform you clearly and explain whether providing this data is mandatory or optional, along with the potential consequences of not providing it.</p>
            </li>
            <li><span className="font-bold">Legitimate Interests:</span> We may process your data based on our legitimate interests, provided these interests are not overridden by your rights. This includes operating and enhancing our platform, communicating with you to deliver our services, ensuring security, responding to inquiries, conducting marketing activities, or detecting/preventing illegal activities.
              <br />
              <br />
              <p className="text-lg text-gray-600">In certain regions, we are permitted to process data based on legitimate interests. We carefully balance our use of your data against your rights and freedoms globally.</p>
            </li>
          </ul>
        </div>

        <div className="bg-white/90 rounded-lg shadow-lg p-3">
          <h2 className="text-xl text-red-900">Types of Personal Data We Collect and Use</h2>
          <p className="text-lg text-gray-600">We gather personal data for the following purposes:</p>
          <ul className="list-decimal pl-7 text-lg font-serif text-gray-600">
            <li><span className="font-bold">Platform Usage and Booking:</span>
              <ul className="list-disc pl-7 text-gray-600">
                <li>Facilitate your bookings, confirm your identity, and process travel insurance.</li>
                <li>Handle the booking of travel or vacation properties.</li>
                <li>Provide services related to your booking and account.</li>
                <li>Create, maintain, and update your user account, and authenticate you.</li>
                <li>Keep track of your search and travel history, preferences, and other relevant information.</li>
                <li>Process payments, coupons, and transactions, including handling customer support and service-related inquiries.</li>
              </ul>
            </li>
            <li><span className="font-bold">Marketing and Communications:</span>
              <ul className="list-disc pl-7 text-gray-600">
                <li>Communicate updates and offers relevant to your travel needs, and send newsletters or promotional materials.</li>
                <li>Carry out targeted marketing activities, including advertisements and special promotions.</li>
              </ul>
            </li>
            <li><span className="font-bold">Site Analytics and Improvements:</span>
              <ul className="list-disc pl-7 text-gray-600">
                <li>Analyze user interactions to enhance platform performance and user experience.</li>
                <li>Collect and review feedback and usage patterns.</li>
              </ul>
            </li>
            <li><span className="font-bold">Compliance and Security:</span>
              <ul className="list-disc pl-7 text-gray-600">
                <li>Protect your personal data, maintain platform integrity, and prevent fraud or security breaches.</li>
                <li>Ensure compliance with legal and regulatory requirements.</li>
              </ul>
            </li>
          </ul>
        </div>
        
      </div>
      
    </div>
    <GFooter />
    </>
  );
  
};


export default PrivacyPolicyPage;
