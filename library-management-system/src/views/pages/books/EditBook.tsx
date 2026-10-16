import { Link, useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Book } from "../../../interfaces/Book";
import { api } from "../../../config";
function EditBook() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState<Book | null>(null);
    const [authors, setAuthors] = useState<any[]>([]);
    const [publishers, setPublishers] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    // const [statuses, setStatuses] = useState<any[]>([]);
    const getBook = () => {

        api.get("books")
            .then((res) => {

                console.log("Books API:", res.data);

                const selectedBook = res.data.find(
                    (item: any) =>
                        Number(item.id) === Number(id)
                );

                if (selectedBook) {
                    // console.log("Selected Book:", selectedBook);


                    const mappedBook: Book = {

                        id: Number(selectedBook.id),

                        title: selectedBook.title,

                        isbn: selectedBook.isbn,

                        author_id:
                            Number(selectedBook.author_id),

                        author:
                            selectedBook.author,

                        category_id:
                            Number(selectedBook.category_id),

                        category:
                            selectedBook.category,

                        publisher_id:
                            Number(selectedBook.publisher_id),

                        publisher:
                            selectedBook.publisher,

                        copies:
                            Number(selectedBook.copies),

                        status_id:
                            Number(selectedBook.status_id),

                        status:
                            selectedBook.status,

                        cover:
                            selectedBook.cover,

                    };

                    setFormData(mappedBook);

                }

            })
            .catch((err) => {

                console.log(
                    "Book API Error:",
                    err
                );

            });

    };
    const getAuthors = () => {

        api.get("authors")
            .then((res) => {

                console.log("Authors:", res.data);

                setAuthors(res.data);

            })
            .catch((err) => {

                console.log(
                    "Authors Error:",
                    err
                );

            });

    };


    const getPublishers = () => {

        api.get("publishers")
            .then((res) => {

                console.log(
                    "Publishers:",
                    res.data
                );

                setPublishers(res.data);

            })
            .catch((err) => {

                console.log(
                    "Publishers Error:",
                    err
                );

            });

    };
    const getCategories = () => {

        api.get("categories")
            .then((res) => {

                console.log("Categories:", res.data);

                setCategories(res.data);

            })
            .catch((err) => {

                console.log(
                    "Categories Error:",
                    err
                );

            });

    };
    useEffect(() => {

        getBook();
        getAuthors();
        getPublishers();
        getCategories();

    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => {

            if (!prev) return prev;

            return {
                ...prev,
                [name]:
                    name === "copies"
                        ? Number(value)
                        : value
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData) return;

        const data = new FormData();

        data.append("id", String(formData.id));
        data.append("title", formData.title);
        data.append("isbn", formData.isbn);

        data.append(
            "author_id",
            String(formData.author_id)
        );

        data.append(
            "category_id",
            String(formData.category_id)
        );

        data.append(
            "publisher_id",
            String(formData.publisher_id)
        );

        data.append(
            "total_copies",
            String(formData.copies)
        );

        data.append(
            "status_id",
            String(formData.status_id)
        );

        if (formData.cover_image) {
            data.append(
                "cover_image",
                formData.cover_image
            );
        }

        api.post("book-update", data)
            .then((res) => {

                console.log(
                    "Book Update Response:",
                    res.data
                );

                alert("Book updated successfully");

                navigate("/books");

            })
            .catch((err) => {

                console.log(
                    "Book Update Error:",
                    err
                );

                console.log(
                    "Response:",
                    err.response?.data
                );

                alert("Failed to update book");

            });
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

                                        <select
                                            className="form-select"
                                            name="author_id"
                                            value={formData.author_id}
                                            onChange={handleChange}
                                        >
                                            <option value={0}>
                                                Select Author
                                            </option>

                                            {authors.map((author) => (
                                                <option
                                                    key={author.id}
                                                    value={author.id}
                                                >
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
                                            name="category"
                                            value={formData.category_id}
                                            onChange={handleChange}
                                        >

                                            <option value="">
                                                Select category
                                            </option>

                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
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
                                            name="publisher_id"
                                            value={formData.publisher_id}
                                            onChange={handleChange}
                                        >
                                            <option value={0}>
                                                Select Publisher
                                            </option>

                                            {publishers.map((publisher) => (
                                                <option
                                                    key={publisher.id}
                                                    value={publisher.id}
                                                >
                                                    {publisher.name}
                                                </option>
                                            ))}
                                        </select>

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
                                    <div className="col-12">

                                        <label className="form-label fw-semibold">
                                            Book Cover
                                        </label>

                                        <div className="d-flex align-items-center gap-2">

                                            <input
                                                type="file"
                                                className="form-control"
                                                name="cover_image"
                                                accept="image/*"
                                                onChange={(e) => {

                                                    const file =
                                                        e.target.files?.[0] || null;

                                                    setFormData((prev) => {

                                                        if (!prev) return prev;

                                                        return {
                                                            ...prev,
                                                            cover_image: file
                                                        };

                                                    });

                                                }}
                                            />

                                            {formData.cover_image && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => {

                                                        setFormData((prev) => {

                                                            if (!prev) return prev;

                                                            return {
                                                                ...prev,
                                                                cover_image: null
                                                            };

                                                        });

                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            )}

                                        </div>

                                        {/* Old Cover */}
                                        {formData.cover && (
                                            <div className="mt-3">

                                                <small className="text-muted d-block mb-2">
                                                    Current Cover
                                                </small>

                                                <img
                                                    src={`http://localhost/library-management-api/${formData.cover}`}
                                                    alt="Current Book Cover"
                                                    className="rounded border"
                                                    width="120"
                                                    height="160"
                                                    style={{
                                                        objectFit: "cover"
                                                    }}
                                                />

                                            </div>
                                        )}

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