 
// import './Marks.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Attendence = () => {
    const { id } = useParams();
    const [studentList, setStudentList] = useState([]);
    const [attendence, setAttendence] = useState([]);

    const getCourseStudentList = async () => {
        try {
            const res = await axios.post('/professor/course-students', { id });
            if (res.data.success) {
                setStudentList(res.data.students);
                // toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch student list. Please try again.");
        }
    };

    const handleAttendence = async (sId) => {
        const courseId = id;
        try {
            const res = await axios.post('/professor/students-attendence', { sId, courseId  });
            if (res.data.success) {
                const formattedDates = res.data.dates.map(item => {
                    const formattedDate = new Date(item.date).toISOString().slice(0, 10);
                    return formattedDate;
                  });
                setAttendence(formattedDates);
                // toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch attendence. Please try again.");
        }
    };

    useEffect(() => {
        getCourseStudentList();
    }, []);

    return (
        <div className="attendence py-10 px-4">
            <h1 className="text-3xl">Attendance</h1>
            <h2 className="text-2xl underline">Student enrolled in the course</h2>
            <div className="studentlist">
                {studentList.length === 0 && <p>No students enrolled</p>}
                <div className="grid grid-cols-8">
               {studentList.map((student) => (
                    <div key={student._id} className="student border-2 border-slate-200 rounded-md p-2 text-white bg-slate-600 hover:bg-slate-400 m-2" onClick={() => handleAttendence(student._id)}>
                        <p>{student.name} </p>
                    </div>
                ))}
               </div>
                
            </div>
            <div className="attendance-details">
                <h2><b>Student Attendence details</b></h2>
                <p className="italic text-sm">*Note click on student to check for attendence</p>
                <div className='outStu grid grid-cols-7 bg-slate-800 p-4 '>
               
               {attendence.map((attendence) => (
                    <div key={attendence} className="student">
                        <p className="text-white border-2 text-center border-white"> {attendence}</p>
                    </div>
                ))}
              </div>
            </div>
        </div>
    );
};

export default Attendence;
