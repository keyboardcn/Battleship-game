import React, {useState, useEffect} from "react";
import './input.validate.css';

export default function InputValidate() {
    const [pName, setPName] = useState(null);
    const [pMsg, setPMsg] = useState("");
    const [quantity, setQuantity] = useState(null);
    const [qMsg, setQMsg] = useState("");
    let firstRender = true;
    const handlePNameChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setPMsg("Error: Product name cannot be empty.");
            return;
        }
        setPName(value);
        setPMsg("");
    }
    const handlePQuantityChange = (e) => {
        const value = e.target.value;
        if (isNaN(value) || value === "" || value <= 0) {
            setQMsg("Error: Quantity must be a positive number.");
            return;
        }
        setQuantity(value);
        setQMsg("");
    }
    useEffect(() => {
        firstRender = false;
        console.log("Product Name:", pName);
        console.log("Quantity:", quantity);
        console.log("pMsg.length || qMsg.length", pMsg.length !== 0 || qMsg.length !== 0);
    }, [pMsg, qMsg]);
    return (
        <div className="container-wrapper">
            <div className="validate-wrapper">
                <div className="input-box">
                    <label htmlFor="input-name">Product Name:</label>
                    <input type='text'  
                        data-set-id="input-name"
                        placeholder="Enter product name"
                        onInput={(e) => setPName(e.target.value)}
                        onBlur={(e) => handlePNameChange(e)}
                    />
                </div>
                    {   pMsg.length > 0 &&
                        <p>{pMsg}</p>
                    }
                <div className="input-box">
                    <label htmlFor="input-quantity">Quantity:</label>
                    <input type='number' 
                        data-set-id="input-quantity"
                        placeholder="Enter quantity"
                        onInput={(e) => setQuantity(e.target.value)}
                        onBlur={(e) => handlePQuantityChange(e)} />
                </div>
                    {   qMsg.length > 0 &&
                        <p>{qMsg}</p>
                    }
                <button
                disabled={pMsg.length || qMsg.length || (quantity == null && pName == null)}>Submit</button>
            </div>
        </div>
    );
}