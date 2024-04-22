import React, { useState, useRef } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigate , useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminSideBar(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState("images/pic-1.jpg");
    const fileInput = useRef(null); //added this to make reference to file input

    function handleLogOut(e) {
        e.preventDefault()
        signOut(auth)
            .then(() => {
                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 1000)
            })
            .catch((e) => {
                alert(e)
            })
    }

    React.useEffect(() => {
        if(props && props.dp !== ""){
            setProfilePic(props.dp);
        }
    }, [props.dp]);

    function handleProfilePicChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                setProfilePic(base64Image); 
                axios.post("https://reaserver.onrender.com/uploadDP", { image: base64Image , role : props.role , id : props.id})
                    .then((res) => {
                        if (res.data === "Resource added") {
                            alert("DP updated successfully");
                        } else {
                            alert("Failed to upload");
                        }
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("Failed to upload profile picture . Please try again later.");
                    });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    if(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/changePassword" ){
        return null;
    }

    return (
        <div className="side-bar">

            <div id="close-btn">
                <i className="fas fa-times"></i>
            </div>

            <div className="profile">
                <img src={profilePic} className="image" alt="" title="Click here to change profile picture." onMouseOver={() => document.getElementById('profilePicInput').style.display = 'block'} onMouseOut={() => document.getElementById('profilePicInput').style.display = 'none'} onClick={() => fileInput.current.click()} />
                <input type="file" id="profilePicInput" style={{ display: 'none' }} onChange={handleProfilePicChange} ref={fileInput} />
                <h3 className="name">{props.name}</h3>
                <p className="role">Admin</p>
                <Link to="/adminprofile" className="btn">View Profile</Link>
            </div>

            <nav className="navbar"> <Link to="/admin"><i className="fas fa-home"></i><span>Home</span></Link>
                <Link to="/adminAddStudent"><i className="fas fa-plus"></i><span>Add New Student</span></Link>
                <Link to="/adminAddTeacher"><i className="fas fa-plus"></i><span>Add New Teacher</span></Link>
                {/* <Link to="/courses" ><i className="fas fa-plus"></i><span>Add Course</span></Link> */}
                <Link to="/adminuploadmaterial"><i className="fas fa-graduation-cap"></i><span>Upload Material</span></Link>
                <Link to="/logout" onClick={handleLogOut}><i className="fas fa-right-from-bracket"></i><span>Log Out</span></Link>
            </nav>

        </div>
    );
}

export default AdminSideBar;
