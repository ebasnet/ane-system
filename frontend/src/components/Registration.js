import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/SharedState'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Registration() {
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

    const handleForm = (e) => {
        e.preventDefault();
        axios.post(states.hostname+'/api/register', formInput).then(res => {
            states.showAlert("Thank you for your submission", 'lightgreen', 3000)
            navigate('/')
        }). catch(error => {
            console.log(error)
            states.showAlert("Error while submitting the form", 'red', 2000)
    })
    }

    return (
        <>
            <div className='container text-start bg-dark text-light p-5 mt-3 col-sm-7 rounded appearfromTop'>
                <div className='text-primary text-center h1'>Blue Bird Admission Form</div>
                <div className='text-light text-center'>Please check the form twice before submission !</div>
                <hr className='w-50 m-auto'/>
                <form class="row g-3 mt-2">
                    <div class="col-md-8">
                        <label class="form-label">Student Full Name <span className='text-danger'>*</span></label>
                        <input type="text" class="form-control" name='name' onChange={handleInput} placeholder='Enter your full name' required/>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Entrance test mark<span className='text-danger'>*</span></label>
                        <input type="number" class="form-control" name='marks' onChange={handleInput} placeholder='Enter mark obtained' required/>
                    </div>
                    <div class="col-12">
                    <label for="inputState" class="form-label">Admission For <span className='text-danger'>*</span></label>
                        <select id="inputState" class="form-select" name='class' defaultValue='' onChange={handleInput} required>
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
                    <div class="col-md-6">
                        <label class="form-label">Parents Full Name <span className='text-danger'>*</span></label>
                        <input type="text" class="form-control" name='parentName' onChange={handleInput} placeholder='Enter parents name' required/>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Contact <span className='text-danger'>*</span></label>
                        <input type="number" class="form-control" name='parentContact' onChange={handleInput} placeholder='+91-' required/>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Previous School Name<span className='text-danger'>*</span></label>
                        <input type="text" class="form-control" name='prevSchool' onChange={handleInput} placeholder='Enter your previous school name' required/>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Previous School Address</label>
                        <input type="text" class="form-control" name='prevSchoolAddr' onChange={handleInput} placeholder='Enter your previous school address'/>
                    </div>
                    <div class="col-12">
                        <label class="form-label">Current Address <span className='text-danger'>*</span></label>
                        <input type="text" class="form-control" name='address' onChange={handleInput} placeholder='Enter your current address' required/>
                    </div>
                    <div class="col-md-5">
                        <label for="inputCity" class="form-label">Current City <span className='text-danger'>*</span></label>
                        <input type="text" class="form-control" name='city' onChange={handleInput} placeholder='Enter you city' required/>
                    </div>
                    <div class="col-md-4">
                        <label for="inputState" class="form-label">State <span className='text-danger'>*</span></label>
                        <select id="inputState" class="form-select" name='state' onChange={handleInput} required>
                        <option value=''>Choose...</option>
                                <option value='Kathmandu'>Kathmandu</option>
                                <option value='Pokhara'>Pokhara</option>
                                <option value='Lalitpur'>Lalitpur</option>
                                <option value='Bhaktapur'>Bhaktapur</option>
                                <option value='Chitwan'>Chitwan</option>
                                <option value='Pokhara'>Pokhara</option>
                                <option value='Biratnagar'>Biratnagar</option>
                                <option value='Janakpur'>Janakpur</option>
                                <option value='Butwal'>Butwal</option>
                                <option value='Dhangadhi'>Dhangadhi</option>

                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="inputZip" class="form-label">Pincode <span className='text-danger'>*</span></label>
                        <input type="number" class="form-control" name='pincode' onChange={handleInput} placeholder='area code' required/>
                    </div>
                    <div class="col-12 text-center mt-5">
                    <p className='text-light text-center'>Confirmation email will be sent on {states.user.data.email} </p>
                    <hr/>

                        <button type="submit" class="btn btn-primary" onClick={handleForm}>Register Now</button>
                    </div>
                </form>
            </div>
        </>
    )
}
