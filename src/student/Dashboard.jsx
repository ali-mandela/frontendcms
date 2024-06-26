/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/userContext";
import style from "./student.module.css";

const Dashboard = () => {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        const getAllCourses = async () => {
            try {
                const res = await axios.get("/student/all-courses");
                if (res.data.success) {
                    // toast("Courses fetched successfully!");
                    setCourseList(res.data.courses);
                } else {
                    toast.error("Failed to fetch courses. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch courses. Please try again.");
            }
        };
        if (courseList.length === 0) {
            getAllCourses();
        }
    }, [user]);

    

    return (
        <div className={style.dashboardStudent}>
            <div className={`${style.courseContainer}`}>
            {/* <h1>Attandence</h1> */}
            {/* <Attandence userId={user?._id}/> */}
                <h1>Courses Available</h1>
                {courseList.length === 0 ? (
                    <p>No course available</p>
                ) : (
                    <div className={style.courseList}>
                        {courseList.map((course) => (
                            <Course key={course._id} course={course} userId={user?._id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Course = ({ course, userId }) => {
    const courseEnroll = async (id) => {
        try {
            const res = await axios.post("/student/enroll-course", { courseId: id, studentId: userId });
            if (res.data.success) {
                toast(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch courses. Please try again.");
        }
    };

    return (
        <div className={style.course}>
            <p>Course Name: {course?.title}</p>
            <p>Course Code: {course?.courseCode}</p>
            <p>Course Department: {course?.courseDepartment}</p>
            <p>Course Description: {course?.description}</p>
            <p>Instructor: {course?.instructor.name}</p>
            <p>Current Students Enrolled: {course?.students.length}</p>
            <button onClick={() => courseEnroll(course?._id)}>Enroll</button>
        </div>
    );
};

const Attandence = ({ userId }) => {
    const [formattedDate, setFormattedDate] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        setFormattedDate(`${year}-${month}-${day}`);
    }, []);

    const handleAttendance = async () => {
        if (!isChecked) {
            toast.success("Please first mark the checkbox");
            return;
        }

        try {
            const res = await axios.post('/student/attendance', {
                formattedDate, userId
            });
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to update attendance. Please try again.");
        }
    };

    return (
        <div className="attendance-container">
            <h3 className="attendance-heading">Mark your attendance for today</h3>
            <div>
                <p className="attendance-date">{formattedDate}</p>
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            </div>
            <button onClick={handleAttendance} className="attendance-button">Submit</button>
        </div>
    );
};



export default Dashboard;
