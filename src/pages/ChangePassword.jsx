import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function ChangePassword() {

    const firebase_auth = auth;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const [signInDetails, setSignInDetails] = React.useState({
        email: "",
        oldPassword: "",
        newPassword: ""
    })


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    })




    function handleSignInChange(e) {
        const { name, value } = e.target;
        e.preventDefault();
        setSignInDetails((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
        console.log(signInDetails)
    }


    function handleSignIn(e) {
        e.preventDefault();
        //   setLoading(true);
        let credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            signInDetails.oldPassword
        );
        reauthenticateWithCredential(auth.currentUser, credential)
            .then(result => {
                console.log(result)
                const user = auth.currentUser;
                const newPassword = signInDetails.newPassword;
                updatePassword(user, newPassword).then(() => {
                    alert("Password updated successfully")
                    navigate("/login", { replace: true });
                }).catch((er) => {
                    alert(er.message)
                });

            }).catch((error) => {
                alert(error.message)
                console.log(error)
            })


    }

    return (
        <div>
            {loading ? <Loader /> :
                <div style={{ position: "relative", right: "13rem" }}>

                    <section className="form-container">

                        <form>
                            <h3>Change Password </h3>
        
                            <p>Old Password <span>*</span></p>
                            <input type="password" name="oldPassword" onChange={handleSignInChange} placeholder="Enter old Password" required maxLength="20" className="box" />
                            <p>New Password <span>*</span></p>
                            <input type="password" name="newPassword" onChange={handleSignInChange} placeholder="Enter new Password" required maxLength="20" className="box" />
                            <button onClick={handleSignIn} className="btn">Change</button>
                        </form>

                    </section>

                </div>
            }
        </div>
    )
}
export default ChangePassword



