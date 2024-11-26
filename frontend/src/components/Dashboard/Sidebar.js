import React, { useContext } from 'react'
import '../../CSS/sidebar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../contexts/SharedState'
import setAuthToken from '../LoginSignup/setAuthToken'

export default function Sidebar() {
    const states = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()

    const handlelogout = async () => {
        states.showAlert("Signing out...", "red", 2000)
        localStorage.clear()
        sessionStorage.clear()
        setAuthToken(false)
        await states.setUser({})
        navigate('/')
        window.location.reload(false)
    }

    return (
        <>
            <div class="sidebar">

                <Link class={`${location.pathname==='/dashboard'?'active':''} d-flex justify-content-end`} to='../dashboard'>
                    Home<span class="material-symbols-outlined ms-2">home</span>
                </Link>
                <Link class={`${location.pathname.startsWith('/dashboard/classes')?'active':''} d-flex justify-content-end`} to='/dashboard/classes'>
                    Classes<span class="material-symbols-outlined ms-2">domain</span>
                </Link>
                <Link class={`${location.pathname.startsWith('/dashboard/allstudents')?'active':''} d-flex justify-content-end`} to='/dashboard/allstudents'>
                    All Students<span class="material-symbols-outlined ms-2">supervisor_account</span>
                </Link>
                <Link class={`${location.pathname.startsWith('/dashboard/rejected')?'active':''} d-flex justify-content-end`} to='/dashboard/rejected'>
                    Rejected Forms<span class="material-symbols-outlined ms-2">person_remove</span>
                </Link>
                <Link class={`${location.pathname==='/dashboard/fees'?'active':''} d-flex justify-content-end`} to="/dashboard/fees">
                    Fee Structure<span class="material-symbols-outlined ms-2">monetization_on</span>
                </Link>
                <Link class={`${location.pathname==='/dashboard/usercontrol'?'active':''} d-flex justify-content-end`} to='/dashboard/usercontrol'>
                    User Controls<span class="material-symbols-outlined ms-2">build</span>
                </Link>
                <Link class={`${location.pathname==='/dashboard/profile'?'active':''} d-flex justify-content-end`} to='/dashboard/profile'>
                    Profile Settings<span class="material-symbols-outlined ms-2">settings</span>
                </Link>
                <a class={`logout btn rounded-0 d-flex justify-content-end`} onClick={handlelogout}>
                    Log Out<span class="material-symbols-outlined ms-2">logout</span>
                </a>

            </div>
        </>
    )
}
