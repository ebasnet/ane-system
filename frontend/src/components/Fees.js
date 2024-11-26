import React, { useState } from 'react';
import Sidebar from './Dashboard/Sidebar';
import UserSidebar from './UserDashboard/UserSidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom'

const feesData = [
    { classLevel: 'Nursery', admission: 5000, annualFees: 5000, labFee: 2500, monthlyFee: 2000, totalNew: 14500, totalOld: 9500, examFee: 500 },
    { classLevel: 'JKG', admission: 5000, annualFees: 5000, labFee: 3000, monthlyFee: 2100, totalNew: 15100, totalOld: 10100, examFee: 500 },
    { classLevel: 'SKG', admission: 5000, annualFees: 5000, labFee: 3500, monthlyFee: 2200, totalNew: 15700, totalOld: 10700, examFee: 500 },
    { classLevel: '1', admission: 6000, annualFees: 5100, labFee: 200, monthlyFee: 2400, totalNew: 13700, totalOld: 700, examFee: 500 },
    { classLevel: '2', admission: 6000, annualFees: 5200, labFee: 200, monthlyFee: 2500, totalNew: 13900, totalOld: 7900, examFee: 500 },
    { classLevel: '3', admission: 6000, annualFees: 5300, labFee: 200, monthlyFee: 2600, totalNew: 14100, totalOld: 700, examFee: 500 },
    { classLevel: '4', admission: 6500, annualFees: 5500, labFee: 300, monthlyFee: 2700, totalNew: 15000, totalOld: 8500, examFee: 700 },
    { classLevel: '5', admission: 6500, annualFees: 6000, labFee: 300, monthlyFee: 2800, totalNew: 15600, totalOld: 7000, examFee: 700 },
    { classLevel: '6', admission: 7000, annualFees: 6500, labFee: 300, monthlyFee: 3200, totalNew: 17000, totalOld: 10000, examFee: 750 },
    { classLevel: '7', admission: 7500, annualFees: 6500, labFee: 300, monthlyFee: 3400, totalNew: 17700, totalOld: 10600, examFee: 750 },
    { classLevel: '8', admission: 8000, annualFees: 7000, labFee: 3600, monthlyFee: 4000, totalNew: 18600, totalOld: 21500, examFee: 11500 },
    { classLevel: '9', admission: 10000, annualFees: 7500, labFee: 0, monthlyFee: 0, totalNew: 22500, totalOld: 12500, examFee: 1000 },
    { classLevel: '10', admission: 10000, annualFees: 8000, labFee: 0, monthlyFee: 4500, totalNew: 22500, totalOld: 12500, examFee: 1000 },
];

export default function Fees() {
    const location = useLocation()
    const [selectedClass, setSelectedClass] = useState('');

    // Find the selected class details
    const selectedFeeDetails = feesData.find(fee => fee.classLevel === selectedClass);

    // Calculate the total (assuming totalNew is the initial total)
    let total = 0;
    if (selectedFeeDetails) {
        total = selectedFeeDetails.totalNew + selectedFeeDetails.examFee;
        // Assuming the totalNew does not include examFee by default, add other fees if necessary
    }

    return (
        <div className='row'>
            <div className='col-sm-2'>
                {location.pathname.startsWith('/dashboard')?<Sidebar />:<UserSidebar/>}
                
            </div>
            <div className='col-sm-10'>
                <div className='container col-sm-8 mt-5 text-start'>
                    <h1 className='text-center'>Fee Details</h1>
                    
                    <label className='form-label'>Select Class: </label>
                    <select className='form-select' value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        <option value="" disabled> --Please choose a class-- </option>
                        {feesData.map((fee, index) => (
                            <option key={index} value={fee.classLevel}>{fee.classLevel}</option>
                        ))}
                    </select>

                    {selectedClass && selectedFeeDetails && (
                        <div className='mt-4'>
                            <h4>Details for Class {selectedClass}</h4>
                            
                            <ul class="list-group">
                                <li className='list-group-item'>Admission Fee: {selectedFeeDetails.admission}</li>
                                <li className='list-group-item'>Annual Fees: {selectedFeeDetails.annualFees}</li>
                                <li className='list-group-item'>Lab Fee: {selectedFeeDetails.labFee}</li>
                                <li className='list-group-item'>Monthly Fee: {selectedFeeDetails.monthlyFee}</li>
                                <li className='list-group-item'>Exam Fee: {selectedFeeDetails.examFee}</li>
                                <li className='list-group-item fw-bold'>Total (including exam fee): {total}</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};