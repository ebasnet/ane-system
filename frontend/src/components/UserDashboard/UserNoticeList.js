import React from 'react'
import NoticeList from '../Dashboard/NoticeList'
import UserSidebar from './UserSidebar'
import '../../CSS/dashboard.css'
export default function UserNoticeList() {
    return (
        <>
            <div className='row'>
                <div className='col-sm-2'>
                    <UserSidebar />
                </div>
                <div className='col-sm-10'>
                    <div className='container'>
                        <div className='h2 mb-4 fw-bold'>All NOTICES</div>
                        <NoticeList />
                    </div>
                </div>
            </div>
        </>
    )
}
