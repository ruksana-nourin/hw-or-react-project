
// function Card(props:any) {
function Card({text, btnColor="primary",children}:any) {
    return (
        <>

            <div className="card">
                <img src="https://placehold.co/600x400" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{text}</h5>
                        {children}
                        <a href="#" className={`btn btn-${btnColor}`}>Add to Cart</a>
                    </div>
            </div>
        </>
    )

}

export {Card}