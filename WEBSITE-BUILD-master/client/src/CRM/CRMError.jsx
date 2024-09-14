import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'


const CRMError = () => {
    return (
        <div>
            <div className="h-screen  bg-gradient-to-r from-slate-300 to-white flex flex-col justify-center items-center gap-5 tracking-wider text-lg">
                <div className='text-3xl flex gap-x-6  text-slate-700 font-bold py-4'> <FaExclamationTriangle /> Unauthorized Access</div>
                <div className='text-lg text-slate-800 font-semibold'>You are not authorized to access this page.</div>
                <Link to="/CRM/login" className='text-lg font-semibold text-blue-700 px-1 '> Login as Agent</Link>
            </div>
        </div>
    )
}

export default CRMError