import { Link, useNavigate } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Category } from "../../../interfaces/Category";

function AddCategory() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<
        Omit<Category, "id" | "booksCount">
    >({
        name: "",
        description: "",
        status: "Active"
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

        console.log("New Category:", formData);

        // Frontend only for now
        navigate("/categories");
    };

    return (
        <div className="container-fluid">

            <PageHeading
                icon="tags"
                subtitle="Library"
                title="Add Category"
                desc="Add a new book category"
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
                                    placeholder="Enter category name"
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
                                    placeholder="Enter category description"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>

                            </div>

                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-end gap-2">

                            <Link
                                to="/categories"
                                className="btn btn-light"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                <i className="bi bi-check-lg me-1"></i>
                                Save Category
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddCategory;