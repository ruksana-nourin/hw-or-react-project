import { Link, useParams } from "react-router";
import PageHeading from "../../../components/PageHeading";
import type { Author } from "../../../interfaces/Author";

function ViewAuthor() {

    const { id } = useParams();

    const authors: Author[] = [
        {
            id: 1,
            name: "Robert C. Martin",
            email: "robert@example.com",
            phone: "+1 555-1001",
            booksCount: 12,
            status: "Active"
        },
        {
            id: 2,
            name: "James Clear",
            email: "james@example.com",
            phone: "+1 555-1002",
            booksCount: 8,
            status: "Active"
        },
        {
            id: 3,
            name: "J. K. Rowling",
            email: "jk@example.com",
            phone: "+1 555-1003",
            booksCount: 15,
            status: "Active"
        },
        {
            id: 4,
            name: "George Orwell",
            email: "george@example.com",
            phone: "+1 555-1004",
            booksCount: 7,
            status: "Inactive"
        }
    ];

    const author = authors.find(
        (author) => author.id === Number(id)
    );

    // Author not found
    if (!author) {
        return (
            <div className="container-fluid">

                <PageHeading
                    icon="person"
                    subtitle="Library"
                    title="Author Not Found"
                    desc="The requested author could not be found."
                >
                    <Link
                        className="btn btn-sm btn-outline-secondary"
                        to="/authors"
                    >
                        <i className="bi bi-arrow-left me-1"></i>
                        Back to Authors
                    </Link>
                </PageHeading>

                <div className="card shadow-sm border-0 mt-4">

                    <div className="card-body text-center py-5">

                        <i
                            className="bi bi-person-x fs-1 text-muted"
                            aria-hidden="true"
                        ></i>

                        <h4 className="mt-3">
                            Author not found
                        </h4>

                        <p className="text-muted">
                            No author exists with ID {id}.
                        </p>

                        <Link
                            to="/authors"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Authors
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
                        icon="person"
                        subtitle="Library"
                        title="Author Details"
                        desc={`View information about ${author.name}`}
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to="/authors"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Authors
                        </Link>
                    </PageHeading>

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="row g-4">

                                {/* Author Icon */}
                                <div className="col-md-3 text-center">

                                    <div
                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                                        style={{
                                            width: "140px",
                                            height: "140px"
                                        }}
                                    >
                                        <i
                                            className="bi bi-person fs-1 text-primary"
                                            aria-hidden="true"
                                        ></i>
                                    </div>

                                </div>

                                {/* Author Information */}
                                <div className="col-md-9">

                                    <h3 className="fw-bold mb-4">
                                        {author.name}
                                    </h3>

                                    <div className="row g-4">

                                        {/* Email */}
                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Email
                                            </div>

                                            <div className="fw-semibold">
                                                {author.email}
                                            </div>

                                        </div>

                                        {/* Phone */}
                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Phone
                                            </div>

                                            <div className="fw-semibold">
                                                {author.phone}
                                            </div>

                                        </div>

                                        {/* Books */}
                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Books in Library
                                            </div>

                                            <div className="fw-semibold">
                                                {author.booksCount}
                                            </div>

                                        </div>

                                        {/* Status */}
                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Status
                                            </div>

                                            <span
                                                className={
                                                    author.status === "Active"
                                                        ? "badge bg-success"
                                                        : "badge bg-secondary"
                                                }
                                            >
                                                {author.status}
                                            </span>

                                        </div>

                                    </div>

                                    <hr className="my-4" />

                                    <div className="d-flex gap-2">

                                        <Link
                                            to={`/author/${author.id}/edit`}
                                            className="btn btn-primary"
                                        >
                                            <i className="bi bi-pencil me-1"></i>
                                            Edit Author
                                        </Link>

                                        <Link
                                            to="/authors"
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
            </main>
        </>
    );
}

export default ViewAuthor;