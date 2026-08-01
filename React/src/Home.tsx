import { Button } from "./Button"
import { Card } from "./Card"
import Img1 from './assets/img/th.jpg'

function Home() {
    const name = 'Mina'
    const color = {
        color: 'green',
        fontSize: '50px'
    }
    return (
        <>
            <div className="container mb-4">
                <h1>App</h1>
                <div className="row g-3">
                    <div className="col-lg-4 col-sm-3">
                        <Card text="iPhone 17 Pro Max" btnColor="danger">
                            <p>
                                One of the latest model of apple moblile phone
                            </p>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-sm-3">
                        <Card text="Mac Book Pro" btnColor="success">
                            <p>
                                One of the latest model of apple macbook
                            </p>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-sm-3">
                        <Card text="AirBuds">
                            <p>One of the latest apple model of Ear Phone.</p>
                        </Card>
                    </div>
                </div>
            </div>

            <img src={Img1} alt="Image" style={{ borderRadius: "20px", width: "200px" }} />
            <h1>Hello <span style={color}>{name}</span>  from React!</h1>
            <p>Para 1</p>
            <Button text="Login" type="button" />
            <Button text="Register" type="submit" />
            <button className='btn btn-success'>Bootstrap Button</button>
        </>
    )
}
export { Home }