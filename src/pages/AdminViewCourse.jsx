import React from 'react'
import Header from '../components/Header';
import AdminSideBar from '../components/AdminSideBar';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BASE_URL from '../config';

function AdminViewCourses(props) {
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [teachers , setTeachers ] = React.useState([])
    const [teacherList , setTeacherList ] = React.useState([])

    // const [courseDetails, setCourseDetails] = React.useState({});

    React.useEffect(() => {
        async function getTeachers() {
            try {
                const res = await axios.get(`${BASE_URL}/sudoTeacherList?courseId=${data.id}`);
                setTeachers(res.data)
                setTeacherList(res.data.map(teacher => ({"adminId": teacher.adminId , "name": teacher.name , })))
                console.log(res.data)
            }
            catch (e) {
                console.log(e)
            }
        }
        getTeachers();
    }, [data.id]);


    
    return (
        <div>
            <Header />
            {/* <AdminSideBar name={props && props.name} /> */}

            <section className="playlist-videos">

                <h1 className="heading">Teachers</h1>
                <div className='container' style={{ minWidth: "80%" }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <tr style={{ backgroundColor: '#8E44AD' }}>
                            <th style={{ padding: '10px', border: '1px solid #e8e6e6' }}>Teacher Id</th>
                            <th style={{ padding: '10px', border: '1px solid #e8e6e6' }}>Full Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone Number</th>
                            {/* <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mail ID</th> */}
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                        </tr>
                        {teachers.map((teacher, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{teacher.adminId}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{teacher.name}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{teacher.mobile}</td>
                                    {/* <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>{student.email}</td> */}
                                    <td style={{ padding: '10px', border: '1px solid #ddd', color: 'black', textAlign: "center" }}>
                                        <Link to={`/AdminViewTeacherProfile?data=${encodeURIComponent(JSON.stringify({ "id": teacher.adminId , "courseId":data.id , "teacherList" : teacherList}))}`} className="profile-btn">View Profile</Link>
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

export default AdminViewCourses;