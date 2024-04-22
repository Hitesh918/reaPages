// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVwFVii_RKer1vSxNUT-_4x5WFYGuWKWw",
  authDomain: "project-rea-1165a.firebaseapp.com",
  projectId: "project-rea-1165a",
  storageBucket: "project-rea-1165a.appspot.com",
  messagingSenderId: "921614290452",
  appId: "1:921614290452:web:d311a0b3a471961e4de101",
  measurementId: "G-4PETG5BTB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const anotherApp = initializeApp(firebaseConfig, "anotherApp");
const anotherAuth = getAuth(anotherApp);
export { auth, anotherAuth };
//export default auth