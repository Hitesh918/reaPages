import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Header from '../components/Header';
import AdminSideBar from '../components/AdminSideBar';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { anotherAuth } from "../firebase";
import BASE_URL from '../config';

import axios from "axios"
function CourseCheckbox({ course, isChecked, onChange }) {
    return (
        <label>
            <input
                type="checkbox"
                value={course.courseId}
                checked={isChecked}
                onChange={onChange}
            />
            {course.courseName}
        </label>
    );
}

function AdminAddTeacher(props) {

    const [courses, setCourses] = React.useState([])
    const [checkedCourses, setCheckedCourses] = React.useState({});

    const handleCheckboxChange = (event) => {
        const courseId = parseInt(event.target.value);
        setCheckedCourses({
            ...checkedCourses,
            [courseId]: event.target.checked
        });
    };

    React.useEffect(() => {
        setCourses(props.courses)
    }, []);

    console.log(courses);


    function validateForm(event) {
        event.preventDefault();

        var fullName = document.getElementById("fullName").value.trim();
        var emaill = document.getElementById("email").value.trim();
        var pw = document.getElementById("pw").value.trim();
        var phone = document.getElementById("phone").value.trim();
        var courses = Object.keys(checkedCourses).filter(courseId => checkedCourses[courseId]).map(courseId => parseInt(courseId));
        var profile = document.getElementById("profile").value.trim();
        var adminId = document.getElementById("adminId").value.trim();
        if (fullName === "" || emaill === "" || phone === ""  || adminId === "") {
            alert("Please fill out all fields.");
            return false;
        }
        if(phone.length !== 10){
            alert("Invalid Mobile Number");
            return false;
        }

        // Confirmation dialog handled outside of JSX
        var confirmed = window.confirm("Are you sure you want to add this Teacher?");
        if (confirmed) {

            //console.log("Student added successfully!");
            if (props) {
                axios.post(`${BASE_URL}/newTeacher`, {}, {
                    params: {
                        name: fullName,
                        email: emaill,
                        mobile: phone,
                        course: courses,
                        info: profile,
                        id : adminId
                    }
                })
                    .then((res) => {
                        if(res.data==="Failed to add teacher"){
                            alert("Failed to add teacher! Invalid details")
                            return
                        }
                        
                        alert("Teacher added successfully!");
                        console.log("respose after creating new teacher " , res)
                        createUserWithEmailAndPassword(anotherAuth, `rea.adm${res.data.id}@gmail.com`, `${pw}`)
                            .catch((error) => {
                                alert("Failed to complete action, try again later.")
                            })
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }

        }

        return confirmed; // Return true if confirmed, false otherwise
    }

    // console.log(props)

    return (
        <div>

            <Header />
            {/* <AdminSideBar name={props && props.name} /> */}
            <section className="home-grid">
                <h1 className="heading">Add Teacher</h1>
                <div className="container">

                    <form style={{ fontSize: "1.3rem" }} id="addStudentForm" onSubmit={validateForm}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name:</label>
                            <input type="text" id="fullName" name="fullName" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="adminId">Teacher ID:</label>
                            <input  type="text" id="adminId" name="adminId" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email ID:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pw">Password:</label>
                            <input type="text" id="pw" name="pw" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="text" id="phone" name="phone" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="courses">Course:</label>
                            {
                                courses.length && courses.map((course, index) => (
                                    <CourseCheckbox
                                        key={course.courseId}
                                        course={course}
                                        isChecked={checkedCourses[course.courseId] || false}
                                        onChange={handleCheckboxChange}
                                    />
                                ))
                            }

                        </div>
                        <div className="form-group">
                            <label htmlFor="profile">Profile:</label>
                            <textarea
                                id="profile"
                                name="profile"
                                rows="4"
                                cols="50"
                                placeholder="Enter teacher's INFO"
                                style={{ border: "1px solid #ccc" , borderRadius:"5px"}}
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit">Submit</button>
                        </div>
                    </form>

                </div>
            </section>


        </div>
    );
}

export default AdminAddTeacher;
