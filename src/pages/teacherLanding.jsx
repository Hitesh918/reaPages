import React from 'react';
import Header from '../components/Header';
import TeacherSideBar from '../components/TeacherSideBar';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import axios from 'axios';
import { Link } from 'react-router-dom';

function TeacherLanding(props) {

   const navigate = useNavigate();
   const [loading, setLoading] = React.useState(false);
   // const [courses , setCourses] = React.useState([])

   console.log(props)



   // React.useEffect(() => {
   //    if(props){
   //       setCourses(props.courses)
   //    }
   // }, [props])
   // console.log("props " , props.courses)


   async function startGoogleMeetCall() {
      try {
         const resp = await axios.get("http://localhost:4000/api/createMeeting");
         console.log(resp.data)
         window.open(resp.data.meetingLink, "_blank")
      }
      catch (error) {
         console.error('An error occurred:', error);
      }
   }



   return (
      <div>
         {loading ? <Loader /> :
            <div>
               <Header />
               {/* <TeacherSideBar name={props && props.name} /> */}

               {/* <section className="home-grid">

                  <h1 className="heading">Quick options</h1>

                  <div className="box-container">

                     <div className="box" >
                        <div className="schedule">
                           <h2 className="heading">Upcoming Schedule</h2>
                           <div className="event">
                              <p className="name">Math className</p>
                              <p className="datetime">4th March | 19:20</p>
                           </div>

                        </div>

                     </div>

                     <div className="box">
                        <h3 className="title">top categories</h3>
                        <div className="flex">
                           <a href="#"><i className="fas fa-code"></i><span>development</span></a>
                           <a href="#"><i className="fas fa-chart-simple"></i><span>business</span></a>
                           <a href="#"><i className="fas fa-pen"></i><span>design</span></a>
                           <a href="#"><i className="fas fa-chart-line"></i><span>marketing</span></a>
                           <a href="#"><i className="fas fa-music"></i><span>music</span></a>
                           <a href="#"><i className="fas fa-camera"></i><span>photography</span></a>
                           <a href="#"><i className="fas fa-cog"></i><span>software</span></a>
                           <a href="#"><i className="fas fa-vial"></i><span>science</span></a>
                        </div>
                     </div>

                     <div className="box">
                        <h3 className="title">My classNamees</h3>
                        <div className="flex">
                           <a href="#"><i className="fab fa-html5"></i><span>HTML</span></a>
                           <a href="#"><i className="fab fa-css3"></i><span>CSS</span></a>
                           <a href="#"><i className="fab fa-js"></i><span>javascript</span></a>
                           <a href="#"><i className="fab fa-react"></i><span>react</span></a>
                           <a href="#"><i className="fab fa-php"></i><span>PHP</span></a>
                           <a href="#"><i className="fab fa-bootstrap"></i><span>bootstrap</span></a>
                        </div>
                     </div>

                     <div className="meetclass">
                        <h3 className="title">Start Class </h3>
                        <p className="tutor">Begin Your Classes</p>
                        <button id="startClassBtn" onClick={startGoogleMeetCall}>Start Class</button>
                     </div>
                  </div>

               </section> */}

               <section className="courses">
                  <h1 className="heading">Courses</h1>
                  <div className="box-container">
                     {props && props.courses && props.courses.map((course) => {
                        return (
                           <div className="box" key={course.courseId}>
                              <div className="thumb">
                                 <img src={`images/${course.courseId}.png`} alt="" />
                               <span>{course.numberOfBatches} Batches</span> { }
                              </div>
                              <h3 className="title">{course.courseName}</h3>
                              <Link to={`/ManageCourse?data=${encodeURIComponent(JSON.stringify({"id": course.courseId, "numberOfBatches": course.numberOfBatches , "adminId" : props&&props.adminId}))}`} className="inline-btn">Manage Course <i className="fa-solid fa-arrow-right"></i></Link>

                           </div>   
                        );
                     })}
                     {props && props.courses && props.courses.length === 0 && <h1>No Courses</h1>}
                     {props && props.courses && props.courses.length < 2 && <div></div>}
                  </div>
                  <div className="more-btn">
                     <a href="/courses" className="inline-option-btn">View All Courses</a>
                  </div>
               </section>
            </div>
         }
      </div>
   );
}

export default TeacherLanding;


// <div className="tutor">
// <img src="images/pic-2.jpg" alt="" />
// <div className="info">
//    <h3></h3>
// </div>
// </div>