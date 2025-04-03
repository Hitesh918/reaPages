import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Header from '../components/Header';
import AdminSideBar from '../components/AdminSideBar';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { anotherAuth } from "../firebase";

import axios from "axios"
import BASE_URL from '../config';

function AdminAddStudent(props) {

    const [isNew, setNew] = React.useState(true)
    const [courses, setCourses] = React.useState([])
    const [index, setIndex] = React.useState(-1)
    // const [teacherId, setTeacherId] = React.useState("")

    React.useEffect(() => {
        // const fetchData = async () => {
        //     console.log("fn called")
        //     try {
        //         const response = await axios.get("${BASE_URL}/courseList");
        //         setCourses(response.data);
        //     } catch (error) {
        //         console.error("Error fetching data:", error);
        //     }
        // };

        // fetchData();
        setCourses(props.courses)
    }, []);

    console.log("courses" , props.courses);

    function handleChange(e) {
        if (e.target.value === "new") {
            setNew(true)
        }
        else {
            setNew(false)
        }
    }

    function handleChange2(e) {
        let id = e.target.value
        // console.log("id", id)
        let ind = courses.findIndex((course) => course.courseId === parseInt(id))
        // console.log("index", ind)
        setIndex(ind)
        // console.log("courses", courses[ind])
    }

    // function handleChange3(e) {
    //     setTeacherId(e.target.value)
    // }

    function validateForm(event) {
        event.preventDefault();

        var fullName = document.getElementById("fullName").value.trim();
        var emaill = document.getElementById("email").value.trim();
        var phone = document.getElementById("phone").value.trim();
        var courses = document.getElementById("courses").value.trim();
        var teacher = document.getElementById("teacher").value.trim();

        if (fullName === "" ||  phone === "" || courses === "" || teacher === "") {
            alert("Please fill out all fields.");
            return false;
        }

        // Confirmation dialog handled outside of JSX
        var confirmed = window.confirm("Are you sure you want to add this student?");
        if (confirmed) {

            //console.log("Student added successfully!");
            if (props) {
                axios.post(`${BASE_URL}/newStudent`, {}, {
                    params: {
                        name: fullName,
                        email: emaill,
                        mobile: phone,
                        course: courses,
                        adminId: teacher
                    }
                })
                    .then((res) => {
                        if(res.data==="Failed to add student"){
                            alert("Failed to add student! Invalid details")
                            return
                        }
                        alert(`Student added successfully with the id ${res.data.id}`);
                        console.log(res)
                        createUserWithEmailAndPassword(anotherAuth, `rea.stu${res.data.id}@gmail.com`, `stu${res.data.id}`)
                            .catch((error) => {
                                alert(error.message)
                            })
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }

        }

        return confirmed; // Return true if confirmed, false otherwise
    }

    function handleSubmit(event) {
        event.preventDefault();
        var course = document.getElementById("courses").value.trim();
        var teacher = document.getElementById("teacher").value.trim();
        var userName = document.getElementById("userName").value.trim();
        if (userName === "" || course === "" || teacher=== "") {
            alert("Please fill out all fields.");
            return false;
        }
        var confirmed = window.confirm("Are you sure you want to add this student?");
        if (confirmed) {
            axios.post(`${BASE_URL}/addStudent`, {}, {
                params: {
                    studentId: userName.substring(7),
                    courseId: course,
                    adminId: teacher
                }
            })
                .then((res) => {
                    if(res.data === "Student added to the course"){
                        alert("Student added successfully!");
                    }
                    else{
                        alert(res.data);
                    }
                })
                .catch((e) => {
                    console.log("Student could not be added due to an error");
                    console.log(e)
                })
        }
    }


    // console.log(props)

    return (
        <div>

            <Header />
            {/* <AdminSideBar name={props && props.name} /> */}
            <section className="home-grid">
                <h1 className="heading">Add Student</h1>
                <div className="container">
                    <div className="form-group">
                        <select onChange={handleChange}>
                            <option value="new">New to Institution</option>
                            <option value="old">New to Course</option>
                        </select>
                    </div>

                    {isNew ?
                        <form style={{ fontSize: "1.3rem" }} id="addStudentForm" onSubmit={validateForm}>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name:</label>
                                <input type="text" id="fullName" name="fullName" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email ID:</label>
                                <input type="email" id="email" name="email"  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number:</label>
                                <input type="text" id="phone" name="phone" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="courses">Course:</label>
                                <select onChange={handleChange2} id="courses" name="courses" required>
                                    <option value="" disabled selected>Select Course</option>
                                    {
                                        courses&&courses.length && courses.map((course, index) => (
                                            <option value={course.courseId} >{course.courseName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="teacher">Teacher:</label>
                                <select id="teacher" name="teacher" required>
                                    <option value="" disabled selected>Select Teacher</option>
                                    {
                                        courses&&courses.length && (index > -1) && courses[index].teacherList.map((teacher, ind) => (
                                            <option value={teacher.teacherId} >{teacher.teacherName}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                        :
                        <form style={{ fontSize: "1.3rem" }}>

                            <div className="form-group">
                                <label htmlFor="userName">Username</label>
                                <input type="text" id="userName" name="userName" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="courses">Course:</label>
                                <select onChange={handleChange2} id="courses" name="courses" required>
                                    <option value="" disabled selected>Select Course</option>
                                    {
                                        courses&&courses.length && courses.map((course, index) => (
                                            <option value={course.courseId} >{course.courseName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="teacher">Teacher:</label>
                                <select id="teacher" name="teacher" required>
                                    <option value="" disabled selected>Select Teacher</option>
                                    {
                                        courses&&courses.length && (index > -1) && courses[index].teacherList.map((teacher, ind) => (
                                            <option value={teacher.teacherId} >{teacher.teacherName}</option>
                                        ))
                                    }
                                </select>
                            </div> 

                            <div className="form-group">
                                <button onClick={handleSubmit} type="submit">Submit</button>
                            </div>

                        </form>}
                </div>
            </section>


        </div>
    );
}

export default AdminAddStudent;
