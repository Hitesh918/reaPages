import React from 'react'
import Header from '../components/Header';
import TeacherSideBar from '../components/TeacherSideBar';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageCourse(props) {
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    console.log(data)
    return (
        <div>
            <Header />
            {/* <TeacherSideBar name={props && props.name} /> */}

            <section className="playlist-videos">

                <h1 className="heading">Batches</h1>

                <div className="box-container">

                    {Array.from({ length: data && data.numberOfBatches }, (_, i) => (
                        <Link
                            key={i + 1}
                            className={`box`}
                            to={`/ManageLevel?data=${encodeURIComponent(JSON.stringify({ "id": data.id, "batch": i + 1 , "adminId" :  data.adminId , "numberOfBatches" : data.numberOfBatches}))}`}
                            disabled={i + 1 > data.level}
                        >
                            <i className="fas fa-play"></i>
                            <img src="images/1.jpg" alt="" />
                            <h3>Batch {i + 1}</h3>
                        </Link>
                    ))}

                    {data.numberOfBatches === 0 && <h1>No Batches</h1>}
                    {data.numberOfBatches <2 && <div></div>}


                </div>

            </section>

        </div>
    )
}

export default ManageCourse;