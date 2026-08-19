import { Link, useParams } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Publisher } from "../../../interfaces/Publisher";

function EditPublisher() {

    const { id } = useParams();

    const publishers: Publisher[] = [
        {
            id: 1,
            name: "Prentice Hall",
            email: "contact@prenticehall.com",
            phone: "+1 555-2001",
            address: "New York, USA",
            booksCount: 25,
            status: "Active"
        },
        {
            id: 2,
            name: "Avery",
            email: "contact@avery.com",
            phone: "+1 555-2002",
            address: "New York, USA",
            booksCount: 18,
            status: "Active"
        },
        {
            id: 3,
            name: "Penguin Books",
            email: "info@penguin.com",
            phone: "+1 555-2003",
            address: "London, UK",
            booksCount: 32,
            status: "Active"
        },
        {
            id: 4,
            name: "Oxford University Press",
            email: "info@oup.com",
            phone: "+1 555-2004",
            address: "Oxford, UK",
            booksCount: 20,
            status: "Inactive"
        }
    ];

    const publisher = publishers.find(
        (publisher) => publisher.id === Number(id)
    );

    const [formData, setFormData] = useState<Publisher | null>(
        publisher || null
    );

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => {

            if (!prev) return prev;

            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        console.log("Publisher ID:", id);
        console.log("Updated Publisher:", formData);
    };

    if (!formData) {
        return (
            <div className="container-fluid">

                <PageHeading
                    icon="pencil-square"
                    subtitle="Library"
                    title="Edit Publisher"
                    desc="Publisher not found"
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

                    <div className="card-body text-center py-5">

                        <i
                            className="bi bi-building-x fs-1 text-muted"
                            aria-hidden="true"
                        ></i>

                        <h4 className="mt-3">
                            Publisher not found
                        </h4>

                        <p className="text-muted">
                            No publisher exists with ID {id}.
                        </p>

                        <Link
                            to="/publishers"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Publishers
                        </Link>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="container-fluid">

            <PageHeading
                icon="pencil-square"
                subtitle="Library"
                title="Edit Publisher"
                desc={`Update information for ${formData.name}`}
            >
                <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/publisher/${formData.id}`}
                >
                    <i className="bi bi-arrow-left me-1"></i>
                    Back to Publisher
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
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                            </div>

                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-end gap-2">

                            <Link
                                to={`/publisher/${formData.id}`}
                                className="btn btn-light"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                <i className="bi bi-check-lg me-1"></i>
                                Update Publisher
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditPublisher;