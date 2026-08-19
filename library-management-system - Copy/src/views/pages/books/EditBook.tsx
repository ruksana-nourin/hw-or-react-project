import { Link, useParams } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Book } from "../../../interfaces/Book";

function EditBook() {

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

    const [formData, setFormData] = useState<Book | null>(
        book || null
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => {

            if (!prev) return prev;

            return {
                ...prev,
                [name]:
                    name === "copies" || name === "availableCopies"
                        ? Number(value)
                        : value
            };
        });
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        console.log("Book ID:", id);
        console.log("Updated Book:", formData);
    };

    // Book not found
    if (!formData) {
        return (
            <div className="container-fluid">

                <PageHeading
                    icon="pencil-square"
                    subtitle="Library"
                    title="Edit Book"
                    desc="Book not found"
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
        <>
            <main className="dashboard-content">
                <div className="container-fluid">

                    <PageHeading
                        icon="pencil-square"
                        subtitle="Library"
                        title="Edit Book"
                        desc={`Update information for ${formData.title}`}
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to={`/book/${formData.id}`}
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Book
                        </Link>
                    </PageHeading>

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    {/* Book Title */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Book Title
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* ISBN */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            ISBN
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="isbn"
                                            value={formData.isbn}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Author */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Author
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Category */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            className="form-select"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select category
                                            </option>

                                            <option value="Programming">
                                                Programming
                                            </option>

                                            <option value="Self Development">
                                                Self Development
                                            </option>

                                        </select>

                                    </div>

                                    {/* Publisher */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Publisher
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="publisher"
                                            value={formData.publisher}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Total Copies */}
                                    <div className="col-md-3">

                                        <label className="form-label">
                                            Total Copies
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="copies"
                                            min="1"
                                            value={formData.copies}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Available Copies */}
                                    <div className="col-md-3">

                                        <label className="form-label">
                                            Available Copies
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="availableCopies"
                                            min="0"
                                            max={formData.copies}
                                            value={formData.availableCopies}
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

                                            <option value="Available">
                                                Available
                                            </option>

                                            <option value="Issued">
                                                Issued
                                            </option>

                                            <option value="Reserved">
                                                Reserved
                                            </option>

                                        </select>

                                    </div>

                                    {/* Cover */}
                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Book Cover URL
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cover"
                                            value={formData.cover}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-end gap-2">

                                    <Link
                                        to={`/book/${formData.id}`}
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-check-lg me-1"></i>
                                        Update Book
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

export default EditBook;