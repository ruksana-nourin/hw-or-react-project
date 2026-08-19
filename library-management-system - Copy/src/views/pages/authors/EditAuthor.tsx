import { Link, useParams } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Author } from "../../../interfaces/Author";

function EditAuthor() {

    const { id } = useParams();

    const authors: Author[] = [
        {
            id: 1,
            name: "Robert C. Martin",
            email: "robert@example.com",
            phone: "+1 555-1001",
            booksCount: 12,
            status: "Active"
        },
        {
            id: 2,
            name: "James Clear",
            email: "james@example.com",
            phone: "+1 555-1002",
            booksCount: 8,
            status: "Active"
        },
        {
            id: 3,
            name: "J. K. Rowling",
            email: "jk@example.com",
            phone: "+1 555-1003",
            booksCount: 15,
            status: "Active"
        },
        {
            id: 4,
            name: "George Orwell",
            email: "george@example.com",
            phone: "+1 555-1004",
            booksCount: 7,
            status: "Inactive"
        }
    ];

    const author = authors.find(
        (author) => author.id === Number(id)
    );

    const [formData, setFormData] = useState<Author | null>(
        author || null
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

        console.log("Author ID:", id);
        console.log("Updated Author:", formData);
    };

    // Author not found
    if (!formData) {
        return (
            <div className="container-fluid">

                <PageHeading
                    icon="pencil-square"
                    subtitle="Library"
                    title="Edit Author"
                    desc="Author not found"
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

                    <div className="card-body text-center py-5">

                        <i
                            className="bi bi-person-x fs-1 text-muted"
                            aria-hidden="true"
                        ></i>

                        <h4 className="mt-3">
                            Author not found
                        </h4>

                        <p className="text-muted">
                            No author exists with ID {id}.
                        </p>

                        <Link
                            to="/authors"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Authors
                        </Link>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <>
            <main className="dashboard-content">


                <div className="container-fluid">

                    <PageHeading
                        icon="pencil-square"
                        subtitle="Library"
                        title="Edit Author"
                        desc={`Update information for ${formData.name}`}
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to={`/author/${formData.id}`}
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Author
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

                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-end gap-2">

                                    <Link
                                        to={`/author/${formData.id}`}
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-check-lg me-1"></i>
                                        Update Author
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

export default EditAuthor;