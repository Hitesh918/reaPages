import React from 'react'
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import BASE_URL from '../config';

function StudentProfile(props) {

   const [details, setDetails] = React.useState({})

   React.useEffect(() => {
      setDetails(props.details)
   }, [props])
   console.log(props)
   return (
      <div>
         <Header />
         <section className="admin-profile" style={{
            marginTop: "3rem",
            color: 'black',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '5px 5px 10px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
         }}>
            <h1 className="heading" style={{ marginBottom: '20px' }}>Profile Details</h1>
            <div className="details" style={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'space-between',
               gap: '20px'
            }}>
               <div className="admin" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '10px'
               }}>
                  <img src={details && details.dp} className="image" alt="" style={{
                     border: '2px solid black',
                     width: '100px',
                     height: '100px',
                     borderRadius: '50%',
                  }} />
                  <h1>{details && details.name}</h1>
                  <span className="adminId1" style={{ fontSize: '20px' }}>Student ID: {details && details.studentId}</span>
                  <p className="mobile1" style={{ fontSize: '20px' }}>Mobile: {details && details.mobile}</p>
                  <p className="email1" style={{ fontSize: '20px' }}>Email: {details && details.email}</p>
                  <Link to="/changePassword" className="profile-btn">Change password</Link>
                  {/* <button className="profile-btn" >Change password</button> */}
               </div>
            </div>
         </section>

      </div>
   )
}

export default StudentProfile