import React,  {useState} from "react";
import './MatrixComponent.css';
export default function SetupComponent({matrix, attack}) {
    const size = matrix.length;
    return (
        <div className="matrix-wrapper">
            <h2>Game Board</h2>
            <table>
                <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex)=>(
                                <td key={colIndex}
                                    onClick={() => attack(rowIndex, colIndex)}>
                                        <div className="content"                                        
                                            style={{
                                                backgroundColor: cell === '-' ? 'lightblue' : cell === 'O' ? 'lightgray' : cell === 'X' ? 'red' : cell === '$' ? 'green' : 'white'
                                            }}
                                        >
                                            {cell}
                                        </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>   
    )
}