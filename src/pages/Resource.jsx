import React from 'react'
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config';

function Resource(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [link, setLink] = React.useState("")

    React.useEffect(() => {
        async function getLink() {
            try {
                const res = await axios.get(`${BASE_URL}/getClassLink`, {
                    params: {
                        studentId: data.studentId,
                        courseId: data.id,
                    }
                });
                console.log(res.data)
                setLink(res.data.classLink)
            }
            catch (error) {
                console.error('An error occurred:', error);
            }
        }
        getLink();
    }, [data.id, props]);

    const handleSubmit = async () => {
        const pageNumber = document.getElementById("page").value;
        try {
            let res = await axios.get(`${BASE_URL}/getTemplateType`, {
                params: {
                    courseId: data.id,
                    pageNumber: pageNumber,
                    level: data.level
                }
            })
            if(res.data === "resource not found"){
                alert("Resource not found")
            }
            else{
                console.log(res.data.templateType)
                navigate(`/SPage${res.data.templateType}?data=${encodeURIComponent(JSON.stringify({ "courseId": data.id , "studentId" : data.studentId , "level" : data.level , pageNumber : pageNumber}))}`)
                // if(res.data.templateType === 1){
                //     navigate(`/SPage1?data=${encodeURIComponent(JSON.stringify({ "courseId": data.id , "studentId" : data.studentId , "level" : data.level , pageNumber : pageNumber}))}`)
                // }
                // else if(res.data.templateType === 2){
                //     navigate("/SPage2")
                // }
            }
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const openLink = () => {
        window.open(link, '_blank');
    };


    console.log("props ", props)
    console.log("data ", data)
    // console.log(resources)

    return (

        <div>
            <Header />

            <section className="playlist-details">

                <div className="meetclass">
                    <p className="tutor">Attend Your Classes here</p> <br></br>
                    <button onClick={openLink} id="startClassBtn">Join Class</button>
                </div>

                <br></br>

                <h1 className="heading">Resources</h1>
                <div >
                    <div className="form-group">
                        <h2 style={{color : "black" , marginBottom : "2rem"}}>Enter Page Number</h2>
                        <input autoComplete='off' style={{border : "solid black" , borderWidth:"1px" , borderRadius : "5px" , padding : "3px" , marginBottom : "2rem"}} type="number" id="page" name="page" required /> <br/>
                        <i style={{fontSize : "2.7rem" , color : "#8a2be2" , cursor : "pointer"}} className="fas fa-right-from-bracket" onClick={handleSubmit}></i>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Resource