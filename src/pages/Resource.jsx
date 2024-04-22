import React from 'react'
import Header from '../components/Header';
import StudentSideBar from '../components/StudentSideBar';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Resource(props) {
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [link, setLink] = React.useState("")
    const [resources, setResources] = React.useState([]);

    // React.useEffect(() => {
    //     async function getCourseDetails() {
    //         const res = await axios.get(`https://reaserver.onrender.com/getResources`, {
    //             params: {
    //                 courseId: data.id,
    //                 level: data.level
    //             }
    //         });
    //         setResources(res.data);
    //     }
    //     getCourseDetails();
    // }, [data.id, data.level]);

    React.useEffect(() => {
        async function getLink() {
            try {
                const res = await axios.get(`https://reaserver.onrender.com/getClassLink`, {
                    params: {
                        studentId: data.studentId,
                        courseId: data.id,
                    }
                });
                console.log(res.data)
                setLink(res.data.classLink)
            }
            catch (error) {
                console.error('An error occurred:', error);
            }
        }
        getLink();
    }, [data.id , props]);

    const openLink = () => {
        window.open(link, '_blank');
    };


        console.log(props)
        // console.log(resources)

        return (

            <div>
                <Header />
                {/* <StudentSideBar name={props.name} /> */}

                <section className="playlist-details">

                    <div className="meetclass">
                        <p className="tutor">Attend Your Classes here</p> <br></br>
                        <button onClick={openLink} id="startClassBtn">Join Class</button>
                    </div>

                    <br></br>

                    <h1 className="heading">Resources</h1>
                    <div >

                        {/* {resources && resources.map((resource, index) => {
                        return (
                            <div className="box" key={index}>
                                <div style={{ cursor: "pointer" }} className="thumb" onClick={() => window.open(resource, '_blank')}>
                                    <iframe src={resource}></iframe>

                                    <span style={{ color: "black", fontSize: "2rem", position: "relative", bottom: "5rem", left: "2rem" }} >Click Here</span>
                                </div>
                            </div>
                        )
                    })} */}

                    </div>

                </section>
            </div>
        )
    }

export default Resource