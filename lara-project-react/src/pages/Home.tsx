import { useState } from "react";

function Home() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('Mina')
    return (
        <>
            <h1>Home page</h1>
            <p>Hello, {name}!</p>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount(count + 1)}> Increment </button>
            <button onClick={() => setCount(count - 1)}>Decrement </button>
        </>
    );
}

export default Home;