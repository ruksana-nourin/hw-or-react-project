import { Link, useParams } from "react-router";
import PageHeading from "../../../components/PageHeading";
import type { Publisher } from "../../../interfaces/Publisher";

function ViewPublisher() {

    const { id } = useParams();

    const publishers: Publisher[] = [
        {
            id: 1,
            name: "Prentice Hall",
            email: "contact@prenticehall.com",
            phone: "+1 555-2001",
            address: "New York, USA",
            booksCount: 25,
            status: "Active"
        },
        {
            id: 2,
            name: "Avery",
            email: "contact@avery.com",
            phone: "+1 555-2002",
            address: "New York, USA",
            booksCount: 18,
            status: "Active"
        },
        {
            id: 3,
            name: "Penguin Books",
            email: "info@penguin.com",
            phone: "+1 555-2003",
            address: "London, UK",
            booksCount: 32,
            status: "Active"
        },
        {
            id: 4,
            name: "Oxford University Press",
            email: "info@oup.com",
            phone: "+1 555-2004",
            address: "Oxford, UK",
            booksCount: 20,
            status: "Inactive"
        }
    ];

    const publisher = publishers.find(
        (publisher) => publisher.id === Number(id)
    );

    if (!publisher) {
        return (
            <>
                <main className="dashboard-content">
                    <div className="container-fluid">

                        <PageHeading
                            icon="building"
                            subtitle="Library"
                            title="Publisher Not Found"
                            desc="The requested publisher could not be found."
                        >
                            <Link
                                className="btn btn-sm btn-outline-secondary"
                                to="/publishers"
                            >
                                <i className="bi bi-arrow-left me-1"></i>
                                Back to Publishers
                            </Link>
                        </PageHeading>

                        <div className="card shadow-sm border-0 mt-4">

                            <div className="card-body text-center py-5">

                                <i
                                    className="bi bi-building-x fs-1 text-muted"
                                    aria-hidden="true"
                                ></i>

                                <h4 className="mt-3">
                                    Publisher not found
                                </h4>

                                <p className="text-muted">
                                    No publisher exists with ID {id}.
                                </p>

                                <Link
                                    to="/publishers"
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-arrow-left me-1"></i>
                                    Back to Publishers
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
                        icon="building"
                        subtitle="Library"
                        title="Publisher Details"
                        desc={`View information about ${publisher.name}`}
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to="/publishers"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Publishers
                        </Link>
                    </PageHeading>

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="row g-4">

                                {/* Publisher Icon */}
                                <div className="col-md-3 text-center">

                                    <div
                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                                        style={{
                                            width: "140px",
                                            height: "140px"
                                        }}
                                    >
                                        <i
                                            className="bi bi-building fs-1 text-primary"
                                            aria-hidden="true"
                                        ></i>
                                    </div>

                                </div>

                                {/* Publisher Information */}
                                <div className="col-md-9">

                                    <h3 className="fw-bold mb-4">
                                        {publisher.name}
                                    </h3>

                                    <div className="row g-4">

                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Email
                                            </div>

                                            <div className="fw-semibold">
                                                {publisher.email}
                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Phone
                                            </div>

                                            <div className="fw-semibold">
                                                {publisher.phone}
                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Books in Library
                                            </div>

                                            <div className="fw-semibold">
                                                {publisher.booksCount}
                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="text-muted small">
                                                Status
                                            </div>

                                            <span
                                                className={
                                                    publisher.status === "Active"
                                                        ? "badge bg-success"
                                                        : "badge bg-secondary"
                                                }
                                            >
                                                {publisher.status}
                                            </span>

                                        </div>

                                        <div className="col-12">

                                            <div className="text-muted small">
                                                Address
                                            </div>

                                            <div className="fw-semibold">
                                                {publisher.address}
                                            </div>

                                        </div>

                                    </div>

                                    <hr className="my-4" />

                                    <div className="d-flex gap-2">

                                        <Link
                                            to={`/publisher/${publisher.id}/edit`}
                                            className="btn btn-primary"
                                        >
                                            <i className="bi bi-pencil me-1"></i>
                                            Edit Publisher
                                        </Link>

                                        <Link
                                            to="/publishers"
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

export default ViewPublisher;