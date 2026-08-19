import { Link } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";

function AddBook() {
    const [formData, setFormData] = useState({
        title: "",
        isbn: "",
        author: "",
        category: "",
        publisher: "",
        copies: 1,
        status: "Available",
        cover: "",
    });
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert("Please enter the book title.");
            return;
        }

        if (!formData.isbn.trim()) {
            alert("Please enter the ISBN.");
            return;
        }

        if (!formData.author.trim()) {
            alert("Please enter the author name.");
            return;
        }

        if (!formData.category) {
            alert("Please select a category.");
            return;
        }

        if (!formData.publisher.trim()) {
            alert("Please enter the publisher.");
            return;
        }

        if (formData.copies < 1) {
            alert("Total copies must be at least 1.");
            return;
        }

        console.log("Book submitted:", formData);
    };
    return (
        <>
            <main className="dashboard-content">

                <div className="container-fluid">

                    <PageHeading
                        icon="book"
                        subtitle="Library"
                        title="Add Book"
                        desc="Add a new book to the library"
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
                                            placeholder="Enter book title"
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
                                            placeholder="Enter ISBN"
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
                                            placeholder="Enter author name"
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
                                            placeholder="Enter publisher"
                                            value={formData.publisher}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Copies */}
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
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    copies: Number(e.target.value),
                                                }))
                                            }
                                            required
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className="col-md-3">
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
                                            Book Cover
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cover"
                                            placeholder="Enter cover image URL"
                                            value={formData.cover}
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-end gap-2">

                                    <Link
                                        to="/books"
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-check-lg me-1"></i>
                                        Save Book
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

export default AddBook;