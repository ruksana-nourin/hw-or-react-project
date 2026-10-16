import { useEffect, useState } from "react";
import { api } from "../../api";
import type { User } from "../../interfaces/user";
import { Link } from "react-router";

function ManageUser() {
    const [users, setUsers] = useState<User[]>([]);

    function getAll() {
        api.get("users")
            .then(function (res) {
                // console.log(res.data.users);
                setUsers(res.data.users.data);
            })
            .catch(function (err) {
                console.log(err);
            });

    }
    useEffect(() => {
        getAll();
    }, []);

    const handleDelete = (id: number, name: string) => {
        let result = confirm(`Are you sure you want to delete ${name}?`);
        if (result) {
            // alert(`User ${name} deleted successfully!`);
            api.delete(`users/${id}`)
                .then((res) => {
                    console.log(res.data);
                    getAll();
                    if (res.data.success) {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    return (
        <>
            <div className="w-2/3 mx-auto p-4 mt-4 ">

                <div className="flex justify-between items-center mb-4">

                    <h1 className="text-2xl font-bold mb-4">Manage User</h1>
                    <Link to="/users/create" className="bg-[#F15412] border-[#F15412] border-3 hover:bg-[#F8F9D7] hover:text-[#F15412] text-[#F8F9D7] font-bold py-2 px-4 rounded 
                duration-300">
                        Add User
                    </Link>
                </div>


                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body  bg-[#F8F9D7] border-b rounded-base border-default">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    ID.
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Actions
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item) => (

                                <tr key={item.id} className="bg-neutral-primary border-b border-default">
                                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                        {item.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex rounded-md shadow-sm" role="group">
                                            <Link
                                                to={`/users/${item.id}`}
                                                type="button"
                                                className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-300 rounded-l-lg hover:bg-blue-50"
                                            >
                                                View
                                            </Link>

                                            <Link
                                                to={`/users/${item.id}/edit`}
                                                type="button"
                                                className="px-4 py-2 text-sm font-medium text-yellow-700 bg-white border-t border-b border-gray-300 hover:bg-yellow-50"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                type="button" onClick={() => {
                                                    handleDelete(item.id, item.name);
                                                }}
                                                className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-gray-300 rounded-r-lg hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

export default ManageUser;