import React from 'react'
import Header from '../components/Header2'
import Footer from '../components/GFOOTER'
//import { useSelector } from 'react-redux'

const GPAY = () => {
  return (
    <>
    <Header/>
    <div className="py-16 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 sm:p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Payment</h2>
        <div className="flex justify-center mb-4">
        <img src="/assets/payment.png" alt="payment" />
        </div>

        <div className="text-center text-lg font-semibold mb-2">Payment amount</div>
        <div className="text-center text-xl mb-6">$999</div>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name on card</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
              placeholder="Name on card"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Card number</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
              placeholder="Card number"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Expiry date</label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                placeholder="MM / YY"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Security code</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                placeholder="CVV"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">ZIP/Postal code</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
              placeholder="ZIP/Postal code"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 transition-colors"
          >
            Pay $999
          </button>
        </form>
      </div>
    </div>

        <Footer/>
    </>
  )
}

export default GPAY