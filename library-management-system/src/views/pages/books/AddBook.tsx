import { Link } from "react-router";
import { useEffect, useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Book } from "../../../interfaces/Book";
import { defaultBook } from "../../../interfaces/Book";
import type { Author } from "../../../interfaces/Author";
import type { Category } from "../../../interfaces/Category";
import type { Publisher } from "../../../interfaces/Publisher";



import { api } from "../../../config";



function AddBook() {
    const [book, setBook] = useState<Book>(defaultBook);

    const [authors, setAuthors] = useState<Author[]>([]);
    const [category, setCategory] = useState<Category[]>([]);
    const [publisher, setPublisher] = useState<Publisher[]>([]);



    function getAuthors() {
        api.get("authors")
            .then((res) => {
                console.log(res.data);
                setAuthors(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }



    function getCategories() {
        api.get("categories")
            .then((res) => {
                console.log(res.data);
                setCategory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getPublishers() {
        api.get("publishers")
            .then((res) => {
                console.log(res.data);
                setPublisher(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAuthors();
        getCategories();
        getPublishers();
    }, []);




    // const handleChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    // ) => {
    //     const { name, value } = e.target;

    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (!formData.title.trim()) {
    //         alert("Please enter the book title.");
    //         return;
    //     }

    //     if (!formData.isbn.trim()) {
    //         alert("Please enter the ISBN.");
    //         return;
    //     }

    //     if (!formData.author.trim()) {
    //         alert("Please enter the author name.");
    //         return;
    //     }

    //     if (!formData.category) {
    //         alert("Please select a category.");
    //         return;
    //     }

    //     if (!formData.publisher.trim()) {
    //         alert("Please enter the publisher.");
    //         return;
    //     }

    //     if (formData.copies < 1) {
    //         alert("Total copies must be at least 1.");
    //         return;
    //     }

    //     console.log("Book submitted:", formData);
    // };
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

                            <form>

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
                                            value={book.title}
                                            onChange={(e) =>
                                                setBook({
                                                    ...book,
                                                    title: e.target.value,
                                                })
                                            }
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
                                            value={book.isbn}
                                            onChange={(e) =>
                                                setBook({
                                                    ...book,
                                                    isbn: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    {/* Author */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Author
                                        </label>

                                        <select
                                            className="form-select"
                                            value={book.author_id}
                                            onChange={(e) =>
                                                setBook({
                                                    ...book,
                                                    author_id: Number(e.target.value),
                                                })
                                            }
                                            required
                                        >
                                            <option value={0} disabled>
                                                Select author
                                            </option>

                                            {authors.map((author) => (
                                                <option key={author.id} value={author.id}>
                                                    {author.name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    {/* Category */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            className="form-select"
                                            value={book.category_id}
                                            onChange={(e) =>
                                                setBook({
                                                    ...book,
                                                    category_id: Number(e.target.value),
                                                })
                                            }
                                            required
                                        >
                                            <option value={0} disabled>
                                                Select category
                                            </option>

                                            {category.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    {/* Publisher */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Publisher
                                        </label>

                                        <select
                                            className="form-select"
                                            value={book.publisher_id}
                                            onChange={(e) =>
                                                setBook({
                                                    ...book,
                                                    publisher_id: Number(e.target.value),
                                                })
                                            }
                                            required
                                        >
                                            <option value={0} disabled>
                                                Select publisher
                                            </option>

                                            {publisher.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>

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
                                            value={book.copies}
                                            onChange={(e) =>
                                                setBook({
                                                    ...book,
                                                    copies: Number(e.target.value),
                                                })
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
                                            value={book.status_id}
                                            onChange={(e) =>
                                                setBook({
                                                    ...book,
                                                    status_id: Number(e.target.value),
                                                })
                                            }
                                        >
                                            <option value={1}>
                                                Available
                                            </option>

                                            <option value={2}>
                                                Issued
                                            </option>

                                            <option value={3}>
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
                                            type="file"
                                            className="form-control"
                                            name="cover_image"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setBook({
                                                    ...book,
                                                    cover_image: e.target.files?.[0] ?? null,
                                                })
                                            }
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