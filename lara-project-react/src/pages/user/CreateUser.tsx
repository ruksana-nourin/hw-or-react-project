import { useEffect, useState } from "react";
import type { Role } from "../../interfaces/Role";
import { api } from "../../api";
import { defaultUser, errorUser, type User } from "../../interfaces/user";
import { useNavigate } from "react-router";

function CreateUser() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [user, setUser] = useState<User>(defaultUser);
    const [errUser, setErrUser] = useState(errorUser);
    const Navigate = useNavigate();
    const getRole = () => {
        api.get("roles")

            .then((res) => {
                // console.log(res.data.roles.data);
                setRoles(res.data.roles.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getRole();
    }, []);
    const handleSubmit = () =>{
        console.log(user);
        api.post('users', user)
        .then((res) => {
            console.log(res.data);
            if(res.data.success){
                alert(res.data.success);
                setUser(defaultUser);
                setErrUser(errorUser);
                Navigate('/users');
            }
        })
        .catch((err) => {
            // console.log(err.response);
            if (err.response.status === 422) {
                // console.log(err.response.data.errors.email);
                // console.log(err.response.data.errors.password_confirmation);
                setErrUser(err.response.data.errors);
            }
        })
    }

    return (
        <>
            <div className="w-1/2 mx-auto p-4 mt-4 ">
                <h1 className="text-2xl font-bold mb-4 text-center">Add User</h1>
                <form action="">

                    <label htmlFor="name">Name</label><br />
                    <input type="text" className="w-full p-1 border border-1 border-gray-300 focus:border-2 focus:border-[#F15412] focus:outline-none rounded" placeholder="Name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} />
                    <small className="text-red-500">
                        {errUser.name && <span>{errUser.name[0]}</span>}
                    </small>
                    <br /><br />


                    <label htmlFor="email">Email</label><br />
                    <input type="email" className="w-full p-1 border border-1 border-gray-300 focus:border-2 focus:border-[#F15412] focus:outline-none rounded" placeholder="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                    <small className="text-red-500">
                        {errUser.email && <span>{errUser.email[0]}</span>}
                    </small>
                    <br /><br />

                    <label htmlFor="role">Role</label><br />
                    <select name="role" id="role"
                    value={user.role_id}
                    onChange={(e) => setUser({...user, role_id: parseInt(e.target.value)})}
                    className="w-full p-1 border border-1 border-gray-300 focus:border-2 focus:border-[#F15412] focus:outline-none rounded" >
                        <option value={0}>Select a role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>

                    <small className="text-red-500">
                        {errUser.role_id && <span>{errUser.role_id[0]}</span>}
                    </small>
                    <br /><br />

                    <label htmlFor="password">Password</label><br />
                    <input type="password" className="w-full p-1 border border-1 border-gray-300 focus:border-2 focus:border-[#F15412] focus:outline-none rounded" placeholder="*****" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
                    <small className="text-red-500">
                        {errUser.password && <span>{errUser.password[0]}</span>}
                    </small>
                    <br /><br />

                    <label htmlFor="confirmPassword">Confirm Password</label><br />
                    <input type="password" className="w-full p-1 border border-1 border-gray-300 focus:border-2 focus:border-[#F15412] focus:outline-none rounded" placeholder="*****" value={user.password_confirmation} onChange={(e) => setUser({...user, password_confirmation: e.target.value})} />
                    <small className="text-red-500">
                        {errUser.password_confirmation && <span>{errUser.password_confirmation[0]}</span>}
                    </small>
                    <br /><br />

                    <div className="flex justify-center">
                        <button
                            className="bg-[#F15412] border-[#F15412] border-3 hover:bg-[#F8F9D7] hover:text-[#F15412] text-[#F8F9D7] font-bold py-2 px-4 rounded duration-300"
                             type="button"
                             onClick={() => {
                                 handleSubmit();
                             }}
                            >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateUser;