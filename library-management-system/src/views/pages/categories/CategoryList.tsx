import { Link } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Category } from "../../../interfaces/Category";

function CategoryList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const filteredCategories = categories.filter((category) =>
        category.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        category.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (category: Category) => {
        setDeleteCategory(category);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteCategory) return;

        console.log("Delete category:", deleteCategory);

        setShowDeleteModal(false);
        setDeleteCategory(null);
    };

    return (
        <>
            <main className="dashboard-content">


                <div className="container-fluid">

                    <PageHeading
                        icon="tags"
                        subtitle="Library"
                        title="Categories"
                        desc="Manage all book categories"
                    >
                        <Link
                            className="btn btn-sm btn-primary"
                            to="/add-category"
                        >
                            <i className="bi bi-plus-lg me-1"></i>
                            Add Category
                        </Link>
                    </PageHeading>

                    {/* Search */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Search Categories
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name or description..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Category Table */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table align-middle">

                                    <thead>

                                        <tr>
                                            <th>ID</th>
                                            <th>Category</th>
                                            <th>Description</th>
                                            <th>Books</th>
                                            <th>Status</th>
                                            <th className="text-end">
                                                Action
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredCategories.length > 0 ? (

                                            filteredCategories.map((category) => (

                                                <tr key={category.id}>

                                                    <td>
                                                        #{category.id}
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {category.name}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {category.description}
                                                    </td>

                                                    <td>
                                                        {category.booksCount}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                category.status === "Active"
                                                                    ? "badge bg-success"
                                                                    : "badge bg-secondary"
                                                            }
                                                        >
                                                            {category.status}
                                                        </span>

                                                    </td>

                                                    <td className="text-end">

                                                        <Link
                                                            to={`/category/${category.id}`}
                                                            className="btn btn-sm btn-outline-primary me-1"
                                                            title="View"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </Link>

                                                        <Link
                                                            to={`/category/${category.id}/edit`}
                                                            className="btn btn-sm btn-outline-secondary me-1"
                                                            title="Edit"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            title="Delete"
                                                            onClick={() => handleDeleteClick(category)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan={6}
                                                    className="text-center py-5"
                                                >
                                                    No categories found.
                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>
            </main>
            {showDeleteModal && deleteCategory && (
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
                                    Delete Category
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeleteCategory(null);
                                    }}
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">

                                <p className="mb-2">
                                    Are you sure you want to delete this category?
                                </p>

                                <div className="alert alert-warning mb-0">
                                    <strong>{deleteCategory.name}</strong>
                                    <br />
                                    {deleteCategory.description}
                                </div>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeleteCategory(null);
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeleteConfirm}
                                >
                                    <i className="bi bi-trash me-1"></i>
                                    Delete Category
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-backdrop fade show"></div>
            )}
        </>
    );
}

export default CategoryList;