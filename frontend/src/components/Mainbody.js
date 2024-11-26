import React, { useContext } from 'react'
import '../CSS/MainBody.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../contexts/SharedState'

export default function Mainbody() {
    const states = useContext(Context)
    const navigate = useNavigate()
    const handleRegister = ()=> {
        if (states.user.data === undefined) {
            states.showAlert('Please Login to continue', 'red', 3000)
            navigate('/login')
        } else {
            navigate('/register')
        }
    }
    return (
        <>
            <div className='container-fluid p-4'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <img className='img-fluid rounded blurry-border' width='95%' src='https://cdn9.dissolve.com/p/D430_35_483/D430_35_483_1200.jpg' />
                    </div>
                    <div className='col-sm-6'>
                        <div className='h1'>Welcome to Blue Bird English School</div>
                        <div className='h5 text-muted'>Join us and be a part of BEES family!</div>
                        <p className='container fs-5 mt-5'>
                            With a team of dedicated and experienced educators,
                            Blue Bird English School strives to nurture students into well-rounded individuals
                            equipped with the skills and knowledge needed to succeed in today's competitive world.
                            The school's facilities include modern classrooms, well-equipped laboratories,
                            a library, and sports facilities to support students' academic and extracurricular pursuits.
                        </p>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <img width={300} src='https://th.bing.com/th/id/R.207597cc0d1606add46b6e6738995170?rik=9r77Tk%2bIhlXEZA&riu=http%3a%2f%2fwww.karnalicollege.edu.np%2fwp-content%2fuploads%2f2019%2f08%2fadmission_open-1024x479.png&ehk=%2bN32yiD9KQn0OyGcbapgElMWCjLcDuqAVmGzSkbtzNo%3d&risl=&pid=ImgRaw&r=0' />
                            </div>
                            <div className='col-sm-6 mt-4'>
                                <a className='btn btn-outline-dark d-block' onClick={handleRegister}>Register Now</a>
                                <Link className='btn btn-danger d-block mt-3'>Contact us</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
