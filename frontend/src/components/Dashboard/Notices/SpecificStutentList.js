import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../contexts/SharedState'
import { Link } from 'react-router-dom'

export default function SpecificStudentList() {
    const states = useContext(Context)
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axios.get(states.hostname + '/api/dashboard/getForms', { params: { searchText, status: '' } }).then(res => {
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

    if (!states.allForms.data.map) {
        return <>Loading...</>
    }
    return (
        <>

            <div className='container col-sm-11 mt-5 mb-5'>

                <div className='container p-4 mb-4 rounded d-flex text-center'>
                    <input className='form-control me-3 bg-secondary text-light' onChange={(e) => setSearchText(e.target.value)} placeholder='Search by student name' type='text'></input>
                    <button className='btn btn-outline-dark' onClick={handleSearch}>Search</button>
                </div>
                <div className='row row-cols-1 row-cols-md-3 g-4'>

                    {states.allForms.data.map(data => (
                        <div className='col'>
                            <div class="card">
                                <div class="card-header text-start">
                                    Status: {data.status}
                                </div>
                                <div class="card-body text-start">
                                    <h3 class="card-title">{data.name}</h3>
                                    <div class="card-title">
                                        Enrollment for: Class {data.class}
                                    </div>
                                    <p class="card-text">
                                        Parents Name: {data.parentName}<br />
                                        Contact: {data.parentContact}<br />
                                    </p>
                                </div>
                                <div class="card-footer text-body-secondary d-flex justify-content-end">
                                    <Link to={`/dashboard/notices/to/${data.userid}`} class="btn d-inline-flex align-items-center text-danger"><span class="material-symbols-outlined me-1">mail</span>Send message</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>


        </>
    )
}
