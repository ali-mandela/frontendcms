/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/userContext";
import styles from './professor.module.css';

const Dashboard = () => {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        const getAllCourses = async () => {
            try {
                const res = await axios.post('/professor/courses', { instructor: user?._id });
                if (res.data.success) {
                    toast.success("Courses fetched successfully!");
                    setCourseList(res.data.courses);
                } else {
                    toast.error("Failed to fetch courses. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch courses. Please try again.");
            }
        };

        // Fetch courses only once when component mounts
        if (courseList?.length === 0) {
            getAllCourses();
        }
    }, [courseList?.length, user?._id]);

    return (
        <div className={styles.professorMyCourse}> 
                <h1>My Courses</h1> 
                <div className={styles.AllCourses}> 
                <AllCourses courseList={courseList} />

                </div>
                {courseList?.length === 0 && <p>No course available</p>}
                <h1>Visit List of All Students</h1>
                <Link to='/admin/students'>List of Students</Link>
            
        </div>
    );
};

const AllCourses = ({ courseList }) => {
    return (<>
            {courseList.map((course) => (
                <div key={course?._id} className={styles.Mycourse}>
                    <p>Departmant : {course?.courseDepartment}</p>
                    <p>{course?.courseCode} : {course?.title}</p>
                    <p>Description : {course?.description}</p>
                    <p>No. of students enrolled : {course.students.length}</p>
                    <Link to={`/faculty/courses/${course?._id}`} >Visit</Link>
                </div>
            ))}
            </>
    );
};

export default Dashboard;
