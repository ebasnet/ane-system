import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../contexts/SharedState'
import { Link, useNavigate } from 'react-router-dom'
import '../../CSS/dashboard.css'
import Sidebar from './Sidebar'
import Loader from '../Loader'
import NoticeList from './NoticeList'
import Graph from './Graph'

export default function Dashboard() {
  const states = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    axios.post(states.hostname + '/api/handleuser/getuser').then(res => {
      const user = res.data
      if(user.type==='user'){
        navigate('/')
        states.showAlert("Permission Denied! Don't interfere with URL Pattern", 'red', 5000)
      }
    }).catch(error => {
      navigate('/')
      states.showAlert("Permission Denied! Don't interfere with URL Pattern", 'red', 5000)
    })

  }, [])


  if (!states.allForms.data.map && !states.user.data) {
    return <Loader />
  }

  if (states.user.data.type === 'user') {
    navigate('/')
    states.showAlert("Permission Denied! Don't interfere with URL Pattern", 'red', 5000)
  }
  return (
    <>
    
      <div className='row'>
        <div className='col-sm-2'>
          <Sidebar />
        </div>
        <div className='col-sm-10'>
          <div className='container col-sm-11 mt-5'>
            <div className='row row-cols-2 row-cols-md-3 g-4'>

              <div className='col'>
                <Link to='/dashboard/forms' className=' nav-link'>
                  <div class="card dashboardbox border-secondary mb-3"
                    style={{
                      background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)',
                      border: 'none',
                      borderRadius: '10px',
                    }}>
                    <div class="card-body d-flex justify-content-center align-items-center">
                      <h5 class="card-title text-dark">Pending Forms</h5>
                    </div>
                  </div>
                </Link>
              </div>

              <div className='col'>
                <Link to='/dashboard/allstudents' className=' nav-link'>
                  <div class="card dashboardbox border-secondary mb-3"
                    style={{
                      background: 'linear-gradient(45deg, #00bcd4,#ffeb3b)',
                      border: 'none',
                      borderRadius: '10px'
                    }}>
                    <div class="card-body d-flex justify-content-center align-items-center">
                      <h5 class="card-title text-dark ">Total Students</h5>
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </div>
          <div className='container col-sm-11 mt-5'>
            <div className='row'>
              <div className='col-sm-8'>
                <div className='h2 mb-4 fw-bold'>All NOTICES</div>
                <div className='text-end'>
                  <Link to='/dashboard/notices' className='btn btn-primary d-inline-flex align-items-center'>
                    <span class="material-symbols-outlined">
                      add
                    </span>
                    Add more</Link>
                </div>
                <NoticeList />
              </div>
              <div className='col-4'>
                <Graph />
              </div>
            </div>
          </div>



        </div>
      </div>
    </>
  )
}
