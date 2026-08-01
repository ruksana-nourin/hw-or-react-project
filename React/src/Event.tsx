function Event(){
    // function handleClick(){
    //     console.log("Button Clicked")
    // }
    const handleClick= ()=>{
        console.log("Button Clicked")
    }
    return(
        <>
            <button onClick={handleClick}>Click Event</button>
        </>
    )
}
export default Event
