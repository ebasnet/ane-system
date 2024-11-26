import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../contexts/SharedState'
import axios from 'axios';

export default function ViewNotice() {
    const states = useContext(Context)
    const location = useLocation();
    const formid = states.formID
    const [data, setData] = useState()

    useEffect(() => {
        if (formid) {
            if (Object.keys(formid).length > 0) {
                axios.get(states.hostname + '/api/dashboard/notices/getNotices', { params: { formid } }).then(res => {

                    setData(res.data)
                })
            }
        }
        data && console.log(data.allNotices)
    }, [states]);


    return (
        <>
            <div className="modal fade" id="exampleModal"
                aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme={`${states.mode === 'dark' ? 'dark' : 'light'}`}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content" style={{ overflowY: 'auto', maxHeight: '95vh' }}>
                        <div className="modal-header">
                            <h1 className={`modal-title fs-5 text-${states.mode === 'dark' ? 'light' : 'dark'}`} id="exampleModalLabel">Detailed View</h1>

                            <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close"></button>

                        </div>
                        {data && data.allNotices.map(data => (<>
                            <div className="modal-body">
                                <div className='container text-start'>
                                    <form class="row g-3">

                                        <div class="col-12">
                                            <label class="form-label fs-5 fw-bold">Title</label>
                                            <input type="text" class="form-control" value={data.title} disabled />
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label fs-5 fw-bold">Message</label>
                                            <textarea className="form-control" rows="5" name='message'
                                                value={data.message} disabled style={{ resize: "none" }}>
                                            </textarea>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {!location.pathname.startsWith('/userdashboard') ?
                                <div class={`modal-footer text-muted sticky-bottom bg-${states.mode === 'dark' ? 'dark' : 'light'}`}>
                                    * Notices cannot be modified once submitted.
                                </div> :
                                <div class="modal-footer text-end">
                                    Date: {new Date(data.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}
                                </div>}
                        </>))}
                    </div>
                </div>
            </div>
        </>
    );
}
