import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../contexts/SharedState'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import UserSidebar from './UserSidebar'
import UserFees from './UserFees'

export default function UserDashboard() {
    const states = useContext(Context)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(states.hostname + '/api/dashboard/getForms').then(res => {
            const FormsData = res.data.allForms
            states.setAllForms({ data: FormsData })
        }).catch(error => {
            navigate('/login')
            states.showAlert("Please login to continue", 'red', 2000)
        })
    }, [])

    const handleEdit = (formid) => {
        navigate('/dashboard/edit/' + formid)
    }

    function handlePayment(classLevel) {
        // states.setSelectedClass('8')
        states.setSelectedClass(classLevel.toString())
    }

    if (!states.allForms.data.map) {
        return <Loader />
    }
    return (
        <>

            <div className='row'>
                <div className='col-sm-2'>
                    <UserSidebar />
                </div>
                <div className='col-sm-10'>
                    <div className='container mt-5'>
                        <div className='text-start h2 mt-4'>My Details</div>
                        <div className='text-start text-muted fs-6 mb-4'>Data can only be edited after admin approval.</div>
                        {states.allForms.data && states.allForms.data.map(data => (
                            <div className='row g-4'>
                                <div className='col-sm-8'>
                                    <div class="card">
                                        <div class="card-header text-start d-flex justify-content-between">
                                            Status: {data.status}
                                            <a class="nav-link d-inline-flex align-items-center" onClick={() => (handleEdit(data._id))}>
                                                <span class="material-symbols-outlined text-success">edit_square</span>
                                            </a>
                                        </div>

                                        <div class="card-body text-start ">
                                            <h3 class="card-title">{data.name}</h3>
                                            <div class="card-title">
                                                Enrollment for: Class {data.class}<br />
                                                Marks: {data.marks}<br />
                                            </div>
                                            <p class="card-text">
                                                Parents Name: {data.parentName}<br />
                                                Contact: {data.parentContact}<br />
                                                Address: {data.address}, {data.city}, {data.state} - {data.pincode}<br />
                                                Old School: {data.prevSchool}<br />
                                            </p>
                                        </div>
                                        <div class="card-footer text-body-secondary d-flex justify-content-between">
                                            Submitted on: {new Date(data.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                            {data.status === 'pending' ?
                                                <Link class="text-danger"><span class="material-symbols-outlined">delete_forever</span></Link> : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='container'>
                                        <div className='text-start text-muted fs-6 mb-4'>You can do the online payment once your form is approved.</div>
                                        {handlePayment(data.class)}
                                        {data.status === 'approved' ?
                                            (<>
                                                <UserFees />
                                                <button className='container btn btn-success d-block mt-2'>Pay now</button>
                                            </>
                                            ) : data.status === 'rejected' ? '' : ''}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
