import { useState } from "react"
import type { User } from "./User.types.tsx"
import defaultUser from "./User.types.tsx";

function User(){
    // const[id,setId] = useState(10);
    // const[name,setName] = useState("Roxy");
    // const[email,setEmail] = useState("roxy@example.com");
    // const[phone,setPhone] = useState("+0123456987");
    // const[roleId,setRoleId] = useState(3);
    // const[isActive,setIsActive] = useState(false);
    const[user, setUser] = useState<User>(defaultUser);

    return(
        <>
            <h1>User</h1>
            <p><b>Id: </b>{user.id}</p>
            <p><b>Name: </b>{user.name}</p>
            <p><b>Email: </b>{user.email}</p>
            <p><b>Phone: </b>{user.phone}</p>
            <p><b>roleId: </b>{user.roleId}</p>
            <p><b>Status: </b>{user.isActive ? "Active" : "Inactive"}</p>
        </>
    )
}

export default User