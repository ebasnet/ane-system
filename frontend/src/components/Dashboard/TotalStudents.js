import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../contexts/SharedState'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Loader from '../Loader'

export default function TotalStudents() {
    const states = useContext(Context)
    const navigate = useNavigate()

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axios.get(states.hostname + '/api/dashboard/getForms', { params: { searchText, status: 'approved' } }).then(res => {
            const FormsData = res.data.allForms
            const FormsCount = res.data.formCount
            states.setAllForms({ data: FormsData })
            states.setFormCount(FormsCount)
        })
    }, [searchText]) //remove the searchText from here to stop overloading the server


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

    const handleEdit = (formid)=> {
        navigate('/dashboard/edit/'+formid)
    }

    if (!states.allForms.data.map) {
        return <Loader/>
    }
    return (
        <>
            <div className='row'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10'>
                    <div className='container col-sm-11 mt-5 mb-5'>
                        <div className='h1 text-primary mb-4'>Blue Bird English School</div>
                        <div className='h5 text-muted text-start'>Total Students: {states.formCount}</div>

                        <div className='container p-4 mb-4 rounded d-flex text-center'>
                            <input className='form-control me-3 bg-secondary text-light' onChange={(e) => setSearchText(e.target.value)} placeholder='Search by student name' type='text'></input>
                            <span class="d-inline-block" tabindex="0">
                            <button className='btn btn-outline-dark' onClick={handleSearch}>Search</button>
                            </span>
                        </div>
                        <div className='row row-cols-1 row-cols-md-3 g-4'>

                            {states.allForms.data.map(data => (
                                <div className='col'>
                                    <div class="card h-100">
                                        <div class="card-header text-start d-flex justify-content-between">
                                            Status: {data.status}

                                            <a class="nav-link d-inline-flex align-items-center" onClick={()=>(handleEdit(data._id))}>
                                                <span class="material-symbols-outlined text-success">edit_square</span>
                                            </a>

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
                                        </div>
                                        <div class="card-footer text-body-secondary d-flex justify-content-between">
                                            Joined: {new Date(data.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}

                                            <Link class="nav-link text-danger d-inline-flex align-items-center">
                                                <span class="material-symbols-outlined">delete_forever</span>
                                                Delete
                                                </Link>
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
