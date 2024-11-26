import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../contexts/SharedState'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import Loader from '../Loader'

export default function Students() {
    const states = useContext(Context)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.put(states.hostname + '/api/dashboard/getStudents/?class=' + params.class).then(res => {
            const FormsData = res.data.allForms
            const FormsCount = res.data.formCount
            states.setAllForms({ data: FormsData })
            states.setFormCount(FormsCount)
        })
    }, [])

    const handleEdit = (formid) => {
        navigate('/dashboard/edit/' + formid)
    }

    if (!states.allForms.data.map) {
        return <Loader />
    }
    return (
        <>
            <div className='row'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10'>
                    <div className='container col-sm-11 mt-5'>
                        <div className='text-start'>
                            <Link to='/dashboard/classes' className='btn btn-dark d-inline-flex align-items-center'>
                                <span class="material-symbols-outlined ">
                                    arrow_back_ios
                                </span>
                                Go back
                            </Link>
                        </div>
                        <div className='h2 mb-4 mt-4'>Students of Class {params.class}</div>
                        <div className='h5 text-muted text-start mb-4'>Total Student: {states.formCount}</div>
                        <div className='row row-cols-1 row-cols-md-3 g-4'>

                            {states.allForms.data.map(data => (
                                <div className='col'>
                                    <div class="card h-100">
                                        <div class="card-body text-start">
                                            <a class="nav-link text-success d-flex justify-content-end" onClick={() => (handleEdit(data._id))}>
                                                <span class="material-symbols-outlined">edit_square</span>
                                            </a>
                                            <h3 class="card-title">{data.name}</h3>
                                            <div class="card-title">
                                                Entrance Marks: {data.marks}<br />
                                            </div>
                                            <p class="card-text">
                                                Parents Name: {data.parentName}<br />
                                                Contact: {data.parentContact}<br />
                                                Address: {data.address}, {data.city}, {data.state} - {data.pincode}<br />
                                                Old School: {data.prevSchool}<br />
                                            </p>
                                        </div>
                                        <div class="card-footer text-body-secondary d-flex justify-content-between">
                                            Approved on: {new Date(data.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                            <Link class="text-danger"><span class="material-symbols-outlined">delete_forever</span></Link>
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

