import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../contexts/SharedState'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Loader from '../Loader'

export default function Forms() {
    const states = useContext(Context)
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        axios.get(states.hostname + '/api/dashboard/getForms', { params: { searchText, status: 'pending' } }).then(res => {
            const FormsData = res.data.allForms
            const FormsCount = res.data.formCount
            states.setAllForms({ data: FormsData })
            states.setFormCount(FormsCount)
        })
    }, [searchText]) //remove the searchText from here to stop overloading the server

    const handleApprove = (formID) => {
        states.setLoading(true)
        axios.post(states.hostname + '/api/dashboard/updateForm', { formID, status: 'approved' }).then(res => {
            setSearchText(' ')
            states.setLoading(false)
            states.showAlert("Form has been approved", 'lightgreen', 3000)
        })
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            console.log(searchText)
            const res = await axios.get(states.hostname + '/api/dashboard/getForms', { params: { searchText } });
            const FormsData = res.data
            states.setAllForms({ data: FormsData })
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const deleteform = async (formID) => {
        await axios.post(states.hostname + '/api/dashboard/deleteForm', { formID }).then(res => {
            setSearchText(' ')
            states.showAlert("Form Data Rejected", "red", 3000)
        })
    }

    if (!states.allForms.data.map || states.loading) {
        return (
            <>
                <div className='container mt-5'>
                    <Loader />
                </div>
            </>
        )
    }

    return (
        <>
            <div className='row'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10'>
                    <div className='container col-sm-11 mt-5 mb-5'>
                        <div className='text-start'>
                            <Link to='/dashboard' className='btn btn-dark d-inline-flex align-items-center'>
                                <span class="material-symbols-outlined fs-5">
                                    arrow_back_ios
                                </span>
                                Go back
                            </Link>
                        </div>
                        <div className='h2 mb-4'>Pending Forms</div>
                        <div className='h5 text-muted text-start mb-4'>Total Pending: {states.formCount} forms</div>

                        <div className='container p-4 mb-4 rounded d-flex text-center'>
                            <input className='form-control me-3 bg-secondary text-light' onChange={(e) => setSearchText(e.target.value)} placeholder='Search by student name' type='text'></input>
                            <button className='btn btn-outline-dark' onClick={handleSearch}>Search</button>
                        </div>
                        <div className='row row-cols-1 row-cols-md-3 g-4'>

                            {states.allForms.data.map(data => (
                                <div className='col'>
                                    <div class="card h-100">
                                        <div class="card-header text-start">
                                            Status: {data.status}
                                        </div>
                                        <div class="card-body text-start">
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
                                            {states.user.data.type === 'admin' ?
                                                <div className='text-end'>
                                                    <Link onClick={() => handleApprove(data._id)} class="nav-link text-success">
                                                        <span class="material-symbols-outlined">done_all</span>
                                                        Approve Form
                                                    </Link>
                                                </div> : ''}
                                        </div>
                                        <div class="card-footer text-body-secondary d-flex justify-content-between">
                                            Submitted on: {new Date(data.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                            <Link class="text-danger" onClick={() => deleteform(data._id)}><span class="material-symbols-outlined">delete_forever</span></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
