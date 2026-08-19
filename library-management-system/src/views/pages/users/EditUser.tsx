import { Link, useParams } from "react-router";
import { useState } from "react";

function EditUser() {

    const { id } = useParams();

    // Temporary existing user data
    // Later this data will come from API/database
    const [formData, setFormData] = useState({
        name: "Karim Hasan",
        email: "karim@gmail.com",
        phone: "01812345678",
        role: "Librarian",
        status: "Active",
        department: "Library Operations",
        address: "Dhaka, Bangladesh",
        notes: "Responsible for daily library operations and book circulation.",
    });


    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Handle form submit
    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        console.log("Updated User:", {
            id,
            ...formData,
        });

        alert("User updated successfully!");
    };


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

                            <form
                                className="panel needs-validation"
                                noValidate
                                onSubmit={handleSubmit}
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
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                        <div className="invalid-feedback">
                                            Name is required.
                                        </div>

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
                                            value={formData.email}
                                            onChange={handleChange}
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
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
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
                                            value={formData.address}
                                            onChange={handleChange}
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
                                            value={formData.role}
                                            onChange={handleChange}
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
                                            value={formData.status}
                                            onChange={handleChange}
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
                                            value={formData.department}
                                            onChange={handleChange}
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
                                        value={formData.notes}
                                        onChange={handleChange}
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
                                        type="submit"
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