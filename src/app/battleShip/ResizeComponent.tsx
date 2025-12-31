// purpose: 
// two inputs: number for size row * column, ships < size
// button start/reset
import './ResizeComponent.css';
import React, {useCallback, useEffect, useState} from "react";

type StatusType = "Start" | "Reset" ;

const ResizeComponent = ({ resize }) => {
    const [size, setSize] = useState<number>(5);
    const [ships, setShips] = useState<number>(5);
    const [status, setStatus] = useState<StatusType>("Start");
    
    const handleClick = useCallback(() => {
        resize(size, ships);
        setStatus("Reset");
    }, [size, ships]);

    return (
        <div className="container">
            <div className="input-row">
                <label htmlFor="size-input"> Size (rows = columns):</label>
                <input 
                    id="size-input"
                    type="number"
                    placeholder="Size(rows=columns)"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    />
            </div>
            <div className="input-row">

                <label htmlFor="ships-input"> Ships:</label>
                <input
                    id="ships-input"
                    type="number"
                    placeholder="Number of ships"
                    value={ships}
                    onChange={(e) => setShips(Number(e.target.value))}
                    />
            </div>
            <div className='input-row-button'>
                <button id="start-reset-button" onClick={handleClick}>{status}</button>
            </div>
        </div>
    )
}

export default ResizeComponent;