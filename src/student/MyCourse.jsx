/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/userContext";
import style from "./student.module.css";
import { Link } from "react-router-dom";


const MyCourse = () => {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        const getAllCourses = async () => {
            try {
                const res = await axios.post('/student/get-my-course', { studentId : user?._id });
                if (res.data.success) {
                    toast("My courses fetched successfully!");
                    setCourseList(res.data.courses);
                } else {
                    toast.error("Failed to fetch my courses. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch my courses. Please try again.");
            }
        };
        if (courseList.length === 0) {
            getAllCourses();
        }
    }, [user]);

    return (
        <div className={style.myCourseContainer}>
        <h1>My Courses </h1>
        {courseList.length === 0 && <p>No course available</p>}
            <div className={style.courseList}>
                                    {courseList.map((course) => <Course course={course} key={course._id} />)}
               
            </div>
        </div>
    );
}

const Course = ({ course }) => {
    return (
        <div className={style.course}>
            <p>Course Name: {course?.title}</p>
            <p>Course Code: {course?.courseCode}</p>
            <p>Course Department: {course?.courseDepartment}</p>
            <p>Course Description: {course?.description}</p>
            <p>Instructor: {course?.instructor['name']}</p>
            <p>Current Students Enrolled: {course?.students.length}</p>
            <Link to={`/student/course/${course?._id}`}>Visit the course</Link>
        </div>
    );
}

export default MyCourse;
