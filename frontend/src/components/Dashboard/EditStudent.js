import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../contexts/SharedState'
import Loader from '../Loader'

export default function EditStudent() {
    const states = useContext(Context)
    const navigate = useNavigate()
    const params = useParams()
    const formid = params.formid

    useEffect(() => {
        states.setAllForms({ data: '' })
        axios.get(states.hostname + '/api/dashboard/getForms', { params: { formid } }).then(res => {
            const FormsData = res.data.allForms
            const FormsCount = res.data.formCount
            states.setAllForms({ data: FormsData })
            states.setFormCount(FormsCount)
        })
    }, [])

    const [formInput, setformInput] = useState({})
    const handleInput = (e) => {
        const { name, value } = e.target;
        setformInput({
            ...formInput,
            [name]: value
        })
    }

    const handleEdit = async (e, formID, name) => {
        e.preventDefault();
        try {
            await axios.post(states.hostname + '/api/dashboard/updateForm', { formID, formInput })
            states.showAlert(`${name} Updated Successfully`, "lightgreen", 3000)
            navigate(-1)
        } catch (error) {
            states.showAlert("Error while updating data", "red", 3000)
        }
    }


    if (!states.allForms.data.map) {
        return <Loader />
    }

    return (
        <>
            {states.allForms.data.map(data => (
                <React.Fragment key={data._id}>
                    <div className='container text-start mt-3'>
                        <a onClick={() => navigate(-1)} className=' btn btn-dark d-inline-flex align-items-center'>
                            <span className="material-symbols-outlined fs-5">
                                arrow_back_ios
                            </span>
                            Go back
                        </a>
                    </div>
                    <div className='container text-start bg-dark text-light p-4 mt-3 col-sm-7 rounded appearfromTop'>
                        <div className='h1 text-center'>{data.name}</div>
                        <hr className='w-50 m-auto' />
                        <form className="row g-3 mt-3">
                            <div className="col-md-8">
                                <label className="form-label">Student Full Name <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" name='name' defaultValue={data.name} onChange={handleInput} placeholder='Enter your full name' required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Entrance test mark<span className='text-danger'>*</span></label>
                                <input type="number" className="form-control" name='marks' defaultValue={data.marks} onChange={handleInput} placeholder='Enter mark obtained' required />
                            </div>
                            <div className="col-12">
                                <label for="inputState" className="form-label">Admission For <span className='text-danger'>*</span></label>
                                <select id="inputState" className="form-select" name='class' defaultValue={data.class} onChange={handleInput} required>
                                    <option value='' disabled>On which class you want admission...</option>
                                    <option value='1'>Class 1</option>
                                    <option value='2'>Class 2</option>
                                    <option value='3'>Class 3</option>
                                    <option value='4'>Class 4</option>
                                    <option value='5'>Class 5</option>
                                    <option value='6'>Class 6</option>
                                    <option value='7'>Class 7</option>
                                    <option value='8'>Class 8</option>
                                    <option value='9'>Class 9</option>
                                    <option value='10'>Class 9</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Parents Full Name <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" name='parentName' defaultValue={data.parentName} onChange={handleInput} placeholder='Enter parents name' required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Contact <span className='text-danger'>*</span></label>
                                <input type="number" className="form-control" name='parentContact' defaultValue={data.parentContact} onChange={handleInput} placeholder='+91-' required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Previous School Name<span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" name='prevSchool' defaultValue={data.prevSchool} onChange={handleInput} placeholder='Enter your previous school name' required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Previous School Address</label>
                                <input type="text" className="form-control" name='prevSchoolAddr' defaultValue={data.prevSchoolAddr} onChange={handleInput} placeholder='Enter your previous school address' />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Current Address <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" name='address' defaultValue={data.address} onChange={handleInput} placeholder='Enter your current address' required />
                            </div>
                            <div className="col-md-5">
                                <label for="inputCity" className="form-label">Current City <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control" name='city' defaultValue={data.city} onChange={handleInput} placeholder='Enter you city' required />
                            </div>
                            <div className="col-md-4">
                                <label for="inputState" className="form-label">State <span className='text-danger'>*</span></label>
                                <select id="inputState" className="form-select" name='state' defaultValue={data.state} onChange={handleInput} required>
                                    <option value='' disabled>Choose...</option>
                                    <option value='Delhi'>Delhi</option>
                                    <option value='Hydrabad'>Hydrabad</option>
                                    <option value='Karnataka'>Karnataka</option>
                                    <option value='Mumbai'>Mumbai</option>
                                    <option value='Tamil Nadu'>Tamil Nadu</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label for="inputZip" className="form-label">Pincode <span className='text-danger'>*</span></label>
                                <input type="number" className="form-control" name='pincode' defaultValue={data.pincode} onChange={handleInput} placeholder='area code' required />
                            </div>
                            {states.user.data.type === 'admin' ?
                                <div className="col-md-4 mt-5">
                                    <label for="inputState" className="form-label">Form Status <span className='text-danger'>*</span></label>
                                    <select id="inputState" className="form-select" name='status' defaultValue={data.status} onChange={handleInput} required>
                                        <option value='' disabled>Choose...</option>
                                        <option value='approved'>Approved</option>
                                        <option value='pending'>Pending</option>
                                        <option value='rejected'>Rejected</option>
                                    </select>
                                </div> : ''}
                            <div className="col-12 text-center">
                                <hr />
                                <button type="submit" className="btn btn-primary" onClick={(e) => handleEdit(e, data._id, data.name)}>Update Details</button>
                            </div>
                        </form>
                    </div>
                </React.Fragment>
            ))}
        </>
    )
}
