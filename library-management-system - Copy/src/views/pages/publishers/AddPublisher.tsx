import { Link, useNavigate } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Publisher } from "../../../interfaces/Publisher";

function AddPublisher() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<
        Omit<Publisher, "id" | "booksCount">
    >({
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "Active"
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
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

        console.log("New Publisher:", formData);

        // Frontend only for now
        navigate("/publishers");
    };

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid">

                    <PageHeading
                        icon="building-add"
                        subtitle="Library"
                        title="Add Publisher"
                        desc="Add a new publisher to the library"
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to="/publishers"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Publishers
                        </Link>
                    </PageHeading>

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    {/* Publisher Name */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Publisher Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Enter publisher name"
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

                                    {/* Address */}
                                    <div className="col-12">

                                        <label className="form-label">
                                            Address
                                        </label>

                                        <textarea
                                            className="form-control"
                                            name="address"
                                            rows={4}
                                            placeholder="Enter publisher address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>

                                    </div>

                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-end gap-2">

                                    <Link
                                        to="/publishers"
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-check-lg me-1"></i>
                                        Save Publisher
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

export default AddPublisher;