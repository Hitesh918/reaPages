import React, { useState } from 'react';
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config';

const Page3 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(5).fill(Array(10).fill("")),
        table2: Array(6).fill(Array(10).fill("")),
        table3: Array(6).fill(Array(10).fill("")),
    });

    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));
    const [submissionState, setSubmissionState] = useState(0);
    const [wrongs, setWrongs] = useState([]);
    const [isFirst , setIsFirst] = useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const firstApiResponse = await axios.get(`${BASE_URL}/getQuestion`, {
                    params: {
                        courseId: data.courseId,
                        level: data.level,
                        pageNumber: data.pageNumber
                    }
                });
    
                const secondApiResponse = await axios.get("http://localhost:5000/getProgressStudent", {
                    params: {
                        courseId: data.courseId,
                        level: data.level,
                        pageNumber: data.pageNumber,
                        studentId: data.studentId
                    }
                });
    
                console.log(firstApiResponse.data);
                console.log("secondApiResponse.data ", secondApiResponse.data);
    
                let updatedCellValues = {
                    ...cellValues,
                    table1: firstApiResponse.data.table1 ? firstApiResponse.data.table1.concat(cellValues.table1.slice(firstApiResponse.data.table1.length)) : cellValues.table1,
                    table2: firstApiResponse.data.table2 ? firstApiResponse.data.table2.concat(cellValues.table2.slice(firstApiResponse.data.table2.length)) : cellValues.table2,
                    table3: firstApiResponse.data.table3 ? firstApiResponse.data.table3.concat(cellValues.table3.slice(firstApiResponse.data.table3.length)) : cellValues.table3,
                };
    
                if (secondApiResponse.data !== "not found") {
                    setWrongs(secondApiResponse.data.submission.wrong);
                    if(secondApiResponse.data.submission.wrong.length !== 0){
                        setIsFirst(false);
                    }
                    setSubmissionState(secondApiResponse.data.state);
                    updatedCellValues = {
                        ...updatedCellValues,
                        table1: updatedCellValues.table1.map((row, index) => index === updatedCellValues.table1.length - 2 ? secondApiResponse.data.submission.table1 : row),
                        table2: updatedCellValues.table2.map((row, index) => index === updatedCellValues.table2.length - 2 ? secondApiResponse.data.submission.table2 : row),
                        table3: updatedCellValues.table3.map((row, index) => index === updatedCellValues.table3.length - 2 ? secondApiResponse.data.submission.table3 : row),
                    };
    
                    // Incorporating buffer arrays into the last rows of each table
                    updatedCellValues.table1[updatedCellValues.table1.length - 1] = secondApiResponse.data.submission.buffer.Btable1;
                    updatedCellValues.table2[updatedCellValues.table2.length - 1] = secondApiResponse.data.submission.buffer.Btable2;
                    updatedCellValues.table3[updatedCellValues.table3.length - 1] = secondApiResponse.data.submission.buffer.Btable3
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
    
        fetchData()
    }, []);
    

    React.useEffect(() => {
        if (wrongs.length !== 0) {
            wrongs.forEach(obj => {
                let elem = document.getElementById(obj.table);
                let arr = Array.from(elem.rows)
                let arrr = Array.from(arr[arr.length - 2].cells)
                // console.log("heuyyry", arrr[obj.qn + 1])
                arrr[obj.qn + 1].style.backgroundColor = "#FFB1B1"
                let ar = Array.from(arrr[obj.qn + 1].children)
                ar[0].style.backgroundColor = "#FFB1B1"
                // arrr[obj.qn + 1].childElement.backgroundColor = "#FFB1B1"

                let lr=Array.from(arr[arr.length - 1].cells)
                lr[obj.qn + 1].children[0].readOnly = false;
                lr[obj.qn + 1].children[0].style.backgroundColor = "white"
                lr[obj.qn + 1].style.backgroundColor = "white"
                // console.log("inp is " , lr[obj.qn + 1].children[0])
            });
        }
    }, [wrongs]);
    

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
            // Check if submissionState is 2 and it's the last row
            const shouldRender = submissionState !== 2 || rowIndex < cellValues[tableIndex].length - 1;
            if (!shouldRender) return null; // Don't render the last row if submissionState is 2
            return (
                <tr key={rowIndex}>
                    <td style={{ backgroundColor: "white", color: "black" }}>
                        {rowIndex === cellValues[tableIndex].length - 1 || rowIndex === cellValues[tableIndex].length - 2 ? 'ANS' : '#'}
                    </td>
                    {row.map((cell, colIndex) => (
                        // Exclude the last column
                        colIndex !== 10 &&
                        <td key={colIndex} style={{ backgroundColor: rowIndex === cellValues[tableIndex].length - 1 ? "#eee" : "white" }}>
                            <input
                                readOnly={isFirst ? rowIndex !== cellValues[tableIndex].length - 2 : true}
                                onKeyDown={(evt) => ["e", "E"].includes(evt.key) && evt.preventDefault()}
                                type="number"
                                value={cell}
                                onChange={(e) => handleCellValueChange(tableIndex, rowIndex, colIndex, e.target.value)}
                                style={{ width: '100%', boxSizing: 'border-box', margin: "0px", textAlign: "center", backgroundColor: rowIndex === cellValues[tableIndex].length - 1 ? "#eee" : "white"}}
                            />
                        </td>
                    ))}
                </tr>
            );
        });
    };

    const handleSubmit = async () => {
        // console.log(cellValues);
        let res = await axios.post("http://localhost:5000/studentSubmit", {}, {
            params: {
                studentId: data.studentId,
                courseId: data.courseId,
                level: data.level,
                pageNumber: data.pageNumber,
            }
        })

        if (res.data === "done") {
            alert("Progress submitted successfully");
            window.location.reload();
        }
        else{
            alert("Save progress before submitting");
        }
    };

    const replaceNullsWithEmptyStrings = (array) => {
        return array.map(row => row.map(cell => cell === null ? "" : cell));
    };

    const handleSave = async () => {
        console.log(cellValues.table1[3]);

        let rowNum=wrongs.length === 0 ? 2 : 1

        let res = await axios.post("http://localhost:5000/updateProgress", {}, {
            params: {
                studentId: data.studentId,
                courseId: data.courseId,
                level: data.level,
                pageNumber: data.pageNumber,
                submission: {
                    table1: replaceNullsWithEmptyStrings(cellValues.table1)[cellValues.table1.length - rowNum],
                    table2: replaceNullsWithEmptyStrings(cellValues.table2)[cellValues.table2.length - rowNum],
                    table3: replaceNullsWithEmptyStrings(cellValues.table3)[cellValues.table3.length - rowNum],
                    wrong : wrongs
                }
            }
        })

        if (res.data === "done") {
            alert("Progress saved successfully");
            window.location.reload();
        }
        else {
            alert("Error saving progress . Please try again later");
        }
    }
    // console.log("data", data)

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

            {submissionState === 0 && <div>
                <div style={{ display: "inline-block", margin: "10px", marginLeft: "47rem" }} className="submit-container">
                    <button style={{ backgroundColor: "#03AED2" }} onClick={handleSave} className="submit-button">Save Progress</button>
                </div>
                <div style={{ display: "inline-block", margin: "10px" }} className="submit-container">
                    <button onClick={handleSubmit} className="submit-button">Submit</button>
                </div>
            </div>}
            {submissionState === 1 &&
                <h1 style={{ color: "black", marginLeft: "47rem", marginBottom: "3rem" }}>Your submission is being evaluated</h1>
            }

        </div>

    );
};

export default Page3;
