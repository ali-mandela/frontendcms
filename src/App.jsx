import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import DashboardProfessor from './porfessor/Dashboard';
import CreateCourse from './porfessor/CreateCourse';
import Course from './porfessor/course';
// import LoginStudent from './student/Login'
import RegisterStudent from '../src/porfessor/RegisterStudent'
import MyCourse from './student/MyCourse';
import SingleDiscussion from './porfessor/SingleDiscussion';
import Discussion from './pages/Discussion';
import Attendence from './porfessor/POST/Attendence';
import axios from 'axios';
import RegisterAdmin from './pages/admin/Register';
import DashboardAdmin from './pages/admin/Dashboard';
import DashboardStudent from '../src/student/Dashboard'
import ProtectedRoute from './pages/ProtectedRoute';
import Navbar from './component/Navbar';
import RegisterEntity from './pages/admin/RegisterEntity';
import StudentList from './pages/admin/StudentList';
import FacultyList from './pages/admin/FacultyList';
import MaterialPage from './porfessor/Material';
import AssignmentPage from './porfessor/AssignmentPage';
import MaterialScreen from './pages/ViewPages/MaterialScreen';
import AssignmentsScreen from './pages/ViewPages/AssignmentsScreen';
import AssignmentStudentScreen from './pages/ViewPages/AssignmentStudentScreen';
import QuizSection from './porfessor/QuizSection';
import QuizPage from './porfessor/QuizPage';
import Quizzes from './student/Quizzes';
import SingleQuizzes from './student/SingleQuizzes';

// axios.defaults.baseURL = 'http://localhost:8000/api/v1';
const key = import.meta.env.VITE_API;
axios.defaults.baseURL = key;

const App = () => {

    return (
        <BrowserRouter> 
           <Navbar/>
            <Routes>
           
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<RegisterAdmin/>} />
                <Route path='/dashboard-admin' element={<ProtectedRoute><DashboardAdmin/></ProtectedRoute>} />
                <Route path='/admin/register' element={<ProtectedRoute><RegisterEntity/></ProtectedRoute>} />                 
                <Route path='/admin/students' element={<ProtectedRoute><StudentList/></ProtectedRoute>} />
                <Route path='/admin/facultys' element={<ProtectedRoute><FacultyList/></ProtectedRoute>} />
                <Route path='/dashboard-faculty' element={<ProtectedRoute><DashboardProfessor/></ProtectedRoute>} />
                <Route path='/dashboard-student' element={<ProtectedRoute><DashboardStudent/></ProtectedRoute>} />
                {/* Professor Routes */}
                
                <Route path='/register-student'  element={<ProtectedRoute><RegisterStudent/></ProtectedRoute>} />
               
                <Route path='/create-course' element={<ProtectedRoute><CreateCourse /></ProtectedRoute>} />
                
                <Route path='/faculty/courses/:id' element={<ProtectedRoute><Course is={true} /></ProtectedRoute>} />
                <Route path='/courses/attendence/:id' element={<ProtectedRoute><Attendence /></ProtectedRoute>} />
                <Route path='/faculty/course/material/:id' element={<ProtectedRoute><MaterialPage is={true}/></ProtectedRoute>} />
                <Route path='/faculty/course/assignment/:id' element={<ProtectedRoute><AssignmentPage is={true}/></ProtectedRoute>} />
                <Route path='/faculty/course/quiz/:id' element={<ProtectedRoute><QuizSection/></ProtectedRoute>} />
                <Route path='/faculty/course/quizpage/:id' element={<ProtectedRoute><QuizPage/></ProtectedRoute>} />
               
                {/* Student Dashboard Routes */}
                <Route path='/student/course' element={<ProtectedRoute><MyCourse /></ProtectedRoute>} />
                <Route path='/student/course/:id' element={<ProtectedRoute><Course is={false} /></ProtectedRoute>} />
                <Route path='/discussion' element={<ProtectedRoute><Discussion /></ProtectedRoute>} />
                <Route path='/discussion/:id' element={<ProtectedRoute><SingleDiscussion /></ProtectedRoute>} />
                <Route path='/student/course/material/:id' element={<ProtectedRoute><MaterialPage is={false}/></ProtectedRoute>} />
                <Route path='/student/course/assignment/:id' element={<ProtectedRoute><AssignmentStudentScreen/></ProtectedRoute>} />
                <Route path='/student/quizzes/:id' element={<ProtectedRoute><Quizzes/></ProtectedRoute>} />
                <Route path='/student/single-quiz/:id' element={<ProtectedRoute><SingleQuizzes/></ProtectedRoute>} />
                {/* scerens */}
                <Route path='/material/:id' element={<ProtectedRoute><MaterialScreen /></ProtectedRoute>} />
                <Route path='/assignment/:id' element={<ProtectedRoute><AssignmentsScreen /></ProtectedRoute>} />


            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;
