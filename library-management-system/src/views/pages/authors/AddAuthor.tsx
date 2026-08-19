import { Link, useNavigate } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Author } from "../../../interfaces/Author";

function AddAuthor() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<Omit<Author, "id" | "booksCount">>({
        name: "",
        email: "",
        phone: "",
        status: "Active"
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        console.log("New Author:", formData);

        // Frontend only for now
        navigate("/authors");
    };

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid">

                    <PageHeading
                        icon="person-plus"
                        subtitle="Library"
                        title="Add Author"
                        desc="Add a new author to the library"
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to="/authors"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Authors
                        </Link>
                    </PageHeading>

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    {/* Author Name */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Author Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Enter author name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Enter email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Phone */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Phone
                                        </label>

                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Status */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Status
                                        </label>

                                        <select
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Active">
                                                Active
                                            </option>

                                            <option value="Inactive">
                                                Inactive
                                            </option>
                                        </select>

                                    </div>

                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-end gap-2">

                                    <Link
                                        to="/authors"
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-check-lg me-1"></i>
                                        Save Author
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            </main>
        </>
    );
}

export default AddAuthor;