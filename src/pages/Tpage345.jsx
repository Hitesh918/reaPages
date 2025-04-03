import React, { useState } from 'react';
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config';

const Page1 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(4).fill(Array(10).fill("")),
        table2: Array(5).fill(Array(10).fill("")),
        table3: Array(6).fill(Array(10).fill("")),
    });
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [wrongs, setWrongs] = useState([]);


    React.useEffect(() => {
        console.log("data in teacher is  ", data)
        const fetchData = async () => {
            try {
                const firstApiResponse = await axios.get("${BASE_URL}/getQuestion", {
                    params: {
                        courseId: data.courseId,
                        level: data.level,
                        pageNumber: data.pageNumber
                    }
                });

                const secondApiResponse = await axios.get("${BASE_URL}/getProgressStudent", {
                    params: {
                        courseId: data.courseId,
                        level: data.level,
                        pageNumber: data.pageNumber,
                        studentId: data.studentId
                    }
                });

                console.log(firstApiResponse.data);
                console.log(secondApiResponse.data);

                let updatedCellValues = {
                    ...cellValues,
                    table1: firstApiResponse.data.table1 ? firstApiResponse.data.table1.concat(cellValues.table1.slice(firstApiResponse.data.table1.length)) : cellValues.table1,
                    table2: firstApiResponse.data.table2 ? firstApiResponse.data.table2.concat(cellValues.table2.slice(firstApiResponse.data.table2.length)) : cellValues.table2,
                    table3: firstApiResponse.data.table3 ? firstApiResponse.data.table3.concat(cellValues.table3.slice(firstApiResponse.data.table3.length)) : cellValues.table3,
                };

                if (secondApiResponse.data !== "not found") {
                    updatedCellValues = {
                        ...updatedCellValues,
                        table1: updatedCellValues.table1.map((row, index) => index === updatedCellValues.table1.length - 1 ? secondApiResponse.data.submission.table1 : row),
                        table2: updatedCellValues.table2.map((row, index) => index === updatedCellValues.table2.length - 1 ? secondApiResponse.data.submission.table2 : row),
                        table3: updatedCellValues.table3.map((row, index) => index === updatedCellValues.table3.length - 1 ? secondApiResponse.data.submission.table3 : row),
                    };
                }

                // Ensure each row has exactly 10 elements
                updatedCellValues.table1 = updatedCellValues.table1.map(row => row.concat(Array(10 - row.length).fill("")));
                updatedCellValues.table2 = updatedCellValues.table2.map(row => row.concat(Array(10 - row.length).fill("")));
                updatedCellValues.table3 = updatedCellValues.table3.map(row => row.concat(Array(10 - row.length).fill("")));

                // Update the state
                setCellValues(updatedCellValues);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCellValueChange = (tableIndex, rowIndex, colIndex, value) => {
        const updatedCellValues = {
            ...cellValues,
            [tableIndex]: cellValues[tableIndex].map((row, rIndex) => {
                if (rIndex === rowIndex) {
                    return row.map((cell, cIndex) => (cIndex === colIndex ? value : cell));
                }
                return row;
            })
        };
        setCellValues(updatedCellValues);
    };

    const renderTableRows = (tableIndex) => {
        return cellValues[tableIndex].map((row, rowIndex) => {
            const isLastRow = rowIndex === cellValues[tableIndex].length - 1;

            return (
                <tr key={rowIndex}>
                    <td style={{ backgroundColor: "white", color: "black" }}>
                        {isLastRow ? 'ANS' : '#'}
                    </td>
                    {row.map((cell, colIndex) => (
                        colIndex !== 10 &&
                        <td key={colIndex} style={{ backgroundColor: "white" }}>
                            <input
                                readOnly={true}
                                onClick={(e) => {
                                    if (isLastRow) {
                                        let obj = {
                                            table: tableIndex,
                                            qn: colIndex
                                        };
                                        const target = e.target;
                                        const currentColor = target.style.backgroundColor;
                                        const isWhite = currentColor === "white" || currentColor === "";

                                        // Check if the object exists in the wrongs array
                                        const objIndex = wrongs.findIndex(wrong => wrong.table === obj.table && wrong.qn === obj.qn);

                                        if (objIndex !== -1) {
                                            // If the object exists, remove it from the wrongs array
                                            const newWrongs = [...wrongs];
                                            newWrongs.splice(objIndex, 1);
                                            setWrongs(newWrongs);
                                        } else {
                                            // If the object doesn't exist, add it to the wrongs array
                                            setWrongs([...wrongs, obj]);
                                        }

                                        // Toggle background color
                                        target.style.backgroundColor = isWhite ? "#FFB1B1" : "white";
                                        target.parentElement.style.backgroundColor = isWhite ? "#FFB1B1" : "white";
                                    }


                                }}
                                
                                
                                onKeyDown={(evt) => ["e", "E"].includes(evt.key) && evt.preventDefault()}
                                type="number"
                                value={cell}
                                onChange={(e) => handleCellValueChange(tableIndex, rowIndex, colIndex, e.target.value)}
                                style={{ width: '100%', boxSizing: 'border-box', margin: "0px", textAlign: "center" }}
                            />
                        </td>
                    ))}
                </tr>
            );
        });
    };


    const handleSubmit = async () => {
        console.log(wrongs)
        let res = await axios.post("${BASE_URL}/teacherSubmit", {}, {
            params: {
                studentId: data.studentId,
                courseId: data.courseId,
                level: data.level,
                pageNumber: data.pageNumber,
                "wrongs":wrongs
            }
        })

        if (res.data === "done") {
            alert("Corrected successfully");
            navigate(-1)
            // window.location.reload();
        }
        else{
            alert("Error in correcting the submission. Please try again later.");
        }
    };

    console.log("data", data)

    return (
        <div style={{ marginLeft: '300px', marginRight: '0px' }}>
            <Header />
            <style>
                {`
                    body {
                        font-family: Arial, sans-serif;
                        padding: 0;
                    }

                    .academy-name {
                        font-size: 24px;
                        font-weight: bold;
                    }

                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin-bottom: 20px;
                    }

                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: center;
                    }

                    th {
                        background-color: #8e44ad;
                        color: white;
                    }

                    .submit-container {
                        text-align: center;
                        margin-top: 20px;
                    }

                    .submit-button {
                        padding: 10px 20px;
                        font-size: 16px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        cursor: pointer;
                        border-radius: 5px;
                    }

                    .submit-button:hover {
                        background-color: #45a049;
                    }

                    @media (max-width: 768px) {
                        .header, .submit-container, table {
                            margin: 10px;
                        }

                        th, td {
                            padding: 4px;
                        }

                        .submit-button {
                            padding: 8px 16px;
                            font-size: 14px;
                        }
                    }


                `}
            </style>
            {Object.keys(cellValues).map((tableKey, index) => (
                <table id={tableKey} key={index} style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
                    <thead>
                        <tr>
                            <th>{String.fromCharCode(65 + index)}</th>
                            {[...Array(10)].map((_, i) => <th key={i}>{i + 1}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows(tableKey)}
                    </tbody>
                </table>
            ))}

            <div>
                <div style={{ display: "inline-block", margin: "10px", marginLeft: "52rem" }} className="submit-container">
                    <button onClick={handleSubmit} className="submit-button">Return</button>
                </div>
            </div>

        </div>

    );
};

export default Page1;
