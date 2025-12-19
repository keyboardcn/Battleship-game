import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import './SetupComponent.css';
export default function SetupComponent({ action, resetBMatrix }) {
    const [input, setInput] = useState(0);
    const [massage, setMassage] = useState(`Info: Click to ${action} the board with size ${input}`);

    const onChangeInput=(e) => {
        if (isNaN(e.target.value) || e.target.value === "" || e.target.value <= 0) {
            e.target.value = 1;
            setMassage("Info: Cannot less than 1.")
        }
        setInput(e.target.value);
        setMassage(`Info: Click to ${action} the board with size ${e.target.value}`);
    }

    const handleClick = () => {
        if (isNaN(input) || input <= 0) {
            setMassage("Error: Please enter a valid positive integer.")
            return;
        }
        resetBMatrix(parseInt(input.toString(), 10));
        setTimeout(() => {
            setMassage(`Success: The board has been ${action}ed with size ${input}`);
        }, 1500); 
        setMassage(`Info: Click to ${action} the board with size ${input}`);
    }
    return (
        <div className='setup-wrapper'>
            <div>
                <div className='input-row'>
                    <TextField type="number" data-set-id="matrix-size" label="Matrix Size" onChange={(e) => onChangeInput(e)} />
                    <Button variant="contained" onClick={(e) => handleClick()} >{action}</Button>
                </div>
                <p><b>{massage}</b></p>
            </div>
        </div>
    )

}