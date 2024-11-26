import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from '../../../contexts/SharedState';
import { useNavigate } from 'react-router-dom';

export default function SendtoAll() {
    const states = useContext(Context)
    const navigate = useNavigate()

    const [formInput, setformInput] = useState({})
    const handleInput = (e) => {
        const { name, value } = e.target;
        setformInput({
            ...formInput,
            [name]: value
        })
    }

    const handleSubmit = () => {
        axios.post(states.hostname + '/api/dashboard/notices', { formInput, type: 'all' }).then(res => {
            navigate('/dashboard')
            states.showAlert("Message Sent to all", 'lightgreen', 3000)
        })
    }

    return (
        <>
            <div className='container col-sm-6 text-start mt-5 border border-3 p-4 rounded'>
                <div className='text-muted mb-3'>The below notice will be notified to all BBES approved students.</div>
                <hr className='w-25' />
                <div className="mb-3 fs-5">
                    <label className="form-label">Title <span className='text-danger'>*</span></label>
                    <input type="text" className="form-control" placeholder="Enter your notice title" name='title' onChange={handleInput} />
                </div>
                <div className="mb-3 fs-5">
                    <label className="form-label">Message <span className='text-danger'>*</span></label>
                    <textarea className="form-control" rows="5" name='message' onChange={handleInput}
                        placeholder='Enter the notice description in details'>
                    </textarea>
                </div>
                <div className='btn btn-primary d-block' onClick={handleSubmit}>Send to all</div>
            </div>
        </>
    )
}
