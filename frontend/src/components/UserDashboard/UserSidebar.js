import React, { useContext } from 'react'
import '../../CSS/sidebar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../contexts/SharedState'
import setAuthToken from '../LoginSignup/setAuthToken'

export default function UserSidebar() {
    const states = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()

    const handlelogout = async () => {
        navigate('/')
        localStorage.clear()
        sessionStorage.clear()
        setAuthToken(false)
        await states.setUser({})
        window.location.reload(false)
        states.showAlert("Signing out...", "red", 3000)
    }

    return (
        <>
            <div class="sidebar">

                <Link class={`${location.pathname==='/userdashboard'?'active':''} d-flex justify-content-end`} to='../userdashboard'>
                    Home<span class="material-symbols-outlined ms-2">home</span>
                </Link>
                <Link class={`${location.pathname.startsWith('/userdashboard/notices')?'active':''} d-flex justify-content-end`} to='/userdashboard/notices'>
                    Notices<span class="material-symbols-outlined ms-2">notifications</span>
                </Link>

                <Link class={`${location.pathname==='/userdashboard/fees'?'active':''} d-flex justify-content-end`} to="/userdashboard/fees">
                    Fee Structure<span class="material-symbols-outlined ms-2">monetization_on</span>
                </Link>
                <Link class={`${location.pathname==='/userdashboard/profile'?'active':''} d-flex justify-content-end`} to='/userdashboard/profile'>
                    Profile Settings<span class="material-symbols-outlined ms-2">build</span>
                </Link>
                <a class={`logout btn rounded-0 d-flex justify-content-end`} onClick={handlelogout}>
                    Log Out<span class="material-symbols-outlined ms-2">logout</span>
                </a>

            </div>
        </>
    )
}
