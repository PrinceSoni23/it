import React from 'react';
import {Link} from "react-router-dom";

const ContactPage = () => {
    // State to manage form inputs
    // const [stdCode, setStdCode] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [error, setError] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Basic validation
    //     if (!stdCode || !phoneNumber) {
    //         setError('Please fill out both fields.');
    //         return;
    //     }
    //     // Submit form or handle input values
    //     console.log('STD Code:', stdCode);
    //     console.log('Phone Number:', phoneNumber);
    //     setError('');
    // };

    return (
        <div className="bg-fixed h-[80vh] flex flex-col sm:flex-row justify-around items-center bg-slate-100 py-10 gap-y-5" style={{ backgroundImage: "url('https://accessnsite.com/wp-content/uploads/2020/05/page-heading-background-contact-us.jpg')" }}>
            <div className='mb-4 px-4 '>
                <div className="text-3xl text-center text-white font-libre font-bold capitalizepy-2">Got any query? </div>
                <p className="text-sm md:text-lg px-2 md:px-6 text-center text-white/80 font-libre">We are here to help. We will get back to you soon.</p>
            </div>
            <Link to="/contact" className="animate-bounce  text-white py-2 px-4 rounded-md shadow-sm hover:bg-slate-900">
                CONTACT US
            </Link>

            {/* <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-md p-5 md:p-6 "
            >
                <div className="mb-4">
                    <label htmlFor="std-code" className="block text-xs md:text-sm font-semibold md:text-medium text-gray-700">
                        STD Code
                    </label>
                    <input
                        type="text"
                        id="std-code"
                        value={stdCode}
                        onChange={(e) => setStdCode(e.target.value)}
                        className="mt-1 block w-full border border-slate-300 rounded-sm text-sm md:text-md shadow-sm p-1 md:p-2 focus:outline-none"
                        placeholder="+91" // Example placeholder
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone-number" className="block text-xs md:text-sm font-semibold md:text-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phone-number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full border border-slate-300 rounded-sm text-sm md:text-md shadow-sm p-1 md:p-2 focus:outline-none"
                        placeholder="123-456-7890" // Example placeholder
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-slate-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-slate-900 "
                >
                    Submit
                </button>
            </form> */}
        </div>
    );
};

export default ContactPage;
