import React, {useState, useMemo, useCallback, FC} from "react";
import { ShowDataComponent, MemoizedValueType } from "./components/show.data";
import './render.text.css';



function RenderTextComponent() {
    const [text, setText] = useState<string>("");
    const [count, setCount] = useState<number>(0);
    const onClick = useCallback(() => {
        console.log("Counting length for text:", text);
        setCount(text.length);
    }, [text]);
    
    const memoizedValue = useMemo<MemoizedValueType>(() => {
        console.log("Calculating length for text:", text);
        return {length: count, content: text};
    }, [text, count]);

    return (
        <div className="container-wrapper">
            <h2>Render Text Component</h2>
            <div className="render-wrapper">
                <input type="text" value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setText(e.target.value)}></input>
                <ShowDataComponent {...memoizedValue} />
                <button onClick={onClick}>Count Length</button>
                <p>Length of text: {count}</p>
            </div>
        </div>
    )

}

export default RenderTextComponent;