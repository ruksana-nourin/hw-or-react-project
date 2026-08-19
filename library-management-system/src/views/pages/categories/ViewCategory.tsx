import { Link, useParams } from "react-router";
import PageHeading from "../../../components/PageHeading";
import type { Category } from "../../../interfaces/Category";

function ViewCategory() {

    const { id } = useParams();

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

    const category = categories.find(
        (category) => category.id === Number(id)
    );

    if (!category) {
        return (
            <>
                <main className="dashboard-content">


                    <div className="container-fluid">

                        <PageHeading
                            icon="tags"
                            subtitle="Library"
                            title="Category Not Found"
                            desc="The requested category could not be found."
                        >
                            <Link
                                className="btn btn-sm btn-outline-secondary"
                                to="/categories"
                            >
                                <i className="bi bi-arrow-left me-1"></i>
                                Back to Categories
                            </Link>
                        </PageHeading>

                        <div className="card shadow-sm border-0 mt-4">

                            <div className="card-body text-center py-5">

                                <i
                                    className="bi bi-tags fs-1 text-muted"
                                    aria-hidden="true"
                                ></i>

                                <h4 className="mt-3">
                                    Category not found
                                </h4>

                                <p className="text-muted">
                                    No category exists with ID {id}.
                                </p>

                                <Link
                                    to="/categories"
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-arrow-left me-1"></i>
                                    Back to Categories
                                </Link>

                            </div>

                        </div>

                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <main className="dashboard-content">


                <div className="container-fluid">

                    <PageHeading
                        icon="tags"
                        subtitle="Library"
                        title="Category Details"
                        desc={`View information about ${category.name}`}
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to="/categories"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Categories
                        </Link>
                    </PageHeading>

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="row g-4">

                                {/* Category Icon */}
                                <div className="col-md-3 text-center">

                                    <div
                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                                        style={{
                                            width: "140px",
                                            height: "140px"
                                        }}
                                    >
                                        <i
                                            className="bi bi-tags fs-1 text-primary"
                                            aria-hidden="true"
                                        ></i>
                                    </div>

                                </div>

                                {/* Category Information */}
                                <div className="col-md-9">

                                    <h3 className="fw-bold mb-4">
                                        {category.name}
                                    </h3>

                                    <div className="row g-4">

                                        <div className="col-md-12">

                                            <div className="text-muted small">
                                                Description
                                            </div>

                                            <div className="fw-semibold">
                                                {category.description || "No description available."}
                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Books in Category
                                            </div>

                                            <div className="fw-semibold">
                                                {category.booksCount}
                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Status
                                            </div>

                                            <span
                                                className={
                                                    category.status === "Active"
                                                        ? "badge bg-success"
                                                        : "badge bg-secondary"
                                                }
                                            >
                                                {category.status}
                                            </span>

                                        </div>

                                    </div>

                                    <hr className="my-4" />

                                    <div className="d-flex gap-2">

                                        <Link
                                            to={`/category/${category.id}/edit`}
                                            className="btn btn-primary"
                                        >
                                            <i className="bi bi-pencil me-1"></i>
                                            Edit Category
                                        </Link>

                                        <Link
                                            to="/categories"
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

export default ViewCategory;