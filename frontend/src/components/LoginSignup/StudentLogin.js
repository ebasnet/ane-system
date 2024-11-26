import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import setAuthToken from './setAuthToken'
import { Context } from '../../contexts/SharedState';
import Loader from '../Loader';
import '../../CSS/MainBody.css'
import '../../CSS/LoginSignup.css'

export default function StudentLogin() {
    const states = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        states.setLoading(true)
        e.preventDefault();
        axios.post(states.hostname + "/api/handleuser/login", { email, password, type:'user' })
            .then(res => {
                const token = res.data.authtoken
                states.showAlert(`Welcome! ${res.data.username} you are logged in`, "lightgreen", 2000)
                localStorage.setItem("jwtToken", token)
                setAuthToken(token)

                axios.post(states.hostname+'/api/handleuser/getuser') //for getting user details in user state
                    .then(async res => {
                        const username = res.data
                        await states.setUser({ data: username })
                    }).catch(error => {
                        if (error.response === 403) {
                            states.setUser()
                        }
                    })
                states.setLoading(false)
                navigate('/')
            }

            ).catch(error => {
                states.setLoading(false)
                states.showAlert(error.response.data, "red", 2000)
            })
    }

    return (
        <>
            {states.loading && <Loader />}

            <div className="bigContainer text-light container col-md-3 p-4 appearfromTop" style={{marginTop: '100px'}}>
                <form onSubmit={handleLogin}>
                    <h3>Student Login</h3>
                    <hr />
                    <div className="mb-3 mt-4">
                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' required />
                    </div>
                    <div className="mb-3 mt-4">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='password' required />
                    </div>

                    <a className="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-50-hover" href="#">
                        Forgot Password?
                    </a>

                    <button type="submit" className="btn btn-outline-light mx-3 my-2">Continue Login</button>
                    <hr />
                    <Link to="/adminLogin" className="link-light link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-50-hover mx-3">
                        Admin Login </Link>
                    OR
                    <Link to="/signup" className="link-light link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-50-hover mx-3">
                        Create new Account </Link>
                </form>
            </div>



        </>
    )
}
