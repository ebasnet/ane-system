import React, { useContext, useState } from 'react'
import Loader from '../Loader'
import { Context } from '../../contexts/SharedState'
import axios from 'axios'
import Getuser from './Getuser'
import UserSidebar from '../UserDashboard/UserSidebar'
import Sidebar from '../Dashboard/Sidebar'

export default function ProfileSettings() {
    const states = useContext(Context)
    const [edit, setEdit] = useState(false)

    const [userInput, setUserInput] = useState({})
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...states.user.data,
            [name]: value
        })
    }

    const handleChanges = (e) => {
        e.preventDefault();
        states.setLoading(true)
        axios.post(states.hostname + '/api/handleuser/edit', userInput)
            .then(async res => {
                await Getuser(states);
                states.showAlert('User details updated successfully', 'lightgreen', 3000)
                states.setLoading(false)
            })
            .catch(error => {
                states.setLoading(false)
                states.showAlert(error.data.message, 'red', 3000)
            })
        setEdit(false)
    }


    if (!states.user.data) {
        return (
            <Loader />
        )
    }
    return (
        <>
            {states.loading && <Loader />}
            <div className='row'>
                <div className='col-sm-2'>
                    {states.user.data.type === 'user' ? <UserSidebar /> : <Sidebar />}
                </div>
                <div className='col-sm-10'>
                    <div className='container col-sm-8 mt-5'>
                        <div className='row'>
                            <div className='col-sm-6 text-center border-end'>
                                <span className="material-symbols-outlined" style={{ fontSize: '17rem' }}>
                                    account_circle
                                </span><br />
                                <span className='fs-2'>{states.user.data.username}</span>
                            </div>

                            <div className='col-sm-6 mt-3 text-start'>
                                <form>
                                    <div className="mb-3">
                                        <label className="fs-4">Name</label>
                                        {edit ?
                                            <input type="text" className="form-control border-5" name='username' defaultValue={states.user.data.username} onChange={handleInput} required /> :
                                            <div className='fw-bold fs-6 ms-4'>{states.user.data.username}</div>
                                        }

                                    </div>

                                    <div className="mb-3">
                                        <label className="fs-4">Phone</label>
                                        {edit ?
                                            <input type="tel" className="form-control border-5" name='phone' defaultValue={states.user.data.phone} onChange={handleInput} required /> :
                                            <div className='fw-bold fs-6 ms-4'>{states.user.data.phone}</div>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label className="fs-4">Email</label>
                                        <div className='fw-bold fs-6 ms-4'>{states.user.data.email}</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="fs-4">Password</label>
                                        <div className='fw-bold fs-6 ms-4'>* * * * * * * * * * *</div>
                                    </div>

                                    <div className='text-end mt-5'>
                                        {edit ?
                                            <>
                                                <button className='btn btn-danger me-2' onClick={(e) => (e.preventDefault(), states.showAlert("Not available right now", 'red', 2000))}>Change Password</button>
                                                <button className='btn btn-success' onClick={handleChanges}>Save Changes</button>
                                            </> :

                                            <>
                                                <button className='btn btn-danger me-2' onClick={(e) => (e.preventDefault(), states.showAlert("Not available right now", 'red', 2000))}>Delete account</button>
                                                <button className='btn btn-outline-dark d-inline-flex align-items-center' onClick={(e) => (e.preventDefault(), setEdit(true))}>
                                                    <span class="material-symbols-outlined me-1 fs-5">
                                                        edit
                                                    </span>
                                                    Edit</button>
                                            </>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
