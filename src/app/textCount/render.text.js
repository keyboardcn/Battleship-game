import React, {useState, useMemo, useCallback} from "react";
import { ShowDataComponent } from "./components/show.data";
import './render.text.css';

export default function RenderTextComponent() {
    const [text, setText] = useState("");
    const [count, setCount] = useState(0);
    const onClick = useCallback(() => {
        console.log("Counting length for text:", text);
        setCount(text.length);
    }, [text]);
    
    const memoizedValue = useMemo(() => {
        console.log("Calculating length for text:", text);
        return {length: count, content: text};
    }, [text, count]);

    return (
        <div className="container-wrapper">
            <h2>Render Text Component</h2>
            <div className="render-wrapper">
                <input type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
                <ShowDataComponent data= {memoizedValue} />
                <button onClick={onClick}>Count Length</button>
                <p>Length of text: {count}</p>
            </div>
        </div>
    )

}