import React from 'react'
import Header from '../components/Header';
import StudentSideBar from '../components/StudentSideBar';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Levels(props) {
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [courseDetails, setCourseDetails] = React.useState({});

    React.useEffect(() => {
        if (props && props.id && data && data.id) {
            async function getCourseDetails() {
                const res = await axios.get(`https://reaserver.onrender.com/getCourseDetails?courseId=${data.id}&studentId=${props.id}`);
                setCourseDetails(res.data);
            }
            getCourseDetails();

        }
        console.log("courseDetails", courseDetails)
    }, [data.id, props.id]);

    // console.log(props)
    // console.log(data)
    return (
        <div>
            <Header />
            {/* <StudentSideBar name={props && props.name} /> */}
            <section className="playlist-details">

                <h1 className="heading">Course details</h1>

                <div className="row">

                    <div className="column">

                        <div className="thumb">
                            <img src={`images/${data && data.id}.png`} alt="" />
                            <span>{data && data.numberOfLevels} levels</span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="tutor">
                            <img src="images/pic-2.jpg" alt="" />
                            <div>
                                <h3>{courseDetails.teacherName}</h3>
                            </div>
                        </div>

                        <div className="details">
                            <h3>About Teacher</h3>
                            {courseDetails && courseDetails.profile && <p>{courseDetails.profile}<p><p></p></p></p>}
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum minus reiciendis, error sunt veritatis exercitationem deserunt velit doloribus itaque voluptate.</p> */}
                            {/* <a href="/teacher_profile" className="inline-btn">view profile</a> */}
                        </div>
                    </div>
                </div>

            </section>

            <section className="playlist-videos">

                <h1 className="heading">Levels</h1>

                <div className="box-container">

                    {Array.from({ length: data && data.numberOfLevels }, (_, i) => (
                        <Link
                            to={`/resource?data=${encodeURIComponent(JSON.stringify({ "id": data.id, "level": data.level, "studentId": data.studentId }))}`}
                            className={`box ${i+1 !== data.level ? 'disabled-link' : ''}`}
                        >
                            <i className="fas fa-play"></i>
                            <img src="images/post-1-1.png" alt="" />
                            <h3>Level {i+1}</h3>
                        </Link>
                    ))}

                </div>

            </section>


        </div>
    )
}

export default Levels;