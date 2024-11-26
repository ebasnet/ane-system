import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../contexts/SharedState'
import Loader from '../Loader'
import ViewNotice from './ViewNotice'

export default function NoticeList() {
    const states = useContext(Context)

    useEffect(() => {
        axios.get(states.hostname + '/api/dashboard/notices/getNotices').then(res => {
            const allNotices = res.data.allNotices
            const NoticesCount = res.data.formCount
            states.setAllNotices({ data: allNotices })
            states.setNoticeCount(NoticesCount)

        }).catch(error => {
            console.log(error)
            states.showAlert("Server side issue in notice list", 'red', 5000)
        })

    }, [])

    const handleDelete = async (formid) => {
        await axios.post(states.hostname+'/api/dashboard/notices/deleteNotes', {formid}).then( res => {
            window.location.reload(false)
            states.showAlert("Notice Deleted", "green", 3000)
        }) . catch (err => {
            console.log(err)
            states.showAlert("Error ! deleting notice", "red", 3000)
        })
    }

    if (!states.allNotices.data.map) {
        return <Loader />
    }

    return (
        <>
        <ViewNotice/>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {states.allNotices.data.map(data => (
                        <tr key={data.id}>
                            <th scope="row">
                                {new Date(data.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </th>
                            <td>{data.title.split(' ').slice(0,3).join(' ')}...</td>
                            <td>{data.message.split(' ').slice(0, 3).join(' ')}...</td>
                            <td className='d-flex justify-content-end'>
                                <a className='btn btn-sm btn-success me-3 d-inline-flex align-items-center' onClick={()=>states.toggleModal(data._id)}>
                                    <span className="material-symbols-outlined me-1 fs-5">visibility</span>
                                    View
                                </a>
                                {states.user.data.type === 'admin'?
                                <a className='btn  btn-outline-danger me-3 d-inline-flex align-items-center' onClick={()=>handleDelete(data._id)}>
                                    <span className="material-symbols-outlined me-1 fs-5">delete</span>
                                    Delete
                                </a>:'' }
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}
