import { Link, useParams } from "react-router";
import PageHeading from "../../../components/PageHeading";
import { useEffect, useState } from "react";
import { defaultUser, type User } from "../../../interfaces/User";
import { api } from "../../../config";

function ViewUser() {

    const { id } = useParams();

    const [user, setUser] = useState<User>(defaultUser);

    const getUser = () => {
        api
            .get("user-details?id=" + id)
            .then((res) => {
                // console.log(res.data);
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getUser();
    }, []);

    // Later this data will come from API/database
    // Temporary mock data
    // id: id || "1",
    // name: "Karim Hasan",
    // email: "karim@gmail.com",
    // phone: "01812345678",
    // role: "Librarian",
    // status: "Active",
    // joinedDate: "08 Aug 2026",
    // lastLogin: "Today, 10:30 AM",
    // department: "Library Operations",
    // address: "Dhaka, Bangladesh",


    return (
        <>
            <main className="dashboard-content">

                <div className="container-fluid px-3 px-lg-4 py-4">

                    {/* =========================
                    PAGE HEADING
                ========================== */}
                    <PageHeading
                        icon="person-lines-fill"
                        subtitle="Management"
                        title="User Details"
                        desc="View account information, permissions, and recent activity."

                    >
                        <Link
                            className="btn btn-outline-secondary btn-sm" to="/user">
                            <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>
                            Back to Users
                        </Link>


                        <Link
                            className="btn btn-primary btn-sm" to={`/user/${user.id}/edit`}>
                            <i className="bi bi-pencil me-1" aria-hidden="true"></i>
                            Edit User
                        </Link>
                    </PageHeading>



                    {/* =========================
                    USER DETAILS
                ========================== */}

                    <section className="row g-3">


                        {/* =========================
                        LEFT PROFILE
                    ========================== */}

                        <div className="col-12 col-xl-4">

                            <div className="panel h-100 text-center profile-card">

                                {/* Profile Cover */}

                                <div className="profile-cover">
                                    {/* <img
                                        src="../assets/images/png/dasher-ui-bootstrap-5.jpg"
                                        alt="Library workspace"
                                    /> */}
                                </div>


                                {/* Profile Hero */}

                                <div className="profile-hero">

                                    <div
                                        className="avatar-img avatar-xl profile-photo rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                        }}
                                    >
                                        <i className="bi bi-person fs-1 text-primary"></i>
                                    </div>


                                    <h2 className="h5 mb-1 mt-3">
                                        {user.name}
                                    </h2>


                                    <p className="text-muted mb-3">
                                        {user.role}
                                    </p>


                                    {user.status === "Active" && (
                                        <span className="badge text-bg-success">
                                            Active Account
                                        </span>
                                    )}

                                    {user.status === "Inactive" && (
                                        <span className="badge text-bg-secondary">
                                            Inactive Account
                                        </span>
                                    )}



                                </div>


                                {/* User Information */}

                                <div className="info-list mt-4 text-start">

                                    <div>
                                        <span>Email</span>
                                        <strong>
                                            {user.email}
                                        </strong>
                                    </div>


                                    <div>
                                        <span>Phone</span>
                                        <strong>
                                            {user.phone}
                                        </strong>
                                    </div>


                                    <div>
                                        <span>Role</span>
                                        <strong>
                                            {user.role}
                                        </strong>
                                    </div>


                                    <div>
                                        <span>Department</span>
                                        <strong>
                                            {user.department}
                                        </strong>
                                    </div>


                                    <div>
                                        <span>Joined</span>
                                        <strong>
                                            {user.created_at}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =========================
                        RIGHT SIDE
                    ========================== */}

                        <div className="col-12 col-xl-8">


                            {/* =========================
                            ACCOUNT OVERVIEW
                        ========================== */}

                            <div className="panel mb-3">

                                <div className="panel-header">

                                    <div>

                                        <h2 className="h5 mb-1 section-title">

                                            <i
                                                className="bi bi-person-vcard me-2"
                                                aria-hidden="true"
                                            ></i>

                                            <span>
                                                Account Overview
                                            </span>

                                        </h2>

                                        <p className="text-muted mb-0">
                                            User role, account status,
                                            and login information.
                                        </p>

                                    </div>


                                    <Link
                                        to={`/user/${user.id}/edit`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        <i className="bi bi-pencil me-1"></i>
                                        Edit User
                                    </Link>

                                </div>


                                <div className="row g-3">


                                    {/* Role */}

                                    <div className="col-md-4">

                                        <div className="mini-card">

                                            <span>
                                                Role
                                            </span>

                                            <strong>
                                                {user.role}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* Status */}

                                    <div className="col-md-4">

                                        <div className="mini-card">

                                            <span>
                                                Status
                                            </span>

                                            <strong className="text-success">
                                                {user.status}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* Last Login */}

                                    <div className="col-md-4">

                                        <div className="mini-card">

                                            <span>
                                                Last Login
                                            </span>

                                            <strong>
                                                {user.last_login}
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* =========================
                            PROFILE INFORMATION
                        ========================== */}

                            <div className="panel mb-3">

                                <div className="panel-header">

                                    <div>

                                        <h2 className="h5 mb-1 section-title">

                                            <i
                                                className="bi bi-person-vcard me-2"
                                                aria-hidden="true"
                                            ></i>

                                            <span>
                                                Profile Information
                                            </span>

                                        </h2>

                                        <p className="text-muted mb-0">
                                            Basic information about this
                                            system user.
                                        </p>

                                    </div>

                                </div>


                                <div className="row g-3">


                                    <div className="col-md-6">

                                        <div className="border rounded p-3 h-100">

                                            <small className="text-muted">
                                                Full Name
                                            </small>

                                            <div className="fw-semibold mt-1">
                                                {user.name}
                                            </div>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="border rounded p-3 h-100">

                                            <small className="text-muted">
                                                Email Address
                                            </small>

                                            <div className="fw-semibold mt-1">
                                                {user.email}
                                            </div>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="border rounded p-3 h-100">

                                            <small className="text-muted">
                                                Phone Number
                                            </small>

                                            <div className="fw-semibold mt-1">
                                                {user.phone}
                                            </div>

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="border rounded p-3 h-100">

                                            <small className="text-muted">
                                                Address
                                            </small>

                                            <div className="fw-semibold mt-1">
                                                {user.address}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* =========================
                            RECENT ACTIVITY
                        ========================== */}

                            <div className="panel">

                                <div className="panel-header">

                                    <div>

                                        <h2 className="h5 mb-1 section-title">

                                            <i
                                                className="bi bi-clock-history me-2"
                                                aria-hidden="true"
                                            ></i>

                                            <span>
                                                Recent Activity
                                            </span>

                                        </h2>

                                        <p className="text-muted mb-0">
                                            Recent account and library
                                            management activities.
                                        </p>

                                    </div>

                                </div>


                                <div className="activity-list">


                                    {/* Activity 1 */}

                                    <div className="activity-item">

                                        <span className="activity-dot bg-primary"></span>

                                        <div>

                                            <p className="mb-1 fw-semibold">
                                                Issued a book to a member
                                            </p>

                                            <p className="text-muted small mb-0">
                                                Clean Code — 2 hours ago
                                            </p>

                                        </div>

                                    </div>


                                    {/* Activity 2 */}

                                    <div className="activity-item">

                                        <span className="activity-dot bg-success"></span>

                                        <div>

                                            <p className="mb-1 fw-semibold">
                                                Registered a new member
                                            </p>

                                            <p className="text-muted small mb-0">
                                                Yesterday
                                            </p>

                                        </div>

                                    </div>


                                    {/* Activity 3 */}

                                    <div className="activity-item">

                                        <span className="activity-dot bg-warning"></span>

                                        <div>

                                            <p className="mb-1 fw-semibold">
                                                Updated account information
                                            </p>

                                            <p className="text-muted small mb-0">
                                                03 Aug 2026
                                            </p>

                                        </div>

                                    </div>


                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </main>
        </>
    );
}

export default ViewUser;