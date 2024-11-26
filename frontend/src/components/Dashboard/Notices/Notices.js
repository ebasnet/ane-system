import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import SpecificStudentList from './SpecificStutentList'
import SendtoAll from './SendtoAll'
import { Link } from 'react-router-dom'

export default function Notices() {
    const [select, setSelect] = useState()

    return (
        <>
            <div className='row'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10'>
                    <div className='container mt-5 col-sm-10 text-start'>
                    <div className='text-start mb-4'>
                            <Link to='/dashboard' className='btn btn-dark d-inline-flex align-items-center'>
                                <span class="material-symbols-outlined fs-5">
                                    arrow_back_ios
                                </span>
                                Go back
                            </Link>
                        </div>
                        <label for="inputState" class="form-label fs-3">Send Notice To <span className='text-danger'>*</span></label>
                        <select id="inputState" class="form-select" defaultValue='' onChange={(e) => setSelect(e.target.value)} required>
                            <option value='' disabled>Choose only one / All students...</option>
                            <option value='specific'>Specific student</option>
                            <option value='all'>Send to all</option>
                        </select>
                    </div>

                    {select === 'specific' ? (
                        <SpecificStudentList />

                    ) : select === 'all' ? (
                        <SendtoAll />

                    ) : (
                        null)}


                </div>
            </div>
        </>
    )
}
