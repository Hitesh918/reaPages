import React from 'react'
import Header from '../components/Header';
import TeacherSideBar from '../components/TeacherSideBar';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageLevel(props) {
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [students, setStudents] = React.useState([]);
    const [choosenBatch, setChoosenBatch] = React.useState(-1)

    React.useEffect(() => {
        async function getCourseDetails() {
            const res = await axios.get(`https://reaserver.onrender.com/getStudentList`, {
                params: {
                    courseId: data.id,
                    adminId: data.adminId,
                    batch: data.batch
                }
            });
            setStudents(res.data)
        }
        getCourseDetails();
    }, [data.id, data.batch, data.adminId]);

    // async function handleChange(e) {
    //     setChoosenBatch(e.target.value)
    //     var confirmed = window.confirm("Are you sure you want to put thhis student into new batch?");
    //     if (confirmed) {
    //         try {
    //             const res = await axios.post("https://reaserver.onrender.com/changeBatch", {}, {
    //                 params: {
    //                     studentId: e.target.value,
    //                     courseId: data.id,
    //                     batch: e.target.value
    //                 }
    //             });
    //             console.log(res.data)
    //             // if(res.data === "success"){
    //             //     window.location.reload()
    //             // }
    //         }
    //         catch (error) {
    //             console.error('An error occurred:', error);
    //         }
    //     }
    // }
    async function handleChange(studentId, index, newValue) {
        // Here you have access to studentId, index, and the new value (newValue)
        // You can perform any necessary logic here
        console.log("Student ID:", studentId);
        console.log("New Value:", newValue);
        var confirmed = window.confirm("Are you sure you want to put this student into new batch?");
        if (confirmed) {
            try {
                const res = await axios.post("https://reaserver.onrender.com/changeBatch", {}, {
                    params: {
                        studentId: studentId,
                        courseId: data.id,
                        batch: newValue
                    }
                });
                console.log(res.data)
                // if(res.data === "success"){
                //     window.location.reload()
                // }
            }
            catch (error) {
                console.error('An error occurred:', error);
            }
        }
    }


    async function startGoogleMeetCall() {
        try {
            const resp = await axios.get("https://reaserver.onrender.com/api/createMeeting");
            console.log(resp.data)
            await axios.post("https://reaserver.onrender.com/updateClassLink", {}, {
                params: {
                    adminId: data.adminId,
                    batch: data.batch,
                    courseId: data.id,
                    classLink: resp.data.meetingLink
                }
            })
            window.open(resp.data.meetingLink, "_blank")
            console.log("updated class link")
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    }
    // console.log(resources)
    console.log(data)

    return (

        <div>
            <Header />
            {/* <TeacherSideBar name={props.name} /> */}

            <section className="playlist-details">

                <h1 className="heading">Batch {data.batch}</h1>
                <div >

                    <div className="meetclass">
                        <h3 className="title">Start Class </h3>
                        <p className="tutor">Begin Your Classes</p>
                        <button id="startClassBtn" onClick={startGoogleMeetCall}>Start Class</button>
                    </div>
                </div>
                <br /> <br />

                <h1 className="heading">Students</h1>
                <div className='container' style={{ minWidth: "80%" }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <tr style={{ backgroundColor: '#8E44AD' }}>
                            <th style={{ padding: '10px', border: '1px solid #e8e6e6' }}>Student Id</th>
                            <th style={{ padding: '10px', border: '1px solid #e8e6e6' }}>Full Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone Number</th>
                            {/* <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mail ID</th> */}
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                        </tr>
                        {students.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{student.studentId}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{student.name}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{student.mobile}</td>
                                    {/* <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{student.email}</td> */}
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black', textAlign: "center" }}>
                                        <select onChange={e => handleChange(student.studentId, index, e.target.value)} style={{ marginRight: "1rem" }} className="add-btn">
                                            <option value="1">Change Batch</option>

                                            {Array.from({ length: data.numberOfBatches }, (_, i) => i + 1).map((data, index) => {
                                                return (
                                                    <option key={index} value={data}>{data}</option>
                                                )
                                            })}
                                        </select>
                                        <Link to={`/ViewStudent?data=${encodeURIComponent(JSON.stringify({ "id": student.studentId }))}`} className="profile-btn">View Profile</Link>
                                        {/* <button className="profile-btn" >View Profile</button> */}
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>

            </section>
        </div>
    )
}

export default ManageLevel