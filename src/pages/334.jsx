import React, { useState } from 'react';
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Page2 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(3).fill(Array(10).fill("")),
        table2: Array(3).fill(Array(10).fill("")),
        table3: Array(4).fill(Array(10).fill("")),
    });
    const [searchParams] = useSearchParams();
    const dataString = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataString));

    console.log(data)

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

        return cellValues[tableIndex].map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td style={{ color: rowIndex === 0 ? 'black' : 'inherit' }}>{<span style={{ color: 'black' }}>#</span>}</td>
                {row.map((cell, colIndex) => (
                    // Exclude the last column
                    colIndex !== 10 &&
                    <td key={colIndex} style={{ backgroundColor: "white" }}>
                        <input
                            required
                            onKeyDown={(evt) => ["e", "E"].includes(evt.key) && evt.preventDefault()}
                            type="number"
                            value={cell}
                            onChange={(e) => handleCellValueChange(tableIndex, rowIndex, colIndex, e.target.value)}
                            style={{ width: '100%', boxSizing: 'border-box', margin: "0px", textAlign: "center" }}
                        />
                    </td>
                ))}
            </tr>
        ));
    };


    const handleSubmit = async () => {
        const isEmptyCell = Object.values(cellValues).some(table =>
            table.some(row => row.some(cell => cell === ""))
        );

        if (isEmptyCell) {
            alert("Please fill in all the cells before submitting.");
            return; // Exit early if any cell is empty
        }
        // console.log(cellValues);

        if(document.getElementById("page").value === ""){
            alert("Please enter page number")
            return
        }
        let res = await axios.post("https://reaserver.onrender.com/newQuestion", {}, {
            params: {
                courseId: data.courseId,
                level: data.level,
                templateType: 2,
                pageNumber: parseInt(document.getElementById("page").value),
                content: {
                    table1: cellValues.table1,
                    table2: cellValues.table2,
                    table3: cellValues.table3,
                }
            }
        })
        alert(res.data)
        if (res.data === "Question added") {
            window.location.reload();
        }
    }

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
                            margin-bottom:"10px";
                        }
                    }
                `}
            </style>
            {Object.keys(cellValues).map((tableKey, index) => (
                <table key={index} style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}> {/* Adjusted margin here */}
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

            <div >
                <div className="form-group">
                    <h2 style={{ color: "black", margin: "1.5rem" }}>Enter Page Number</h2>
                    <input autoComplete='off' style={{ border: "solid black", borderWidth: "1px", borderRadius: "5px", padding: "3px", margin: "1.5rem" , marginTop:"0.2rem"}} type="number" id="page" name="page" required /> <br />
                </div>
            </div>

            <div className="submit-container" style={{marginTop:"-2rem" , marginBottom:"2rem"}}>
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>
        </div>
    );
};

export default Page2;
