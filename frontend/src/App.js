import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainBody from './components/Mainbody';
import Navbar from './components/Navbar';
import StudentLogin from './components/LoginSignup/StudentLogin';
import AdminLogin from './components/LoginSignup/AdminLogin';
import Signup from './components/LoginSignup/Signup';
import Alerts from './components/Alerts';
import { SharedState } from './contexts/SharedState';
import setAuthToken from './components/LoginSignup/setAuthToken';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard/Dashboard'
import Fees from './components/Fees';
import Forms from './components/Dashboard/Forms'
import Classes from './components/Dashboard/Classes'
import Students from './components/Dashboard/Students'
import TotalStudents from './components/Dashboard/TotalStudents'
import RejectedForms from './components/Dashboard/RejectedForms'
import Notices from './components/Dashboard/Notices/Notices'
import SendtoSpecific from './components/Dashboard/Notices/SendtoSpecific'
import EditStudent from './components/Dashboard/EditStudent'
import UserControl from './components/Dashboard/UserControl'
import UserDashboard from './components/UserDashboard/UserDashboard'

import "./CSS/MainBody.css";
import UserNoticeList from './components/UserDashboard/UserNoticeList';
import ProfileSettings from './components/LoginSignup/ProfileSettings';
import Contact from './components/Contact';
import About from './components/About';

function App() {

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
  } else {
    setAuthToken(false)
  }

  return (
    <>
      <SharedState>
        <Router>
          <div className="App">
            <Navbar />
            <Alerts />
            <Routes>
              <Route exact path="/" element={<MainBody />} />

              <Route exact path="/login" element={<StudentLogin />} />
              <Route exact path="/adminLogin" element={<AdminLogin />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/register" element={<Registration />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/about" element={<About />} />

              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/dashboard/forms" element={<Forms />} />
              <Route exact path="/dashboard/classes" element={<Classes />} />
              <Route exact path="/dashboard/classes/students/:class" element={<Students />} />
              <Route exact path="/dashboard/allstudents" element={<TotalStudents />} />
              <Route exact path="/dashboard/rejected" element={<RejectedForms />} />
              <Route exact path="/dashboard/notices" element={<Notices />} />
              <Route exact path="/dashboard/notices/to/:userid" element={<SendtoSpecific />} />
              <Route exact path="/dashboard/edit/:formid" element={<EditStudent />} />
              <Route exact path="/dashboard/fees" element={<Fees />} />
              <Route exact path="/dashboard/usercontrol" element={<UserControl />} />
              <Route exact path="/dashboard/profile" element={<ProfileSettings />} />

              <Route exact path="/userdashboard" element={<UserDashboard />} />
              <Route exact path="/userdashboard/notices" element={<UserNoticeList />} />
              <Route exact path="/userdashboard/profile" element={<ProfileSettings />} />
              <Route exact path="/userdashboard/fees" element={<Fees />} />
              {/* <Route path="*" element={<Page404 />} /> */}
            </Routes>
          </div>
        </Router>
      </SharedState>


    </>
  );
}

export default App;
