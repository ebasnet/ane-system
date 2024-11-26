import { Link } from 'react-router-dom'
import '../../CSS/dashboard.css'
import Sidebar from './Sidebar'

export default function Classes() {

    return (
        <>
            <div className='row'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10'>
                    <div className='container col-sm-6 mt-5'>
                        <h1 className='mb-5'> Select Classes</h1>
                        <div className='row row-cols-2 g-3'>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/1' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class 1</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/2' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class 2</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/3' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class 3</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/4' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class4</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/5' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class 5</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/6' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class 6</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/7' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class 7</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/8' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class 8</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/9' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class 9</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className='col'>
                                <Link to='/dashboard/classes/students/10' className=' nav-link'>
                                    <div class="card dashboardbox border-secondary mb-3" style={{ background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)', border: 'none' }}>
                                        <div class="card-body text-secondary">
                                            <h5 class="card-title text-dark fs-3">Class 10</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
