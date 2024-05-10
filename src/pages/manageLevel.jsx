import React from 'react'
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageLevel(props) {
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [students, setStudents] = React.useState([]);
    const [choosenBatch, setChoosenBatch] = React.useState(-1)
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        async function getCourseDetails() {
            const res = await axios.get(`http://localhost:5000/getStudentList`, {
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
    //             const res = await axios.post("http://localhost:5000/changeBatch", {}, {
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
                const res = await axios.post("http://localhost:5000/changeBatch", {}, {
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
        const link = document.getElementById("link").value;
        console.log(link)
        try {
            // const resp = await axios.get("http://localhost:5000/api/createMeeting");
            // console.log(resp.data)
            await axios.post("http://localhost:5000/updateClassLink", {}, {
                params: {
                    adminId: data.adminId,
                    batch: data.batch,
                    courseId: data.id,
                    classLink: link
                }
            })
            alert("Class link updated successfully")
            // window.open(resp.data.meetingLink, "_blank")
            console.log("updated class link")
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    }
    function start() {
        var confirmed = window.confirm("Are you sure you want to start the class?");
        if (confirmed) {
            setIsVisible(true);
            window.open("https://meet.google.com/new", "_blank")
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
                        <button id="startClassBtn" onClick={start}>Start Class</button>
                        {isVisible &&
                            <div>
                                <div className="form-group">
                                    <h2 style={{ color: "black", marginBottom: "1.2rem" , marginTop:"1.2rem"}}>Enter GMeet Link</h2>
                                    <input autoComplete='off' style={{ border: "solid black", borderWidth: "1px", borderRadius: "5px", padding: "3px", marginBottom: "2rem" }} type="text" id="link" name="link" required /> <br />
                                    <i style={{ fontSize: "2.7rem", color: "#8a2be2", cursor: "pointer" }} className="fas fa-right-from-bracket" onClick={startGoogleMeetCall}></i>
                                </div>
                            </div>}

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
                                        <Link to={`/ViewStudent?data=${encodeURIComponent(JSON.stringify({ "id": student.studentId, courseId: data.id }))}`} className="profile-btn">View Profile</Link>
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