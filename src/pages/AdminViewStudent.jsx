import React from 'react'
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function AdminViewStudent(props) {
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [details, setDetails] = React.useState({});

    React.useEffect(() => {
        async function getStudentDetails() {
            const res = await axios.get(`https://reaserver.onrender.com/studentDetails`, {
                params: {
                    studentId: data.id
                }
            });
            setDetails(res.data)
            console.log("Details", res.data)
        }
        getStudentDetails();
    }, [data.id]);

    async function removeStudentFromAllCourses() {
        var confirmed = window.confirm("Are you sure you want to remove this student from all courses?");
        if (confirmed) {
            try {
                const res = await axios.post("https://reaserver.onrender.com/removeStudentFromAllCourses", {}, {
                    params: {
                        studentId: data.id
                    }
                });
                console.log(res.data)
                if (res.data === "success") {
                    window.location.reload()
                }
            }
            catch (error) {
                console.error('An error occurred:', error);
            }
        }
    }


    return (

        <div>
            <Header />

            <section className="teacher-profile" style={{ color: 'black', padding: '20px' }}>

                <h1 className="heading">Student Profile</h1>
                <div className="details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                    <button style={{ width: "20rem" }} className="remove-btn" onClick={removeStudentFromAllCourses}>Remove From Institute</button>
                    <div className="tutor" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                        <img src={details && details.dp} className="image" alt="" style={{ border: '2px solid black', width: '150px', height: '150px' }} />
                        <h3>{details.name}</h3>
                        <span className="adminId1" style={{ fontSize: '20px' }}>Admin ID: {details.studentId}</span>
                        <p className="mobile1" style={{ fontSize: '20px' }}>Mobile: {details.mobile}</p>
                        <p className="mobile1" style={{ fontSize: '20px' }}>Email: {details.email}</p>
                    </div>
                    <div className="courses" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                        <h2 className="sub-heading">Courses Enrolled</h2>
                        {details.courses && details.courses.map((course, index) => (
                            <div>
                                <div className="box" key={index} style={{ padding: '10px', border: '1px solid black', marginBottom: '20px', maxWidth: '300px', alignItems: 'center', display: 'inline-block', justifyContent: 'center', fontSize: '18px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', display: "inline-block", marginRight: "1rem" }}>
                                    <h3 className="title" style={{ fontSize: '20px', display: "inline-block" }}>{course.courseDetails.courseName}</h3>
                                </div>

                                <div className="box" key={index} style={{ padding: '10px', border: '1px solid black', marginBottom: '20px', maxWidth: '300px', alignItems: 'center', display: 'inline-block', justifyContent: 'center', fontSize: '18px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', display: "inline-block" }}>
                                    <h3 className="title" style={{ fontSize: '20px', display: "inline-block" }}>Level {course.presentLevel}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
                <br></br>

            </section>

        </div>
    )
}

export default AdminViewStudent