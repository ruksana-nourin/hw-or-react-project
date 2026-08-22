
import { Link, useParams } from "react-router";
import PageHeading from "../../../components/PageHeading";
import type { Book } from "../../../interfaces/Book";

function ViewBook() {

    const { id } = useParams();

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
            cover: "https://placehold.co/180x240"
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
            cover: "https://placehold.co/180x240"
        }
    ];

    const book = books.find(
        (book) => book.id === Number(id)
    );

    // Book not found
    if (!book) {
        return (
            <div className="container-fluid">

                <PageHeading
                    icon="book"
                    subtitle="Library"
                    title="Book Not Found"
                    desc="The requested book could not be found."
                >
                    <Link
                        className="btn btn-sm btn-outline-secondary"
                        to="/books"
                    >
                        <i className="bi bi-arrow-left me-1"></i>
                        Back to Books
                    </Link>
                </PageHeading>

                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body text-center py-5">

                        <i
                            className="bi bi-book-x fs-1 text-muted"
                            aria-hidden="true"
                        ></i>

                        <h4 className="mt-3">
                            Book not found
                        </h4>

                        <p className="text-muted">
                            No book exists with ID {id}.
                        </p>

                        <Link
                            to="/books"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Books
                        </Link>

                    </div>
                </div>

            </div>
        );
    }

    return (
        <div className="container-fluid">

            <PageHeading
                icon="book"
                subtitle="Library"
                title="Book Details"
                desc="View detailed information about this book"
            >
                <Link
                    className="btn btn-sm btn-outline-secondary"
                    to="/books"
                >
                    <i className="bi bi-arrow-left me-1"></i>
                    Back to Books
                </Link>
            </PageHeading>

            <div className="card shadow-sm border-0 mt-4">

                <div className="card-body">

                    <div className="row g-4">

                        {/* Book Cover */}
                        <div className="col-md-3 text-center">

                            <img
                                src={book.cover}
                                alt={book.title}
                                className="img-fluid rounded shadow-sm"
                            />

                        </div>

                        {/* Book Information */}
                        <div className="col-md-9">

                            <h3 className="fw-bold mb-3">
                                {book.title}
                            </h3>

                            <div className="row g-3">

                                {/* ISBN */}
                                <div className="col-md-6">
                                    <div className="text-muted small">
                                        ISBN
                                    </div>

                                    <div className="fw-semibold">
                                        {book.isbn}
                                    </div>
                                </div>

                                {/* Author */}
                                <div className="col-md-6">
                                    <div className="text-muted small">
                                        Author
                                    </div>

                                    <div className="fw-semibold">
                                        {book.author}
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="col-md-6">
                                    <div className="text-muted small">
                                        Category
                                    </div>

                                    <div className="fw-semibold">
                                        {book.category}
                                    </div>
                                </div>

                                {/* Publisher */}
                                <div className="col-md-6">
                                    <div className="text-muted small">
                                        Publisher
                                    </div>

                                    <div className="fw-semibold">
                                        {book.publisher}
                                    </div>
                                </div>

                                {/* Total Copies */}
                                <div className="col-md-6">
                                    <div className="text-muted small">
                                        Total Copies
                                    </div>

                                    <div className="fw-semibold">
                                        {book.copies}
                                    </div>
                                </div>

                                {/* Available Copies */}
                                <div className="col-md-6">
                                    <div className="text-muted small">
                                        Available Copies
                                    </div>

                                    <div className="fw-semibold">
                                        {book.availableCopies}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-md-6">
                                    <div className="text-muted small">
                                        Status
                                    </div>

                                    <span
                                        className={
                                            book.status === "Available"
                                                ? "badge bg-success"
                                                : "badge bg-warning text-dark"
                                        }
                                    >
                                        {book.status}
                                    </span>
                                </div>

                            </div>

                            <hr className="my-4" />

                            {/* Actions */}
                            <div className="d-flex gap-2">

                                <Link
                                    to={`/book/${book.id}/edit`}
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-pencil me-1"></i>
                                    Edit Book
                                </Link>

                                <Link
                                    to="/books"
                                    className="btn btn-light"
                                >
                                    Back
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ViewBook;