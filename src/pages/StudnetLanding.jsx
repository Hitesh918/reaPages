import React from 'react'
import StudentSideBar from '../components/StudentSideBar'
import Header from '../components/Header'
import auth from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import axios from 'axios';
import { Link } from 'react-router-dom';
function StudentLanding(props) {

   const navigate = useNavigate();
   const [loading, setLoading] = React.useState(false);
   // const [courses , setCourses] = React.useState([])
   // const [studentName , setStudentName] = React.useState("")

   // React.useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const user = await new Promise((resolve, reject) => {
   //             onAuthStateChanged(auth, (user) => {
   //                resolve(user);
   //             });
   //          });

   //          setTimeout(async () => {
   //             setLoading(false);
   //             if (user && user.email.substring(4, 7) === "stu") {
   //                const studentDetails = await axios.get("https://reaserver.onrender.com/coursesEnrolledIn", {
   //                   params: {
   //                      studentId: user.email.substring(7, 12)
   //                   }
   //                });
   //                console.log("Student Details:", studentDetails);
   //                setStudentName(studentDetails.data.name);
   //                setCourses(studentDetails.data.courses);
   //                navigate("/Student", { replace: true });
   //             } else {
   //                navigate("/logIn", { replace: true });
   //             }
   //          }, 1000);
   //       } catch (error) {
   //          console.error("Error fetching student details:", error);
   //          // Handle error as needed
   //       }
   //    };

   //    fetchData();
   // }, []);
   console.log("props ", props.courses)

   return (
      <div>
         {loading ? <Loader /> :
            <div>

               <Header />
               {/* <StudentSideBar name={props && props.name} /> */}

               {/* <section className="home-grid">

                  <h1 className="heading">quick options</h1>

                  <div className="box-container">

                     <div className="box" >
                        <div className="schedule">
                           <h2 className="heading">Upcoming Schedule</h2>
                           <div className="event">
                              <h1>Cursive writing</h1>
                              <h1>John Deo</h1>
                              <h1>14th April | 19:20</h1>
                           </div>
                           
                           <div className="meetclass">
                        <button id="startClassBtn">Join Class</button>
                     </div>

                        </div>

                     </div>

                     <div className="box">
                        <h3 className="title">Top Categories</h3>
                        <div className="flex">
                           <a href="#"><i className="fas fa-calculator"></i><span>Arithmetic</span></a>
                           <a href="#"><i className="fas fa-chart-line"></i><span>Activeness</span></a>
                           <a href="#"><i className="fas fa-feather-alt"></i><span>Imagination</span></a>
                           <a href="#"><i className="fas fa-brain"></i><span>Memory Power</span></a>
                           <a href="#"><i className="fas fa-laptop-code"></i><span>Self-Confidence</span></a>
                           <a href="#"><i className="fas fa-microchip"></i><span>Concentration</span></a>
                           <a href="#"><i className="fas fa-tachometer-alt"></i><span>Creativity</span></a>
                        </div>
                     </div>

                     <div className="box">
                        <h3 className="title">My Classes</h3>
                        <div className="flex">
                           <a href="#"><i className="fas fa-calculator"></i><span>Abacus</span></a>
                           <a href="#"><i className="fas fa-square-root-alt"></i><span>Vedic Math</span></a>
                           <a href="#"><i className="fas fa-pen-nib"></i><span>Cursive writing</span></a>
                           <a href="#"><i className="fas fa-brain"></i><span>Memory techniques</span></a>
                           <a href="#"><i className="fas fa-robot"></i><span>E-Kids</span></a>
                        </div>
                     </div>


                  </div>

               </section>
 */}


               <section className="courses">

                  <h1 className="heading">Courses</h1>

                  <div className="box-container">


                     {props && props.courses && props.courses.map((course) => {
                        return (
                           <div className="box" key={course._id}>
                              <div className="tutor">
                                 <img src="images/pic-2.jpg" alt="" />
                                 <div className="info">
                                    <h3>{course.teacherName}</h3>
                                 </div>
                              </div>
                              <div className="thumb">
                                 <img src={`images/${course.courseDetails.courseId}.png`} alt="" />
                                 <span>{ course &&  course.courseDetails.numberOfLevels}  Levels</span>
                              </div>
                              <h3 className="title">{course.courseDetails.courseName}</h3>
                              <h2 style={{ color: "black" }}>Level {course.presentLevel}</h2>
                              <Link
                                 to={{
                                    pathname: '/levels',
                                    search: `?data=${encodeURIComponent(JSON.stringify({ "id": course.courseDetails.courseId, "level": course.presentLevel, "numberOfLevels": course.courseDetails.numberOfLevels , "studentId" : props.id}))}`
                                 }}
                                 className="inline-btn"
                              >
                                 Continue Learning <i className="fa-solid fa-arrow-right"></i>
                              </Link>

                           </div>
                           
                        );
                     })}

                     {props && props.courses && props.courses.length === 0 && <h1>No Courses Enrolled</h1>}
                     {props && props.courses && props.courses.length < 2 && <div></div>}





                  </div>

                  <div className="more-btn">
                     <a href="/courses" className="inline-option-btn">View All Courses</a>
                  </div>

               </section>



            </div>
         }
      </div>
   )
}

export default StudentLanding


