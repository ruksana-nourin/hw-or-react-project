import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../../config.ts";
import { defaultUser, type User } from "../../../interfaces/User.ts";

function EditUser() {

    const { id } = useParams();
    // existing user data
    const [user, setUser] = useState<User>(defaultUser);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        role_id: "",
        status_id: "",
        department_id: "",
    });

    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState(false);
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

    // Handle input changes
    // const handleChange = (
    //     e: React.ChangeEvent<
    //         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    //     >
    // ) => {

    //     const { name, value } = e.target;

    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };


    // Handle form submit
    function handleSubmit() {
        let newErrors: any = {};

        if (user.name == "") {
            newErrors.name = "Name is required";
        } else if (user.name.length > 100 || user.name.length < 3) {
            newErrors.name = "Name must be between 3 and 100 characters";
        } else {
            newErrors.name = "";
        }

        if (user.email == "") {
            newErrors.email = "Email is required";
        } else {
            newErrors.email = "";
        }

        if (user.phone == "") {
            newErrors.phone = "Phone is required";
        } else {
            newErrors.phone = "";
        }

        if (user.role_id == 0) {
            newErrors.role_id = "Role is required. Please select one";
        } else {
            newErrors.role_id = "";
        }

        if (user.status_id == 0) {
            newErrors.status_id = "Status is required. Please select one";
        } else {
            newErrors.status_id = "";
        }

        if (user.department_id == 0) {
            newErrors.department_id =
                "Department is required. Please select one";
        } else {
            newErrors.department_id = "";
        }

        setErrors(newErrors);

        if (
            newErrors.name == "" &&
            newErrors.email == "" &&
            newErrors.phone == "" &&
            newErrors.role_id == "" &&
            newErrors.status_id == "" &&
            newErrors.department_id == ""
        ) {
            api.put("user-update", user)
                .then((res) => {
                    console.log(res);

                    if (res.status == 200 || res.status == 201) {
                        setMsg(true);
                        setSuccess(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setMsg(true);
                    setSuccess(false);
                });
        }
    }



    return (
        <>
            <main className="dashboard-content">

                <div className="container-fluid px-3 px-lg-4 py-4">


                    {/* =========================
                        PAGE HEADING
                    ========================== */}

                    <div className="page-heading">

                        <div className="page-heading-copy">

                            <span className="page-icon">
                                <i
                                    className="bi bi-person-lines-fill"
                                    aria-hidden="true"
                                ></i>
                            </span>

                            <div>

                                <p className="eyebrow mb-1">
                                    Management
                                </p>

                                <h1 className="h3 mb-1">
                                    Edit User
                                </h1>

                                <p className="text-muted mb-0">
                                    Update user profile, role, status,
                                    and account information.
                                </p>

                            </div>

                        </div>


                        {/* Heading Actions */}

                        <div className="heading-actions">

                            <Link
                                className="btn btn-outline-secondary btn-sm"
                                to="/user"
                            >
                                <i
                                    className="bi bi-arrow-left me-1"
                                    aria-hidden="true"
                                ></i>

                                Back to Users
                            </Link>

                        </div>

                    </div>


                    {/* =========================
                        EDIT FORM
                    ========================== */}

                    <section className="row g-3">

                        <div className="col-12">
                            {msg && (

                                <div className={`alert alert-${success ? "success" : "danger"} alert-dismissible fade show mb-3`} role="alert">
                                    {success ? "Data updated successfully!" : "Somthing went wrong! try later"}

                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                        onClick={() => setMsg(false)}
                                    ></button>
                                </div>
                            )}

                            <form
                                className="panel needs-validation"
                                noValidate
                            >


                                {/* =========================
                                    BASIC INFORMATION
                                ========================== */}

                                <div className="panel-header mb-4">

                                    <div>

                                        <h2 className="h5 mb-1 section-title">

                                            <i
                                                className="bi bi-person-vcard me-2"
                                                aria-hidden="true"
                                            ></i>

                                            <span>
                                                Basic Information
                                            </span>

                                        </h2>

                                        <p className="text-muted mb-0">
                                            Update the user's personal
                                            information.
                                        </p>

                                    </div>

                                </div>


                                <div className="row g-3">


                                    {/* Full Name */}

                                    <div className="col-md-6">

                                        <label
                                            className="form-label"
                                            htmlFor="name"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={user.name}
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                            required
                                        />

                                        <div className="invalid-feedback">
                                            Name is required.
                                        </div>
                                        <small className="text-danger">{errors.name}</small>


                                    </div>


                                    {/* Email */}

                                    <div className="col-md-6">

                                        <label
                                            className="form-label"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>

                                        <input
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={user.email}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}

                                            required
                                        />

                                        <div className="invalid-feedback">
                                            Enter a valid email.
                                        </div>

                                    </div>


                                    {/* Phone */}

                                    <div className="col-md-6">

                                        <label
                                            className="form-label"
                                            htmlFor="phone"
                                        >
                                            Phone
                                        </label>

                                        <input
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            value={user.phone}
                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}

                                            required
                                        />

                                        <div className="invalid-feedback">
                                            Phone number is required.
                                        </div>

                                    </div>


                                    {/* Address */}

                                    <div className="col-md-6">

                                        <label
                                            className="form-label"
                                            htmlFor="address"
                                        >
                                            Address
                                        </label>

                                        <input
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            type="text"
                                            value={user.address}
                                            onChange={(e) => setUser({ ...user, address: e.target.value })}

                                        />

                                    </div>

                                </div>


                                {/* =========================
                                    ACCOUNT INFORMATION
                                ========================== */}

                                <hr className="my-4" />

                                <div className="mb-4">

                                    <h2 className="h5 mb-1 section-title">

                                        <i
                                            className="bi bi-shield-lock me-2"
                                            aria-hidden="true"
                                        ></i>

                                        Account Information

                                    </h2>

                                    <p className="text-muted mb-0">
                                        Manage the user's role and
                                        account status.
                                    </p>

                                </div>


                                <div className="row g-3">


                                    {/* Role */}

                                    <div className="col-md-6">

                                        <label
                                            className="form-label"
                                            htmlFor="role"
                                        >
                                            Role
                                        </label>

                                        <select
                                            className="form-select"
                                            id="role"
                                            name="role"
                                            value={user.role}
                                            onChange={(e) => setUser({ ...user, role_id: Number(e.target.value) })}

                                            required
                                        >

                                            <option value="">
                                                Choose role
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

                                        <div className="invalid-feedback">
                                            Choose a role.
                                        </div>

                                    </div>


                                    {/* Status */}

                                    <div className="col-md-6">

                                        <label
                                            className="form-label"
                                            htmlFor="status"
                                        >
                                            Account Status
                                        </label>

                                        <select
                                            className="form-select"
                                            id="status"
                                            name="status"
                                            value={user.status}
                                            onChange={(e) => setUser({ ...user, status_id: Number(e.target.value) })}
                                            required
                                        >

                                            <option value="Active">
                                                Active
                                            </option>

                                            <option value="Inactive">
                                                Inactive
                                            </option>

                                            <option value="Suspended">
                                                Suspended
                                            </option>

                                        </select>

                                    </div>


                                    {/* Department */}

                                    <div className="col-md-6">

                                        <label
                                            className="form-label"
                                            htmlFor="department"
                                        >
                                            Department
                                        </label>

                                        <select
                                            className="form-select"
                                            id="department"
                                            name="department"
                                            value={user.department}
                                            onChange={(e) => setUser({ ...user, department_id: Number(e.target.value) })}
                                        >

                                            <option value="Library Operations">
                                                Library Operations
                                            </option>

                                            <option value="Administration">
                                                Administration
                                            </option>

                                            <option value="Circulation">
                                                Circulation
                                            </option>

                                            <option value="Accounts">
                                                Accounts
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                {/* =========================
                                    NOTES
                                ========================== */}

                                <hr className="my-4" />

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                        htmlFor="notes"
                                    >
                                        Notes
                                    </label>

                                    <textarea
                                        className="form-control"
                                        id="notes"
                                        name="notes"
                                        rows={4}
                                        placeholder="Add optional notes about this user"
                                        value={user.notes}
                                        onChange={(e) => setUser({ ...user, notes: e.target.value })}
                                    ></textarea>

                                </div>


                                {/* =========================
                                    ACTION BUTTONS
                                ========================== */}

                                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">


                                    {/* Cancel */}

                                    <Link
                                        className="btn btn-outline-secondary"
                                        to={`/user/${id}`}
                                    >
                                        Cancel
                                    </Link>


                                    {/* Update */}

                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={handleSubmit}
                                    >

                                        <i
                                            className="bi bi-person-check me-1"
                                            aria-hidden="true"
                                        ></i>

                                        Update User

                                    </button>

                                </div>

                            </form>

                        </div>

                    </section>

                </div>

            </main>
        </>
    );
}

export default EditUser;