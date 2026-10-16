import { Link } from "react-router/internal/react-server-client"
import { api } from "../api"
import { useNavigate } from "react-router"


function Nav() {
    const navigate = useNavigate();
    const handleLogout =()=>{
        // alert('logout click');
        api.post('logout')
        .then(res=>{
            console.log(res)
            if(res.status ==200){
                localStorage.removeItem('lara_token');
                navigate('/login');
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <>
            <nav className="flex justify-center bg-[#F8F9D7] items-center gap-4 py-4">

                <Link to="/home" className="text-gray-700 hover:text-blue-600 hover:text-width-4 transition duration-200 font-bold p-4">Home</Link>
                <span> | </span>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 hover:underline transition duration-200 font-bold p-4">About</Link>
                <span> | </span>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 hover:underline transition duration-200 font-bold p-4">Contact</Link>
                <span> | </span>
                <Link to="/users" className="text-gray-700 hover:text-blue-600 hover:underline transition duration-200 font-bold p-4">Users</Link>
                <button type="button" onClick={handleLogout} className="bg-[#F15412] border-[#F15412] border-3 hover:bg-[#F8F9D7] hover:text-[#F15412] text-[#F8F9D7] font-bold py-2 px-4 ms-5 rounded 
                    duration-300">
                    Logout
                </button>
            </nav>
        </>
    )
}
export default Nav