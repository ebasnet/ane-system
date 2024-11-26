import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Context } from '../../contexts/SharedState'
import axios from 'axios'
import Loader from '../Loader'

export default function UserControl() {
    const states = useContext(Context)
    const [autoReload, setReload] = useState()

    useEffect(() => {
        axios.get(states.hostname + '/api/handleuser/getstudentdata').then(res => {
            const allForms = res.data
            states.setAllForms({ data: allForms })

        }).catch(error => {
            console.log(error)
            states.showAlert("Server side issue in UserControl", 'red', 3000)
        })
    }, [autoReload])

    const changePermission = async (userid, type) => {
        await axios.post(states.hostname + '/api/handleuser/changePermission', {userid, type}).then(res => {
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            setReload(randomNumber)
            states.showAlert(`Permission changed to ${type}`, 'green', 2000)


        }).catch(error => {
            console.log(error)
            states.showAlert("Server side issue in UserControl", 'red', 5000)
        })
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
                        <table class="table table-hover text-start">
                            <thead>
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Account Type</th>
                                    <th scope="col" className='text-center'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {states.allForms.data.map(data => (
                                    <tr key={data.id}>
                                        <th scope="row">
                                            {data.username}
                                        </th>
                                        <td>{data.phone}</td>
                                        <td>{data.email}</td>
                                        <td>{data.type}</td>
                                        <td className='text-end'>
                                            {data.type === 'user' ?
                                                <a className='btn btn-sm btn-outline-primary me-3 d-inline-flex align-items-center' onClick={() => changePermission(data._id, 'admin')}>
                                                    <span className="material-symbols-outlined me-1">admin_panel_settings</span>
                                                    Make Admin
                                                </a> :
                                                <a className='btn btn-sm btn-outline-success me-3 d-inline-flex align-items-center' onClick={() => changePermission(data._id, 'user')}>
                                                    <span className="material-symbols-outlined me-1">admin_panel_settings</span>
                                                    Set to user
                                                </a>}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </>
    )
}
