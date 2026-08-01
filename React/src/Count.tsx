import { useState } from 'react';
import './Button.css'
function Count() {
    const [num, setNum] = useState(0);
    // let num= 0;
    // const handleIncrement = () => {
    //     // console.log("Button Clicked")
    //     // num++;
    //     setNum(num + 1);
    //     // console.log(num);

    // }
    return (
        <div style={{ textAlign: "center" }}>
            <h1 >Count: {num}</h1>
            {/* <button onClick={handleIncrement}>+</button> */}
            <button className='button' onClick={() => setNum(num - 1)}>-</button>
            <button className='button' onClick={() => setNum(num + 1)}>+</button>
        </div>

    )
}
export { Count }