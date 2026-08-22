import { Link } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../../config";
import PageHeading from "../../../components/PageHeading";
import type { Author } from "../../../interfaces/Author";

function AuthorList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [deleteAuthor, setDeleteAuthor] = useState<Author | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAuthors();
    }, []);

   const loadAuthors = async () => {
    try {
        const response = await api.get("authors");

        console.log("Authors API:", response.data);

        const mappedAuthors: Author[] = response.data.map((author: any) => ({
            id: Number(author.id),
            name: author.name,
            email: author.email,
            phone: author.phone,
            booksCount: 0,
            status: author.status_id === "1" ? "Active" : "Inactive",
        }));

        setAuthors(mappedAuthors);

    } catch (error) {
        console.error("Author load error:", error);
    } finally {
        setLoading(false);
    }
};

    const filteredAuthors = authors.filter((author) =>
        author.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        author.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    const handleDeleteClick = (author: Author) => {
        setDeleteAuthor(author);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteAuthor) return;

        console.log("Delete author:", deleteAuthor);

        setShowDeleteModal(false);
        setDeleteAuthor(null);
    };

    if (loading) {
        return (
            <div className="p-4">
                Loading authors...
            </div>
        );
    }
    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid">

                    <PageHeading
                        icon="person"
                        subtitle="Library"
                        title="Authors"
                        desc="Manage all authors in the library"
                    >
                        <Link
                            className="btn btn-sm btn-primary"
                            to="/add-author"
                        >
                            <i className="bi bi-plus-lg me-1"></i>
                            Add Author
                        </Link>
                    </PageHeading>

                    {/* Search */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Search Authors
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name or email..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>



                    {/* Author Table */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table align-middle">

                                    <thead>

                                        <tr>
                                            <th>ID</th>
                                            <th>Author</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Books</th>
                                            <th>Status</th>
                                            <th className="text-end">
                                                Action
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredAuthors.length > 0 ? (

                                            filteredAuthors.map((author) => (

                                                <tr key={author.id}>

                                                    <td>
                                                        #{author.id}
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {author.name}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {author.email}
                                                    </td>

                                                    <td>
                                                        {author.phone}
                                                    </td>

                                                    <td>
                                                        {author.booksCount}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                author.status === "Active"
                                                                    ? "badge bg-success"
                                                                    : "badge bg-secondary"
                                                            }
                                                        >
                                                            {author.status}
                                                        </span>

                                                    </td>

                                                    <td className="text-end">

                                                        <Link
                                                            to={`/author/${author.id}`}
                                                            className="btn btn-sm btn-outline-primary me-1"
                                                            title="View"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </Link>

                                                        <Link
                                                            to={`/author/${author.id}/edit`}
                                                            className="btn btn-sm btn-outline-secondary me-1"
                                                            title="Edit"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            title="Delete"
                                                            onClick={() => handleDeleteClick(author)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan={7}
                                                    className="text-center py-5"
                                                >
                                                    No authors found.
                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>
                    {showDeleteModal && deleteAuthor && (
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
                                            Delete Author
                                        </h5>

                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                                setDeleteAuthor(null);
                                            }}
                                            aria-label="Close"
                                        ></button>
                                    </div>

                                    <div className="modal-body">

                                        <p className="mb-2">
                                            Are you sure you want to delete this author?
                                        </p>

                                        <div className="alert alert-warning mb-0">
                                            <strong>{deleteAuthor.name}</strong>
                                            <br />
                                            Email: {deleteAuthor.email}
                                        </div>

                                    </div>

                                    <div className="modal-footer">

                                        <button
                                            type="button"
                                            className="btn btn-light"
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                                setDeleteAuthor(null);
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
                                            Delete Author
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {showDeleteModal && (
                        <div className="modal-backdrop fade show"></div>
                    )}

                </div>
            </main>
        </>
    );
}

export default AuthorList;