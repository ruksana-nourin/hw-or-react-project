import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading";
import type { User } from "../../../interfaces/User";
import { useEffect, useState } from "react";
import { api } from "../../../config";
function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    // {
    //         id: 5,
    //         name: "Mim Akter",
    //         email: "mim@gmail.com",
    //         phone: "01512345678",
    //         role: "Librarian",
    //         status: "Suspended",
    //         joinedDate: "28 Jul 2026",
    //     },
    
    //search
    const [searchTerm, setSearchTerm] = useState("");

    //Role Filter
    const [roleFilter, setRoleFilter] = useState("All");

    //Status Filter
    const [statusFilter, setStatusFilter] = useState("All");

    // Selected user for delete
    const [selectedUser, setSelectedUser] =
        useState<User | null>(null);

    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    //api calling
    const getUsers = () => {
        api.get("users")
            .then(res => {
                console.log(res.data);
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getUsers();
    }, []
    );

    // Filter users
    const filteredUsers = users.filter((user) => {

        const matchesSearch =
            user.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            user.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            user.phone
                .includes(searchTerm);

        const matchesRole =
            roleFilter === "All" ||
            user.role === roleFilter;

        const matchesStatus =
            statusFilter === "All" ||
            user.status === statusFilter;

        return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
        );
    });

    // Delete user
    const handleDeleteUser = () => {

        if (!selectedUser) return;

        setUsers((prevUsers) =>
            prevUsers.filter(
                (user) => user.id !== selectedUser.id
            )
        );

        setShowDeleteModal(false);
        setSelectedUser(null);
    };


    // Reset filters
    const handleReset = () => {
        setSearchTerm("");
        setRoleFilter("All");
        setStatusFilter("All");
    };


    // Statistics
    const totalUsers = users.length;

    const activeUsers = users.filter(
        (user) => user.status === "Active"
    ).length;

    const librarians = users.filter(
        (user) => user.role === "Librarian"
    ).length;

    const inactiveUsers = users.filter(
        (user) =>
            user.status === "Inactive"
    ).length;


    return (
        <>
        <main className="dashboard-content">
            <div className="container-fluid px-3 px-lg-4 py-4">

                <PageHeading
                    icon="people"
                    subtitle="Management"
                    title="Users"
                    desc="Manage library administrators, librarians, and staff accounts."
                >
                    <Link to="/add-user" className="btn btn-primary btn-sm">
                        <i className="bi bi-person-plus" aria-hidden="true"></i> Add User
                    </Link>
                </PageHeading>


                <section className="row g-3 mt-1" aria-label="User summary">
                    <div className="col-12 col-sm-6 col-xl-3">
                        <article className="metric-card metric-primary">
                            <div className="metric-top">
                                <span className="metric-label">Total Users</span>
                                <span className="metric-icon"><i className="bi bi-people" aria-hidden="true"></i></span>
                            </div>
                            <div className="metric-value">{totalUsers}</div>
                            <div className="metric-meta">
                                <span>All system users</span>
                            </div>
                        </article>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-3">
                        <article className="metric-card metric-success">
                            <div className="metric-top">
                                <span className="metric-label">Active Users</span>
                                <span className="metric-icon"><i className="bi bi-check2-circle" aria-hidden="true"></i></span>
                            </div>
                            <div className="metric-value">{activeUsers}</div>
                            <div className="metric-meta">
                                <span>Currently active</span>
                            </div>
                        </article>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-3">
                        <article className="metric-card metric-warning">
                            <div className="metric-top">
                                <span className="metric-label">Librarians</span>
                                <span className="metric-icon"><i className="bi bi-person-badge" aria-hidden="true"></i></span>
                            </div>
                            <div className="metric-value">{librarians}</div>
                            <div className="metric-meta">
                                <span>Library management</span>
                            </div>
                        </article>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-3">
                        <article className="metric-card metric-danger">
                            <div className="metric-top">
                                <span className="metric-label">Inactive / Suspended</span>
                                <span className="metric-icon"><i className="bi bi-slash-circle" aria-hidden="true"></i></span>
                            </div>
                            <div className="metric-value">{inactiveUsers}</div>
                            <div className="metric-meta">
                                <span>Need attention</span>
                            </div>
                        </article>
                    </div>
                </section>

                {/* =========================
                    USER LIST
                ========================== */}

                <section className="panel mt-3">

                    <div className="panel-header">

                        <div>

                            <h2 className="h5 mb-1 section-title">

                                <i
                                    className="bi bi-table me-2"
                                    aria-hidden="true"
                                ></i>

                                <span>User List</span>

                            </h2>

                            <p className="text-muted mb-0">
                                Search and manage system users.
                            </p>

                        </div>


                        <div className="d-flex flex-wrap gap-2">

                            <Link
                                to="/add-user"
                                className="btn btn-primary btn-sm"
                            >
                                <i className="bi bi-person-plus me-1"></i>
                                Add User
                            </Link>

                        </div>

                    </div>


                    {/* =========================
                        FILTERS
                    ========================== */}

                    <div className="p-3 border-bottom">

                        <div className="row g-3 align-items-end">

                            {/* Search */}

                            <div className="col-12 col-lg-5">

                                <label className="form-label">
                                    Search User
                                </label>

                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search by name, email or phone"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />

                            </div>


                            {/* Role */}

                            <div className="col-12 col-sm-6 col-lg-3">

                                <label className="form-label">
                                    Role
                                </label>

                                <select
                                    className="form-select"
                                    value={roleFilter}
                                    onChange={(e) =>
                                        setRoleFilter(e.target.value)
                                    }
                                >

                                    <option value="All">
                                        All Roles
                                    </option>

                                    <option value="Admin">
                                        Admin
                                    </option>

                                    <option value="Librarian">
                                        Librarian
                                    </option>

                                    <option value="Staff">
                                        Staff
                                    </option>

                                </select>

                            </div>


                            {/* Status */}

                            <div className="col-12 col-sm-6 col-lg-2">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                >

                                    <option value="All">
                                        All Status
                                    </option>

                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>


                                </select>

                            </div>


                            {/* Reset */}

                            <div className="col-12 col-lg-2">

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary w-100"
                                    onClick={handleReset}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-1"></i>
                                    Reset
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        TABLE
                    ========================== */}

                    <div className="table-responsive">

                        <table className="table align-middle mb-0">

                            <thead>

                                <tr>

                                    <th>User</th>

                                    <th>Phone</th>

                                    <th>Role</th>

                                    <th>Status</th>

                                    <th>Joined</th>

                                    <th className="text-end">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.length > 0 ? (

                                    filteredUsers.map((user) => (

                                        <tr key={user.id}>

                                            {/* User */}

                                            <td>

                                                <div className="d-flex align-items-center gap-2">

                                                    <div
                                                        className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                        }}
                                                    >
                                                        <i className="bi bi-person text-primary"></i>
                                                    </div>

                                                    <div>

                                                        <p className="fw-semibold mb-0">
                                                            {user.name}
                                                        </p>

                                                        <p className="text-muted small mb-0">
                                                            {user.email}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Phone */}

                                            <td>
                                                {user.phone}
                                            </td>


                                            {/* Role */}

                                            <td>

                                                {user.role === "Admin" && (
                                                    <span className="badge text-bg-primary">
                                                        Admin
                                                    </span>
                                                )}

                                                {user.role === "Librarian" && (
                                                    <span className="badge text-bg-warning">
                                                        Librarian
                                                    </span>
                                                )}

                                                {user.role === "Staff" && (
                                                    <span className="badge text-bg-secondary">
                                                        Staff
                                                    </span>
                                                )}

                                            </td>


                                            {/* Status */}

                                            <td>

                                                {user.status === "Active" && (
                                                    <span className="badge text-bg-success">
                                                        Active
                                                    </span>
                                                )}

                                                {user.status === "Inactive" && (
                                                    <span className="badge text-bg-secondary">
                                                        Inactive
                                                    </span>
                                                )}



                                            </td>


                                            {/* Joined */}

                                            <td>
                                                {user.created_at}
                                            </td>


                                            {/* Action */}

                                            <td className="text-end">

                                                <div className="d-flex gap-1 justify-content-end">

                                                    {/* View */}

                                                    <Link
                                                        to={`/user/${user.id}`}
                                                        className="btn btn-success btn-sm"
                                                        title="View User"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </Link>


                                                    {/* Edit */}

                                                    <Link
                                                        to={`/user/${user.id}/edit`}
                                                        className="btn btn-primary btn-sm"
                                                        title="Edit User"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>


                                                    {/* Delete */}

                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        title="Delete User"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowDeleteModal(true);
                                                        }}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="text-center py-4"
                                        >

                                            <i className="bi bi-search fs-3 text-muted"></i>

                                            <p className="text-muted mb-0 mt-2">
                                                No users found.
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* Result Count */}

                    <div className="d-flex justify-content-between align-items-center p-3">

                        <p className="text-muted small mb-0">

                            Showing{" "}
                            <strong>
                                {filteredUsers.length}
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {users.length}
                            </strong>{" "}
                            users

                        </p>

                    </div>

                </section>
            </div>
        </main>

        {/* =========================
            DELETE CONFIRMATION MODAL
        ========================== */}

        {showDeleteModal && selectedUser && (

            <>

                <div
                    className="modal fade show d-block"
                    tabIndex={-1}
                    role="dialog"
                    aria-modal="true"
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Delete User
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedUser(null);
                                    }}
                                ></button>

                            </div>


                            <div className="modal-body text-center">

                                <i className="bi bi-exclamation-triangle text-danger fs-1"></i>

                                <h5 className="mt-3">
                                    Delete {selectedUser.name}?
                                </h5>

                                <p className="text-muted mb-0">
                                    Are you sure you want to delete
                                    this user? This action cannot be
                                    undone.
                                </p>

                            </div>


                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedUser(null);
                                    }}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeleteUser}
                                >
                                    <i className="bi bi-trash me-1"></i>
                                    Delete User
                                </button>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="modal-backdrop fade show"></div>

            </>

        )}
        </>
    );
}

export default UserList;