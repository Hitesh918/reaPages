import React from 'react';
import Header from '../components/Header';
import AdminSideBar from '../components/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import axios from 'axios';
import { Link } from 'react-router-dom';
import BASE_URL from '../config';

function AdminLanding(props) {

   const navigate = useNavigate();
   const [loading, setLoading] = React.useState(false);
   // const [courses , setCourses] = React.useState([])



   // React.useEffect(() => {
   //    if(props){
   //       setCourses(props.courses)
   //    }
   // }, [props])
   console.log("props ", props)




   return (
      <div>
         {loading ? <Loader /> :

            <div>
               <Header />
               {/* <AdminSideBar name={props && props.name} role={props && props.userRole} id={props && props.id} dp={props && props.dp}/> */}

               <section className="courses">

                  <h1 className="heading">Courses</h1>

                  <div className="box-container">


                     {props && props.courses && props.courses.map((course) => {
                        return (
                           <div className="box" key={course.courseId}>

                              <div className="thumb">
                                 <img src={`images/${course.courseId}.jpg`} alt="" />
                                 <span>{course.numberOfLevels} Levels</span>
                              </div>
                              <h3 className="title">{course.courseName}</h3>
                              {/* <a href={`/SuperAdminViewCourses?data=${encodeURIComponent(JSON.stringify({ "id": course.courseId }))}`} className="inline-btn">Manage Course  <i class="fa-solid fa-arrow-right"></i></a> */}
                              <Link to={`/AdminViewCourses?data=${encodeURIComponent(JSON.stringify({ 'id': course.courseId }))}`} className="inline-btn">
                                 Manage Course <i className="fa-solid fa-arrow-right"></i>
                              </Link>

                           </div>
                        );
                     })}


                  </div>

                  {/* <div className="more-btn">
                     <a href="/courses" className="inline-option-btn">View All Courses</a>
                  </div> */}

               </section>
            </div>
         }
      </div>
   );
}

export default AdminLanding;


// <div className="tutor">
// <img src="images/pic-2.jpg" alt="" />
// <div className="info">
//    <h3></h3>
// </div>
// </div>