import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminLanding from './pages/AdminLanding.jsx';
import AdminAddStudent from './pages/adminAddStudent.jsx';
import AdminAddTeacher from './pages/AdminAddTeacher.jsx';
import AdminUpdate from './pages/adminupdate.jsx';
import AdminProfile from './pages/adminProfile.jsx';
import AdminUploadMaterial from './pages/AdminUploadMaterial.jsx';
import AdminViewTeacherProfile from './pages/AdminViewTeacherProfile.jsx';
import AdminViewCourses from './pages/AdminViewCourse.jsx';
import AdminViewStudent from './pages/AdminViewStudent.jsx';
import AddEventForm from './pages/AddEventForm.jsx';
import AllTeachers from './pages/AllTeachers.jsx';
import AllTeachersProfileView from './pages/AllTeachersProfileView.jsx';
import ChooseTemplate from './pages/ChooseTemplate.jsx';
import Page1 from './pages/345.jsx';
import Page2 from './pages/334.jsx';
import Page3 from './pages/344.jsx';
import Page4 from './pages/4boxes.jsx';
import SPage1 from './pages/Spage345.jsx';
import SPage2 from './pages/Spage334.jsx';
import SPage3 from './pages/Spage344.jsx';
import TPage1 from './pages/Tpage345.jsx';
import TPage2 from './pages/Tpage334.jsx';
import TPage3 from './pages/Tpage344.jsx';
import TeacherLanding from './pages/teacherLanding.jsx';
import TeacherProfile from './pages/teacher_profile.jsx';
import ViewStudent from './pages/ViewStudent.jsx';
import ManageCourse from './pages/ManageCourse.jsx';
import ManageLevel from './pages/manageLevel.jsx';

import StudnetLanding from './pages/StudnetLanding.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Courses from './pages/courses.jsx';
import Levels from './pages/Levels.jsx';
import Resource from './pages/Resource.jsx';
import StudentProfile from './pages/StudentProfile.jsx';

import Playlist from './pages/playlist.jsx';
import Teachers from './pages/teachers.jsx';
import Register from './pages/register.jsx';
import Update from './pages/update.jsx';
import WatchVideo from './pages/watch_video.jsx';
import courses from './pages/courses.jsx';


import Login from './pages/login.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import Header from './components/Header.jsx';
import AdminSideBar from './components/AdminSideBar.jsx';
import TeacherSideBar from './components/TeacherSideBar.jsx';
import StudentSideBar from './components/StudentSideBar.jsx';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js"
import axios from "axios"

import Main from './pages/Landing.jsx';

function App() {

    function extractMiddleString(str) {
        // Remove '@gmail.com' from the end
        const trimmedEnd = str.replace(/@gmail\.com$/, '');

        // Remove 'rea.adm' from the beginning
        const trimmedStart = trimmedEnd.replace(/^rea\.adm/, '');

        // Return the remaining string
        return trimmedStart;
    }


    const [allCourses, setAllCourses] = useState([]);

    const [userRole, setUserRole] = useState(null);
    const [userMail, setUserMail] = useState("")
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.email);
                if (user.email.substring(4, 8) === "sudo") {
                    setUserRole("admin");
                    setUserMail(user.email)
                } else if (user.email.substring(4, 7) === "adm") {
                    setUserRole("teacher");
                    setUserMail(user.email)
                } else if (user.email.substring(4, 7) === "stu") {
                    setUserRole("student");
                    setUserMail(user.email)
                }
            }
            else {
                setUserRole(null);
            }
        });

        return () => unsubscribe(); // Clean up the subscription
    }, []);

    useEffect(() => {
        const fetchDataForStudentPages = async (id) => {
            console.log("callllllled")
            try {
                const studentDetails = await axios.get("https://reaserver.onrender.com/studentDetails", {
                    params: {
                        studentId: id
                    }
                });
                return studentDetails.data;
            } catch (error) {
                console.error("Error fetching student details:", error);
                throw error; // Rethrow error for further handling if needed
            }
        };

        const fetchDataForAdminPages = async (id) => {
            console.log("callllllled")
            try {
                const adminDetails = await axios.get("https://reaserver.onrender.com/adminDetails", {
                    params: {
                        adminId: id
                    }
                });
                return adminDetails.data;
            } catch (error) {
                console.error("Error fetching admin details:", error);
                throw error;
            }
        };

        const fetchDataForSuperAdminPages = async (id) => {
            console.log("callllllled")
            try {
                const superAdminDetails = await axios.get("https://reaserver.onrender.com/superAdminDetails", {
                    params: {
                        superAdminId: id
                    }
                });
                console.log("superAdminDetails", superAdminDetails)
                return superAdminDetails.data;
            } catch (error) {
                console.error("Error fetching superAdmin details:", error);
                throw error;
            }
        }
        const fetchCourseList = async () => {
            console.log("callllllled")
            try {
                const courses = await axios.get("https://reaserver.onrender.com/courseList");
                return courses.data;
            } catch (error) {
                console.error("Error fetching admin details:", error);
                throw error;
            }
        };

        const fetchData = async (id) => {
            try {
                if (userRole === 'admin') {
                    const superAdminData = await fetchDataForSuperAdminPages(id);
                    let courses = await fetchCourseList();
                    setAllCourses(courses);
                    setUserData(superAdminData);
                }
                else if (userRole === 'teacher') {
                    const adminData = await fetchDataForAdminPages(id)
                    setUserData(adminData)
                }
                else if (userRole === 'student') {
                    const studentData = await fetchDataForStudentPages(id);
                    setUserData(studentData);
                }
                else {

                }
            } catch (error) {

                console.log(error)
            }
        };

        if (userRole && userMail) {
            if (userRole === "admin") {
                fetchData(userMail.substring(8, 13));
            }
            else if (userRole === "teacher") {
                fetchData(extractMiddleString(userMail));
            }
            else {
                fetchData(userMail.substring(7, 13));
            }

        }
    }, [userRole, userMail]);


    return (
        <div>
            <BrowserRouter>
                <div>

                    {userRole === "admin" && userData && <AdminSideBar name={userData && userData.name} role={userRole} id={userData && userData.superAdminId} dp={userData && userData.dp} />}
                    {userRole === "teacher" && userData && <TeacherSideBar name={userData && userData.name} role={userRole} id={userData && userData.adminId} dp={userData && userData.dp} />}
                    {userRole === "student" && userData && <StudentSideBar name={userData && userData.name} role={userRole} id={userData && userData.studentId} dp={userData && userData.dp} />}
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/changePassword' element={<ChangePassword />} />
                        <Route path='/login' element={<Login />} />
                        {/* Admin routes */}
                        {userRole === 'admin' && (
                            <>
                                <Route path='/Admin' element={<AdminLanding courses={allCourses} userRole={userRole} id={userData && userData.superAdminId} />} />
                                <Route path='/AdminAddStudent' element={<AdminAddStudent courses={allCourses} id={userData && userData.superAdminId} />} />
                                <Route path='/AdminAddTeacher' element={<AdminAddTeacher courses={allCourses} id={userData && userData.superAdminId} />} />
                                {/* <Route path='/adminupdate' element={<AdminUpdate />} /> */}
                                <Route path='/AdminProfile' element={<AdminProfile details={userData} />} />
                                <Route path='/AdminUploadMaterial' element={<AdminUploadMaterial courses={allCourses} />} />
                                <Route path='/AdminViewCourses' element={<AdminViewCourses />} />
                                <Route path='/AdminViewTeacherProfile' element={<AdminViewTeacherProfile />} />
                                <Route path='/AdminViewStudent' element={<AdminViewStudent />} />
                                <Route path='/AddEventForm' element={<AddEventForm />} />
                                <Route path='/AllTeachers' element={<AllTeachers />} />
                                <Route path='/AllTeachersProfileView' element={<AllTeachersProfileView />} />
                                <Route path='/ChooseTemplate' element={<ChooseTemplate courses={allCourses} />} />
                                <Route path='/Page1' element={<Page1 />} />
                                <Route path='/Page2' element={<Page2 />} />
                                <Route path='/Page3' element={<Page3 />} />
                                <Route path='/Page4' element={<Page4 />} />
                            </>
                        )}
                        {userRole === "teacher" && (
                            <>
                                <Route path='/Teacher' element={<TeacherLanding courses={userData && userData.courses} adminId={userData && userData.adminId} />} />
                                <Route path='/TeacherProfile' element={<TeacherProfile details={userData} />} />
                                <Route path='/ViewStudent' element={<ViewStudent />} />
                                <Route path='/ManageCourse' element={<ManageCourse />} />
                                <Route path='/ManageLevel' element={<ManageLevel />} />
                                <Route path='/TPage1' element={<TPage1 />} />
                                <Route path='/TPage2' element={<TPage2 />} />
                                <Route path='/TPage3' element={<TPage3 />} />
                            </>
                        )}
                        {/* Student routes */}
                        {userRole === 'student' && (
                            <>
                                <Route path='/Student' element={<StudnetLanding courses={userData && userData.courses} userRole={userRole} id={userData && userData.studentId} />} />
                                <Route path='/playlist' element={<Playlist />} />
                                <Route path='/StudentProfile' element={<StudentProfile details={userData} />} />
                                <Route path='/levels' element={<Levels id={userData && userData.studentId} />} />
                                <Route path='/resource' element={<Resource id={userData && userData.studentId} />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/contact' element={<Contact />} />
                                <Route path='/SPage1' element={<SPage1 />} />
                                <Route path='/SPage2' element={<SPage2 />} />
                                <Route path='/SPage3' element={<SPage3 />} />
                            </>
                        )}
                        {/* Common routes */}
                        <Route path='/courses' element={<Courses />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/teachers' element={<Teachers />} />
                        <Route path='/teacher_profile' element={<TeacherProfile />} />
                        <Route path='/update' element={<Update />} />
                        <Route path='/watch_video' element={<WatchVideo />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );

}

export default App;
