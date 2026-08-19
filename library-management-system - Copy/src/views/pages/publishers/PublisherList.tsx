import { Link } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Publisher } from "../../../interfaces/Publisher";

function PublisherList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [deletePublisher, setDeletePublisher] = useState<Publisher | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const filteredPublishers = publishers.filter((publisher) =>
        publisher.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        publisher.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (publisher: Publisher) => {
        setDeletePublisher(publisher);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!deletePublisher) return;

        console.log("Delete publisher:", deletePublisher);

        setShowDeleteModal(false);
        setDeletePublisher(null);
    };

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid">

                    <PageHeading
                        icon="building"
                        subtitle="Library"
                        title="Publishers"
                        desc="Manage all book publishers"
                    >
                        <Link
                            className="btn btn-sm btn-primary"
                            to="/add-publisher"
                        >
                            <i className="bi bi-plus-lg me-1"></i>
                            Add Publisher
                        </Link>
                    </PageHeading>

                    {/* Search */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Search Publishers
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name or email..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Publisher Table */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table align-middle">

                                    <thead>

                                        <tr>
                                            <th>ID</th>
                                            <th>Publisher</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Books</th>
                                            <th>Status</th>
                                            <th className="text-end">
                                                Action
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredPublishers.length > 0 ? (

                                            filteredPublishers.map((publisher) => (

                                                <tr key={publisher.id}>

                                                    <td>
                                                        #{publisher.id}
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {publisher.name}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {publisher.email}
                                                    </td>

                                                    <td>
                                                        {publisher.phone}
                                                    </td>

                                                    <td>
                                                        {publisher.booksCount}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                publisher.status === "Active"
                                                                    ? "badge bg-success"
                                                                    : "badge bg-secondary"
                                                            }
                                                        >
                                                            {publisher.status}
                                                        </span>

                                                    </td>

                                                    <td className="text-end">

                                                        <Link
                                                            to={`/publisher/${publisher.id}`}
                                                            className="btn btn-sm btn-outline-primary me-1"
                                                            title="View"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </Link>

                                                        <Link
                                                            to={`/publisher/${publisher.id}/edit`}
                                                            className="btn btn-sm btn-outline-secondary me-1"
                                                            title="Edit"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            title="Delete"
                                                            onClick={() => handleDeleteClick(publisher)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan={7}
                                                    className="text-center py-5"
                                                >
                                                    No publishers found.
                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>
            </main>
            {showDeleteModal && deletePublisher && (
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
                                    Delete Publisher
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeletePublisher(null);
                                    }}
                                    aria-label="Close"
                                ></button>

                            </div>

                            <div className="modal-body">

                                <p className="mb-2">
                                    Are you sure you want to delete this publisher?
                                </p>

                                <div className="alert alert-warning mb-0">

                                    <strong>
                                        {deletePublisher.name}
                                    </strong>

                                    <br />

                                    {deletePublisher.email}

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeletePublisher(null);
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
                                    Delete Publisher
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

export default PublisherList;