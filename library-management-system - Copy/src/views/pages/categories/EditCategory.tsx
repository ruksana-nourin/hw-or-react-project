import { Link, useParams } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Category } from "../../../interfaces/Category";

function EditCategory() {

    const { id } = useParams();

    const categories: Category[] = [
        {
            id: 1,
            name: "Programming",
            description: "Programming and software development books",
            booksCount: 12,
            status: "Active"
        },
        {
            id: 2,
            name: "Self Development",
            description: "Personal growth and self improvement books",
            booksCount: 8,
            status: "Active"
        },
        {
            id: 3,
            name: "Science",
            description: "Science and technology related books",
            booksCount: 15,
            status: "Active"
        },
        {
            id: 4,
            name: "History",
            description: "Historical books and references",
            booksCount: 6,
            status: "Inactive"
        }
    ];

    const category = categories.find(
        (category) => category.id === Number(id)
    );

    const [formData, setFormData] = useState<Category | null>(
        category || null
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

        console.log("Category ID:", id);
        console.log("Updated Category:", formData);
    };

    // Category not found
    if (!formData) {
        return (
            <div className="container-fluid">

                <PageHeading
                    icon="pencil-square"
                    subtitle="Library"
                    title="Edit Category"
                    desc="Category not found"
                >
                    <Link
                        className="btn btn-sm btn-outline-secondary"
                        to="/categories"
                    >
                        <i className="bi bi-arrow-left me-1"></i>
                        Back to Categories
                    </Link>
                </PageHeading>

                <div className="card shadow-sm border-0 mt-4">

                    <div className="card-body text-center py-5">

                        <i
                            className="bi bi-tags fs-1 text-muted"
                            aria-hidden="true"
                        ></i>

                        <h4 className="mt-3">
                            Category not found
                        </h4>

                        <p className="text-muted">
                            No category exists with ID {id}.
                        </p>

                        <Link
                            to="/categories"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Categories
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
                title="Edit Category"
                desc={`Update information for ${formData.name}`}
            >
                <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/category/${formData.id}`}
                >
                    <i className="bi bi-arrow-left me-1"></i>
                    Back to Category
                </Link>
            </PageHeading>

            <div className="card shadow-sm border-0 mt-4">

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">

                            {/* Category Name */}
                            <div className="col-md-6">

                                <label className="form-label">
                                    Category Name
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

                            {/* Description */}
                            <div className="col-12">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>

                            </div>

                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-end gap-2">

                            <Link
                                to={`/category/${formData.id}`}
                                className="btn btn-light"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                <i className="bi bi-check-lg me-1"></i>
                                Update Category
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditCategory;