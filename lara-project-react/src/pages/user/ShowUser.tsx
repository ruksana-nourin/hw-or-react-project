import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../api";
import { defaultUser, type User } from "../../interfaces/user";

function ShowUser() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User>(defaultUser);
    const getItem = () => {
        api.get(`users/${id}`)
            .then((res) => {
                console.log(res.data.user);
                setUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getItem();
    }, []);


    return (
        <>
            <div className="w-1/2 mx-auto p-4 mt-4 ">
                <h1 className="text-2xl font-bold mb-4 text-center">User Details</h1>
                <div>
                    <div className="mb-3 pb-3 border-b border-b-blue-200"><strong>ID:</strong> {id}</div>
                    <div className="mb-3 pb-3 border-b border-b-blue-200"><strong>Name:</strong> {user.name}</div>
                    <div className="mb-3 pb-3 border-b border-b-blue-200"><strong>Email:</strong> {user.email}</div>
                    <div className="mb-3 pb-3 border-b border-b-blue-200"><strong>Role:</strong> {user.role}</div>
                </div>

                <div>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-[#F15412] border-[#F15412] border-3 hover:bg-[#F8F9D7] hover:text-[#F15412] text-[#F8F9D7] font-bold py-2 px-4 rounded 
                duration-300"
                    >
                        Back
                    </button>
                </div>
            </div>
        </>
    );
}

export default ShowUser;