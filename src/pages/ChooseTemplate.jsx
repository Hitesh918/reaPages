import React, { useState } from 'react';
import Header from '../components/Header';
import AdminSideBar from '../components/AdminSideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

function ChooseTemplate(props) {
    
    const navigate = useNavigate();

   const [choosenCourse, setChoosenCourse] = useState(null)
   const [numberOfLevels, setNumberOfLevels] = useState(null)

   const handleChange = (e) => {
      setChoosenCourse(e.target.value)
      // console.log(choosenCourse)
      props.courses.map((course, index) => {
         if (course.courseName === e.target.value) {
            setNumberOfLevels(course.numberOfLevels)
         }
      })
   }

   function getCourseId(name) {
      try{
         for (let i = 0; i < props.courses.length; i++) {
            if (props.courses[i].courseName === name) {
                return props.courses[i].courseId;
            }
        }
      }
      catch(e){
         console.log(e)
      }
  }
  

   const handleSubmit =  () => {
        let page= document.getElementById("templates").value
        let level = document.getElementById("levels").value
        if(document.getElementById("courses").value === "idk"){
            alert("Please select a course")
            return
         }
        navigate(`/${page}?data=${encodeURIComponent(JSON.stringify({ "courseId": getCourseId(choosenCourse) , "level" : parseInt(level)}))}`)
   }


   return (
      <div>
         <Header />
         <section className="home-grid">
            <h1 className="heading">Create New Resource</h1>
            <div style={{ marginTop: "10rem", color: "black", height: "35rem" }} className='container'>

               <div className="form-group">
                  <h1>Course</h1>
                  <select onChange={handleChange} id="courses" name="courses" required>
                     <option value="idk" disabled selected>Select Course</option>
                     {
                        props && props.courses && props.courses.map((course, index) => (
                           <option value={course.courseName} >{course.courseName}</option>
                        ))
                     }
                  </select>
               </div>
               <div className="form-group">
                  <h1>Level</h1>
                  <select id="levels" name="courses" required>

                     {
                        numberOfLevels && Array.from({ length: numberOfLevels }, (_, i) => i + 1).map((level, index) => (
                           <option value={level} >{level}</option>
                        ))
                     }
                  </select>
               </div>
               <div className="form-group">
                  <h1>Choose Template</h1>
                  <select id="templates" name="templates" required>
                     <option value="Page1" >Template-1 (3 , 4 , 5)</option>
                     <option value="Page2" >Template-2 (3 , 3 , 4)</option>
                     <option value="Page3" >Template-3 (3 , 4 , 4)</option>
                     <option value="4" >Template-4 (4 tables)</option>
                     <option value="5" >Template-5 (Complements)</option>
                     <option value="6" >Template 6</option>
                     <option value="7" >Template 7</option>
                  </select>
               </div>

               <br />
               <button className="inline-btn" onClick={handleSubmit}>Create {` ->`}</button>

            </div>

         </section>



      </div>
   );
}

export default ChooseTemplate;
