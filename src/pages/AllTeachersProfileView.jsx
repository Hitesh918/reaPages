import React from 'react'
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { deleteUser } from 'firebase/auth';

function AllTeachersProfileView(props) {
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [details, setDetails] = React.useState({})
    const [students, setStudents] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            try {
                let arr = []
                const teacherRes = await axios.get(`https://reaserver.onrender.com/adminDetails`, {
                    params: {
                        adminId: data.id,
                    }
                });
                for (const integer of teacherRes.data.courses) {
                    try {
                        // Make API call
                        const response = await axios.get('https://reaserver.onrender.com/getStudentsUnderTeacher', {
                            params: {
                                courseId: integer.courseId,
                                adminId: data.id
                            }
                        });
                        console.log("resp ", response.data)
                        arr.push(response.data);
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
                setStudents(arr);
                console.log(arr)
                console.log("teacherRes" , teacherRes.data)
                setDetails(teacherRes.data);


            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, [data.id]);



    async function removeStudent(e) {
        var confirmed = window.confirm("Are you sure you want to remove this student from this course?");
        if (confirmed) {
            try {
                const res = await axios.post("https://reaserver.onrender.com/removeStudentFromCourse", {}, {
                    params: {
                        studentId: e.target.value,
                        courseId: data.courseId
                    }
                });
                // console.log(res.data)
                window.location.reload();
            }
            catch (error) {
                console.error('An error occurred:', error);
            }
        }
    }

    async function removeTeacherFromCourse(courseId) {
        // console.log(courseId)
        var confirmed = window.confirm("Are you sure you want to remove this teacher from this course?");
        if (confirmed) {
            try {
                const res = await axios.post("https://reaserver.onrender.com/removeTeacherFromCourse", {}, {
                    params: {
                        adminId: data.id,
                        "courseId": courseId
                    }
                });
                alert(res.data)
                console.log(res.data)
                if (res.data == "success") {
                    window.location.reload();
                }
            }
            catch (error) {
                console.error('An error occurred:', error);
            }
        }
    }

    async function removeTeacherFromAllCourses() {
        var confirmed = window.confirm("Are you sure you want to remove this teacher from all courses?");
        if (confirmed) {
            try {
                const res = await axios.post("https://reaserver.onrender.com/removeTeacherFromAllCourses", {}, {
                    params: {
                        adminId: data.id
                    }
                });
                alert(res.data)
                console.log(res.data)
                if (res.data == "success") {
                    let mail = `rea.adm${data.id}@gmail.com`
                    deleteUser("ZOjbRAvY6dYcyHV0pQ1Dp9JM8nR2").then(() => {
                        window.location.reload();
                    })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            }
            catch (error) {
                console.error('An error occurred:', error);
            }
        }
    }

    console.log(data)


    return (
        <div>
            <Header />
            <section className="teacher-profile" style={{ color: 'black', padding: '20px' }}>
                <h1 className="heading" style={{ marginBottom: '20px' }}>Profile Details</h1>
                <div className="details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                    <button style={{ width: "20rem" }} className="remove-btn" onClick={removeTeacherFromAllCourses}>Remove From Institute</button>
                    <div className="tutor" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                        <img src={details && details.dp} className="image" alt="" style={{ border: '2px solid black', width: '150px', height: '150px' }} />
                        <h3>{details && details.name}</h3>
                        <span className="adminId1" style={{ fontSize: '20px' }}>Admin ID: {details && details.adminId}</span>
                        <p className="mobile1" style={{ fontSize: '20px' }}>Mobile: {details && details.mobile}</p>
                        <p className="mobile1" style={{ fontSize: '20px' }}>Email: {details && details.email}</p>
                    </div>
                    <div className="courses" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                        <h2 className="sub-heading">Courses</h2>
                        {details.courses && details.courses.map((course, index) => (
                            <div>
                                <div className="box" key={index} style={{ padding: '10px', border: '1px solid black', marginBottom: '20px', maxWidth: '300px', alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '18px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', display: "inline-block" }}>
                                    <h3 className="title" style={{ fontSize: '20px' }}>{course.courseName} </h3>
                                </div>
                                <button style={{ marginLeft: "1rem" }} className="remove-btn" onClick={e => removeTeacherFromCourse(course.courseId)}>Remove From This Course</button>

                            </div>
                        ))}
                    </div>
                </div>

                <br></br> <br></br>

                <h1 className="heading" style={{ marginBottom: '20px' }}>Students Assigned</h1>

                {/* <div className='container' style={{ minWidth: "90%" }}> */}
                    {details && details.courses && details.courses.map((course, index) => (
                        <div  className='container' style={{ minWidth: "90%", marginBottom:"10px" }}>
                            <h2 className="sub-heading" style={{ fontSize: '20px' }}>{course.courseName} {"->"} {students[index].length} student{students[index].length !== 1 ? "s" : ""} assigned</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                                <tr style={{ backgroundColor: '#8E44AD' , color:"white"}}>
                                    <th style={{ padding: '10px', border: '1px solid #e8e6e6' }}>Student Id</th>
                                    <th style={{ padding: '10px', border: '1px solid #e8e6e6' }}>Full Name</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone Number</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mail ID</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                                </tr>
                                {students[index] && students[index].map((student, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{student.studentId}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{student.name}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{student.mobile}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{student.email}</td>
                                            <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black', textAlign: "center" }}>
                                                <button value={student.studentId} className="remove-btn" onClick={removeStudent}>Remove Student</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    ))}
                {/* </div> */}


            </section>




        </div>
    )

}

export default AllTeachersProfileView