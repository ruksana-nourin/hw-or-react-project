import type { Book } from "../../../interfaces/Book";
import PageHeading from "../../../components/PageHeading";
import { Link } from "react-router";
import { useEffect, useState } from "react";
function BookList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteBook, setDeleteBook] = useState<Book | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, statusFilter]);


    const books: Book[] = [
        {
            id: 1,
            title: "Clean Code",
            isbn: "9780132350884",
            author: "Robert C. Martin",
            category: "Programming",
            publisher: "Prentice Hall",
            copies: 10,
            availableCopies: 7,
            status: "Available",
            cover: "https://placehold.co/60x80"
        },
        {
            id: 2,
            title: "Atomic Habits",
            isbn: "9780735211292",
            author: "James Clear",
            category: "Self Development",
            publisher: "Avery",
            copies: 5,
            availableCopies: 0,
            status: "Issued",
            cover: "https://placehold.co/60x80"
        }
    ];
    const filteredBooks = books.filter((book) => {

        const search = searchTerm.toLowerCase();

        const matchesSearch =
            book.title.toLowerCase().includes(search) ||
            book.isbn.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);

        const matchesCategory =
            categoryFilter === "All" ||
            book.category === categoryFilter;

        const matchesStatus =
            statusFilter === "All" ||
            book.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });
    const handleResetFilters = () => {
        setSearchTerm("");
        setCategoryFilter("All");
        setStatusFilter("All");
    }
    const booksPerPage = 5;

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const startIndex = (currentPage - 1) * booksPerPage;

    const currentBooks = filteredBooks.slice(
        startIndex,
        startIndex + booksPerPage
    );

    const handleDeleteClick = (book: Book) => {
        setDeleteBook(book);
        setShowDeleteModal(true);
    };
    const handleDeleteConfirm = () => {
        if (!deleteBook) return;

        console.log("Delete book:", deleteBook);

        setShowDeleteModal(false);
        setDeleteBook(null);
    };
    return (
        <>

            <main className="dashboard-content">
                <div className="container-fluid">

                    {/* Page Header */}
                    <PageHeading
                        icon="book"
                        subtitle="Management"
                        title="Books"
                        desc="Manage all books in the library."
                    >


                        <Link className="btn btnsm btn-primary" to="/add-book">
                            <i className="bi bi-plus-lg me-2"></i> Add Book
                        </Link>

                    </PageHeading>

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <div className="row g-3">

                                {/* Search */}
                                <div className="col-lg">

                                    <label className="form-label">
                                        Search Books
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by title, ISBN or author..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />

                                </div>

                                {/* Category */}
                                <div className="col-lg-3 category">

                                    <select className="form-select"
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                    >
                                        <option value="All">All Categories</option>
                                        <option value="Programming">Programming</option>
                                        <option value="Self Development">Self Development</option>
                                    </select>



                                </div>

                                {/* Status */}
                                <div className="col-lg-3 status">

                                    <select className="form-select"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="All">All Status</option>
                                        <option value="Available">Available</option>
                                        <option value="Issued">Issued</option>
                                        <option value="Reserved">Reserved</option>
                                    </select>



                                </div>

                                {/* Reset Button */}
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary col-lg-auto filter-reset-btn text-white"
                                    onClick={handleResetFilters}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-1"></i>
                                    Reset
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table align-middle">

                                    <thead>

                                        <tr>

                                            <th>Cover</th>

                                            <th>Book</th>

                                            <th>Category</th>

                                            <th>Available</th>

                                            <th>Status</th>

                                            <th className="text-end">
                                                Action
                                            </th>


                                        </tr>

                                    </thead>

                                    <tbody>
                                        {currentBooks.length > 0 ? (
                                            currentBooks.map((book) => (
                                                <tr key={book.id}>

                                                    {/* Cover */}
                                                    <td>
                                                        <img
                                                            src={book.cover}
                                                            alt={book.title}
                                                            width={50}
                                                            height={70}
                                                            className="rounded border"
                                                        />
                                                    </td>

                                                    {/* Book */}
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {book.title}
                                                        </div>

                                                        <small className="text-muted d-block">
                                                            ISBN: {book.isbn}
                                                        </small>

                                                        <small className="text-muted">
                                                            {book.author}
                                                        </small>
                                                    </td>

                                                    {/* Category */}
                                                    <td>{book.category}</td>

                                                    {/* Copies */}
                                                    <td>
                                                        <span className="fw-semibold">
                                                            {book.availableCopies}
                                                        </span>
                                                        <span className="text-muted">
                                                            {" / "}
                                                            {book.copies}
                                                        </span>
                                                    </td>

                                                    {/* Status */}
                                                    <td>
                                                        <span
                                                            className={`badge ${book.status === "Available"
                                                                ? "bg-success"
                                                                : book.status === "Issued"
                                                                    ? "bg-warning text-dark"
                                                                    : "bg-info"
                                                                }`}
                                                        >
                                                            {book.status}
                                                        </span>
                                                    </td>

                                                    {/* Action */}
                                                    <td className="text-end">

                                                        <Link
                                                            to={`/book/${book.id}`}
                                                            className="btn btn-sm btn-outline-primary me-2"
                                                            title="View"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </Link>

                                                        <Link
                                                            to={`/book/${book.id}/edit`}
                                                            className="btn btn-sm btn-outline-success me-2"
                                                            title="Edit"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            title="Delete"
                                                            onClick={() => handleDeleteClick(book)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>

                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-5">
                                                    No books found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>


                                <div className="d-flex justify-content-between align-items-center mt-3">

                                    {/* Showing information */}
                                    <div className="text-muted small">
                                        Showing{" "}
                                        {filteredBooks.length > 0 ? startIndex + 1 : 0}
                                        {" - "}
                                        {Math.min(
                                            startIndex + booksPerPage,
                                            filteredBooks.length
                                        )}
                                        {" of "}
                                        {filteredBooks.length} books
                                    </div>

                                    {/* Pagination */}
                                    <nav aria-label="Book pagination">

                                        <ul className="pagination mb-0">

                                            {/* Previous */}
                                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                <button
                                                    type="button"
                                                    className="page-link"
                                                    onClick={() =>
                                                        setCurrentPage((page) => page - 1)
                                                    }
                                                    disabled={currentPage === 1}
                                                >
                                                    Previous
                                                </button>
                                            </li>

                                            {/* Page Numbers */}
                                            {Array.from(
                                                { length: totalPages },
                                                (_, index) => index + 1
                                            ).map((page) => (

                                                <li
                                                    key={page}
                                                    className={`page-item ${currentPage === page ? "active" : ""
                                                        }`}
                                                >
                                                    <button
                                                        type="button"
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(page)}
                                                    >
                                                        {page}
                                                    </button>
                                                </li>

                                            ))}

                                            {/* Next */}
                                            <li
                                                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                                    }`}
                                            >
                                                <button
                                                    type="button"
                                                    className="page-link"
                                                    onClick={() =>
                                                        setCurrentPage((page) => page + 1)
                                                    }
                                                    disabled={currentPage === totalPages}
                                                >
                                                    Next
                                                </button>
                                            </li>

                                        </ul>

                                    </nav>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </main>
            {showDeleteModal && deleteBook && (
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
                                    Delete Book
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeleteBook(null);
                                    }}
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">

                                <p className="mb-2">
                                    Are you sure you want to delete this book?
                                </p>

                                <div className="alert alert-warning mb-0">
                                    <strong>{deleteBook.title}</strong>
                                    <br />
                                    ISBN: {deleteBook.isbn}
                                </div>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeleteBook(null);
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
                                    Delete Book
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

export default BookList;