import React, { useState } from 'react';
import Header from '../components/Header';
import AdminSideBar from '../components/AdminSideBar';
import axios from 'axios';
import BASE_URL from '../config';

function AdminUploadMaterial(props) {

   const [file, setFile] = useState("");
   const [choosenCourse, setChoosenCourse] = useState(null)
   const [numberOfLevels, setNumberOfLevels] = useState(null)
   const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
         const fileReader = new FileReader();
         fileReader.readAsDataURL(file);

         fileReader.onload = () => {
            resolve(fileReader.result);
         };

         fileReader.onerror = (error) => {
            reject(error);
         };
      });
   };

   // console.log("props", props)


   const upload = async () => {
      if (choosenCourse === null || document.getElementById("levels").value === "" || file === "") {
         alert("Please fill in the details")
         return
      }
      const base64 = await convertBase64(file)
      axios.post(`${BASE_URL}/upload`, { image: base64, courseName: choosenCourse, level: document.getElementById("levels").value },
      ).then((res) => {
         if (res.data === "Resource added") {
            setFile("")
            alert("Resource added")
         }
         else {
            alert("Failed to upload")
         }
         console.log(res)
      }).catch((e) => { console.log(e) })
   }

   const handleChange = (e) => {
      setChoosenCourse(e.target.value)
      // console.log(choosenCourse)
      props.courses.map((course, index) => {
         if (course.courseName === e.target.value) {
            setNumberOfLevels(course.numberOfLevels)
         }
      })
   }

   console.log(props.courses)

   return (
      <div>
         <Header />
         {/* <AdminSideBar name={props.name} /> */}
         <section className="home-grid">
            <h1 className="heading">Upload Resources</h1>
            <div style={{ marginTop: "10rem", color: "black", height: "35rem" }} className='container'>

               <div className="form-group">
                  <h1>Course</h1>
                  <select onChange={handleChange} id="courses" name="courses" required>
                     <option value="" disabled selected>Select Course</option>
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


               <input style={{ color: "black" }} type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
               <br />
               <button className="inline-btn" style={{ marginTop: "6rem" }} onClick={upload}>Upload</button>

            </div>

         </section>



      </div>
   );
}

export default AdminUploadMaterial;
