import { useState } from "react"
import React from 'react';

const Counter: React.FC = () :  React.ReactElement => {
    const [counter, setCounter] = useState(0);

    return <div style={style}>
        <button onClick={() => setCounter(counter +1)}  children={`valuer compteur : ${counter}`} />
    </div>
}

const style = {
    padding: '5px',
};
export default Counter;