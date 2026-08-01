import { useState, useEffect } from 'react';

function Effect(){
    const [name,setName] =useState<string>("");
    const [age,setAge] =useState<number>();
    useEffect(()=>{
        console.log("useEffect Called");
    },[age]);
    // const handleChange=(e: any)=>{
    //         setName(e.target.value)
    //         console.log(name)
    // }
    return(
        <div>
            <h1>
                Effect
            </h1>
            {/* <input type="text" placeholder="Enter your name" onChange={handleChange} value={name} /> */}
            <input type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} value={name} />
            <input type="number" placeholder="Enter your age" onChange={(e)=>setAge(Number(e.target.value))} value={age} />

        </div>
    );
}
function NewEffect(){
    return(
        <div>
            <h1>
                Effect
            </h1>
            <input type="text" placeholder="Enter your name" />

        </div>
    );
}

export default Effect;
export {NewEffect};