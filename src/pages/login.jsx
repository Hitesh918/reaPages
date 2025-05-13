import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import BASE_URL from '../config';

function Login() {

   const firebase_auth = auth;
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);


   const [signInDetails, setSignInDetails] = React.useState({
      email: "",
      password: ""
   })


   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         setTimeout(() => {
            setLoading(false);
            if (user) {
               console.log(user.email.substring(4, 7))
               if (user.email.substring(4, 8) === "sudo") {
                  navigate("/Admin", { replace: true });
               }
               else if (user.email.substring(4, 7) === "adm") {
                  navigate("/Teacher", { replace: true });
               }
               else if (user.email.substring(4, 7) === "stu") {
                  navigate("/Student", { replace: true });
               }
               else {
                  navigate("/login", { replace: true });
               }
            }
            else {
               navigate("/LogIn", { replace: true });
            }
         }, 1000)
      })
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
   }


   function handleSignIn(e) {
      e.preventDefault();
      setLoading(true);

      signInWithEmailAndPassword(auth, signInDetails.email + "@gmail.com", signInDetails.password)
         .then(() => {
            // console.log(signInDetails.email.substring(4, 8))
            setTimeout(() => {
               if (signInDetails.email.substring(4, 8) === "sudo") {
                  navigate("/SuperAdmin", { replace: true });
               }
               else if (signInDetails.email.substring(4, 7) === "adm") {
                  navigate("/Admin", { replace: true });
               }
               else if (signInDetails.email.substring(4, 7) === "stu") {
                  navigate("/Student", { replace: true });
               }
               else {
                  navigate("/login", { replace: true });
               }
            }, 1000)

         })
         .catch((error) => {
            alert("Unable to login at the moment.")
            setLoading(false);
         })

   }

   return (
      <div>
         {loading ? <Loader /> :
            <div style={{ position: "relative", right: "13rem" }}>

               <section className="form-container">

                  <form>
                     <h3>login </h3>
                     <p>Username <span>*</span></p>
                     <input type="text" name="email" onChange={handleSignInChange} placeholder="Enter your Username" required maxLength="50" className="box" />
                     <p>Password <span>*</span></p>
                     <input type="password" name="password" onChange={handleSignInChange} placeholder="Enter your Password" required maxLength="20" className="box" />
                     {/* <input type="submit" value="login" name="submit" className="btn" /> */}
                     <button onClick={handleSignIn} className="btn">Log In</button>
                  </form>

               </section>

            </div>
         }
      </div>
   )
}
export default Login



