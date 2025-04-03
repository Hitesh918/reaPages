import React from 'react'
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

function ViewStudent(props) {
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [details, setDetails] = React.useState({});
    const [submissions, setSubmissions] = React.useState([])
    const navigate = useNavigate();

    React.useEffect(() => {
        async function getStudentDetails() {
            try {
                const res = await axios.get(`${BASE_URL}/studentDetails`, {
                    params: {
                        studentId: data.id
                    }
                });
                setDetails(res.data);
            } catch (error) {
                console.error("Error fetching student details:", error);
            }
        }

        async function getSubmissions() {
            try {
                const res = await axios.get(`${BASE_URL}/getSubmissions`, {
                    params: {
                        studentId: data.id,
                        courseId: data.courseId
                    }
                });
                setSubmissions(res.data);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            }
        }

        getStudentDetails();
        getSubmissions();

    }, [data.id, data.courseId]);


    // React.useEffect(() => {
    //     async function getStudentDetails() {
    //         const res = await axios.get(`${BASE_URL}/studentDetails`, {
    //             params: {
    //                 studentId: data.id
    //             }
    //         });
    //         setDetails(res.data)
    //     }

    //     async function getSubmissions() {
    //         const res = await axios.get(`${BASE_URL}/getSubmissions`, {
    //             params: {
    //                 studentId: data.id,
    //                 courseId: data.courseId
    //             }
    //         });
    //         setSubmissions(res.data)
    //         console.log("submission " , submissions)
    //     }

    //     getStudentDetails();
    //     getSubmissions();
    // }, [data.id]);

    const handleSubmit = async (page) => {
        // console.log(e)
        try {
            let resp = await axios.get(`${BASE_URL}/getStudentLevel`, {
                params: {
                    studentId: data.id,
                    courseId: data.courseId
                }
            });
            if (resp.data !== "not found") {
                let res = await axios.get(`${BASE_URL}/getTemplateType`, {
                    params: {
                        studentId: data.id,
                        courseId: data.courseId,
                        level: resp.data.level,
                        pageNumber: page
                    }
                });
                if (res.data === "resource not found") {
                    alert("Resource not found")
                }
                else {
                    console.log(res.data.templateType)
                    navigate(`/TPage${res.data.templateType}?data=${encodeURIComponent(JSON.stringify({ "courseId": data.courseId, "studentId": data.id, "pageNumber": page , "level" : resp.data.level}))}`)

                    // if (res.data.templateType === 1) {
                    //     navigate(`/TPage1?data=${encodeURIComponent(JSON.stringify({ "courseId": data.courseId, "studentId": data.id, "pageNumber": page , "level" : resp.data.level}))}`)
                    // }
                    // else if (res.data.templateType === 2) {
                    //     navigate("/TPage2")
                    // }
                }
            }



            // console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    console.log("submission ", submissions);

    return (

        <div>
            <Header />
            <style>
                {`
                    .elem{
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
                        transition: transform .2s;
                        width: 90%;
                        height: 80%;
                        padding: 20px;
                        height: 7rem;
                        margin: auto ;
                        margin-bottom: 10px;
                    }
                    .elem:hover {
                        -ms-transform: scale(1.5); 
                        -webkit-transform: scale(1.5); 
                        transform: scale(1.1); 
                    }

                `}
            </style>
            <section className="teacher-profile" style={{ color: 'black', padding: '20px' }}>

                <h1 className="heading">Student Profile</h1>
                <div className="details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                    <div className="tutor" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                        <img src={details && details.dp} className="image" alt="" style={{ border: '2px solid black', width: '150px', height: '150px' }} />
                        <h3>{details.name}</h3>
                        <span className="adminId1" style={{ fontSize: '20px' }}>Student ID: {details.studentId}</span>
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
                <h1 className="heading">View Submissions</h1>
                {submissions.map((submission, index) => {
                    return (
                        <div value={index} onClick={() => { handleSubmit(submission) }} className='elem'>
                            <h2>Page {submission}</h2>
                        </div>
                    )
                })}
            </section>

        </div>
    )
}

export default ViewStudent