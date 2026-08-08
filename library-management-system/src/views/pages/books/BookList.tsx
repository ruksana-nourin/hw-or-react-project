import type { Book } from "../../../interfaces/Book";
function BookList() {
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
    return (
        <div className="container-fluid">

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h3 className="fw-bold mb-1">
                        Books
                    </h3>

                    <p className="text-muted mb-0">
                        Manage all books in the library
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                >
                    <i className="bi bi-plus-lg me-2"></i>

                    Add Book
                </button>

            </div>

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title, ISBN or author..."
                            />

                        </div>

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
    {books.length > 0 ? (
        books.map((book) => (
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
                        className={`badge ${
                            book.status === "Available"
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

                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        title="View"
                    >
                        <i className="bi bi-eye"></i>
                    </button>

                    <button
                        className="btn btn-sm btn-outline-success me-2"
                        title="Edit"
                    >
                        <i className="bi bi-pencil"></i>
                    </button>

                    <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
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

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BookList;