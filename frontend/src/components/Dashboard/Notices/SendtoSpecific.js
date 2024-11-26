import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../contexts/SharedState';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function SendtoSpecific() {
    const states = useContext(Context)
    const params = useParams()
    const userid = params.userid

    const [formInput, setformInput] = useState({})

    const [student, setStudent] = useState()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setformInput({
            ...formInput,
            [name]: value
        })
    }

    useEffect(() => {
        const getdata = async () => {
            const res = await axios.get(states.hostname + '/api/handleuser/getstudentdata', { params: { userid } }).then(res => {
                setStudent(res)
            }).catch(error => {
                console.log(error)
            })
        }
        getdata();
    }, [])

    if (!states.user.data) {
        return <>Loading...</>
    }

    return (
        <>
            <div className='container text-start mt-5'>
                <Link to='/dashboard/notices' className='btn btn-dark d-inline-flex align-items-center'>
                    <span class="material-symbols-outlined fs-5 ">
                        arrow_back_ios
                    </span>
                    Go back
                </Link>
            </div>
            {student && student.data.username === undefined ?
                <div className='h3 text-danger fw-bold mt-3'>The user credentials doesn't exist in database! </div>
                : <>
                    <div className='container col-sm-6 text-start mt-5 border border-3 p-4 rounded'>
                        <div className='text-muted mb-3'>The below notice will be notified to {student && student.data.username}</div>
                        <hr className='w-25' />
                        <div className="mb-3 fs-5">
                            <label className="form-label">Title <span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" placeholder="Enter your notice title" name='title' onChange={handleInput} />
                        </div>
                        <div className="mb-3 fs-5">
                            <label className="form-label">Message <span className='text-danger'>*</span></label>
                            <textarea className="form-control" rows="5" name='message' onChange={handleInput}
                                placeholder='Enter the notice description in details'></textarea>
                        </div>

                        <div className="btn btn-primary d-block">Notify {student && student.data.username}</div>
                    </div>
                </>}
        </>
    )
}
