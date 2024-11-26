import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../contexts/SharedState';
import Getuser from './LoginSignup/Getuser'
import setAuthToken from './LoginSignup/setAuthToken'

export default function Navbar() {
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

    useEffect(() => {
        Getuser(states);
    }, [])
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top" data-bs-theme="dark">
                <div class="container-fluid">
                    {location.pathname.startsWith('/dashboard') ? <Link class="navbar-brand" to="/">Admin Dashboard (Blue Bird English School)</Link> :
                            location.pathname.startsWith('/userdashboard') ? <Link class="navbar-brand" to="/">User Dashboard (Blue Bird English School)</Link> :
                                <Link class="navbar-brand" to="/">BBES</Link>}

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            {!location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/userdashboard') ?
                                <>
                                    <li class="nav-item">
                                        <Link class={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to='/'>Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class={`nav-link ${location.pathname === '/contact' ? "active" : ""}`} to="/contact">Contact us</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to='/about'>About</Link>
                                    </li>
                                    
                                </> : ''}

                        </ul>
                        {states.user.data ?
                            <div className="btn-group">

                                <span className="material-symbols-outlined dropdown-toggle text-light fs-2 me-3" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                    notifications
                                </span>
                                <ul className="dropdown-menu dropdown-menu-xl-end dropdown-menu-dark">
                                    <a className='dropdown-item disabled' href='#'>No any notifications</a>
                                    {/* <li><Link className={`dropdown-item ${location.pathname === '/user' ? "active" : ""}`} to='/user'>Profile Settings</Link></li> */}


                                </ul>
                                <span className="material-symbols-outlined dropdown-toggle text-light fs-2" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                    account_circle
                                </span>
                                <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                                    <li><a className="dropdown-item disabled" to="/registration">{states.user.data.username}</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    {location.pathname === '/dashboard' || location.pathname === '/userdashboard' ? <><li><Link className={`dropdown-item`} to='/'>Homepage</Link></li></> : 
                                    <li><Link className={`dropdown-item ${location.pathname === '/dashboard' ? "active" : ""}`} to={`${states.user.data.type === 'admin' ? '/dashboard' : '/userdashboard'}`}>Dashboard</Link></li>}
                                    
                                    <li><Link className={`dropdown-item ${location.pathname === '/user' ? "active" : ""}`} to={`${states.user.data.type === 'admin' ? '/dashboard/profile' : '/userdashboard/profile'}`}>Profile Settings</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item text-danger fw-bold" onClick={handlelogout}>Logout</Link></li>
                                </ul>
                            </div> :
                            <Link class="btn btn-outline-light" to='/login'>Login/Signup</Link>
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}
