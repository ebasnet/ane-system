import axios from 'axios'
import { React, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../contexts/SharedState'
import Loader from '../Loader';

export default function Signup(props) {
    const states = useContext(Context)

    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        states.setLoading(true)
        e.preventDefault()
        axios.post(states.hostname + '/api/handleuser/signup', { username, phone, email, password })
            .then(res => {
                states.setLoading(false)
                states.showAlert(res.data, "lightgreen", 2000)
                navigate('/login')
            })
            .catch(err => {
                states.setLoading(false)
                states.showAlert(`Error! ${err.response && err.response.data}`, 'red', 2000)
            })
    }

    return (
        <>
            {states.loading && <Loader />}
            <div className="bigContainer text-light container col-md-3 p-4 mt-5 appearfromTop">
                <form onSubmit={handleSubmit}>
                    <h3>Signup</h3>
                    <hr />
                    <div className="mb-3 mt-4">
                        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder='Full Name of Student' required />
                    </div>
                    <div className="mb-3 mt-4">
                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder='Email address' required />
                    </div>
                    <div className="mb-3 mt-4">
                        <input type="tel" name="phone" onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder='Phone (+91)' required />
                    </div>
                    <div className="mb-3 mt-4">
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder='Password' required />
                    </div>

                    <button type="submit" className="btn btn-outline-light mx-3 my-2">Create account</button>
                    <hr />
                    OR
                    <Link to="/login" className="link-light link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-50-hover mx-3" href="#">
                        Already have a account?
                    </Link>
                </form>
            </div>


        </>
    )
}
