import { useState } from "react";
import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading";
import type { Issue } from "../../../interfaces/Issue";

function FinePayments() {
    const [showFinePayModal, setShowFinePayModal] = useState(false);
    const [selectedFine, setSelectedFine] =
        useState<{ id: number } | null>(null);


    const [fines, setFines] = useState<Issue[]>([
        {
            id: 2,
            issueCode: "ISS-0002",

            memberId: 2,
            memberCode: "MEM-0002",
            memberName: "Nusrat Jahan",

            bookId: 2,
            bookTitle: "Atomic Habits",
            isbn: "9780735211292",

            issueDate: "2026-08-01",
            dueDate: "2026-08-07",
            returnDate: "2026-08-10",

            status: "Late",

            fineAmount: 30,
            fineStatus: "Unpaid"
        },

        {
            id: 4,
            issueCode: "ISS-0004",

            memberId: 4,
            memberCode: "MEM-0004",
            memberName: "Ayesha Rahman",

            bookId: 4,
            bookTitle: "JavaScript: The Good Parts",
            isbn: "9780596517748",

            issueDate: "2026-08-02",
            dueDate: "2026-08-08",
            returnDate: "2026-08-12",

            status: "Late",

            fineAmount: 40,
            fineStatus: "Unpaid"
        },

        {
            id: 5,
            issueCode: "ISS-0005",

            memberId: 5,
            memberCode: "MEM-0005",
            memberName: "Sadia Rahman",

            bookId: 5,
            bookTitle: "The Pragmatic Programmer",
            isbn: "9780135957059",

            issueDate: "2026-07-20",
            dueDate: "2026-07-27",
            returnDate: "2026-07-30",

            status: "Late",

            fineAmount: 30,
            fineStatus: "Paid"
        }
    ]);

    const handleFinePayment = (id: number) => {

        setFines((prevFines) =>
            prevFines.map((fine) =>
                fine.id === id
                    ? {
                        ...fine,
                        fineStatus: "Paid"
                    }
                    : fine
            )
        );
    };
    const confirmFinePayment = () => {

        if (!selectedFine) return;

        handleFinePayment(selectedFine.id);

        setShowFinePayModal(false);
        setSelectedFine(null);
    };

    const [searchTerm, setSearchTerm] = useState("");

    
    const filteredFines = fines.filter((fine) =>
        fine.memberName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||

        fine.memberCode
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||

        fine.bookTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||

        fine.issueCode
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid">

                    <PageHeading
                        icon="cash-coin"
                        subtitle="Circulation"
                        title="Fine Payments"
                        desc="Manage late return fines and payments"
                    >
                        <Link
                            className="btn btn-sm btn-outline-primary"
                            to="/returned-books"
                        >
                            <i className="bi bi-journal-check me-1"></i>
                            Returned Books
                        </Link>
                    </PageHeading>

                    {/* Search */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="row g-3">

                                <div className="col-12 col-md-6">

                                    <label className="form-label">
                                        Search Fine
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by member, book or issue code..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Fine Table */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table align-middle text-nowrap">

                                    <thead>

                                        <tr>
                                            <th>Issue Code</th>
                                            <th>Member</th>
                                            <th>Book</th>
                                            <th>Return Date</th>
                                            <th>Fine</th>
                                            <th>Status</th>
                                            <th className="text-end">
                                                Action
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredFines.length > 0 ? (

                                            filteredFines.map((fine) => (

                                                <tr key={fine.id}>

                                                    <td>
                                                        <span className="fw-semibold">
                                                            {fine.issueCode}
                                                        </span>
                                                    </td>

                                                    <td>

                                                        <div className="fw-semibold">
                                                            {fine.memberName}
                                                        </div>

                                                        <small className="text-muted">
                                                            {fine.memberCode}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <div className="fw-semibold">
                                                            {fine.bookTitle}
                                                        </div>

                                                        <small className="text-muted">
                                                            ISBN: {fine.isbn}
                                                        </small>

                                                    </td>

                                                    <td>
                                                        {fine.returnDate}
                                                    </td>

                                                    <td>

                                                        <span className="fw-semibold text-danger">
                                                            ৳{fine.fineAmount}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        {fine.fineStatus === "Paid" ? (

                                                            <span className="badge bg-success">
                                                                Paid
                                                            </span>

                                                        ) : (

                                                            <span className="badge bg-danger">
                                                                Unpaid
                                                            </span>

                                                        )}

                                                    </td>

                                                    <td className="text-end">

                                                        {fine.fineStatus === "Unpaid" ? (

                                                            <button
                                                                type="button"
                                                                className="btn btn-success"
                                                                onClick={() => {
                                                                    setSelectedFine(fine);
                                                                    setShowFinePayModal(true);
                                                                }}
                                                            >
                                                                <i className="bi bi-check-circle me-1"></i>
                                                                Pay Fine
                                                            </button>

                                                        ) : (

                                                            <span className="text-muted">
                                                                Paid
                                                            </span>

                                                        )}

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan={7}
                                                    className="text-center py-5"
                                                >
                                                    No fine records found.
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
            {showFinePayModal && (
                <>
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
                                        Confirm Fine Payment
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => {
                                            setShowFinePayModal(false);
                                            setSelectedFine(null);
                                        }}
                                    ></button>

                                </div>

                                <div className="modal-body text-center">

                                    <i className="bi bi-question-circle text-warning fs-1"></i>

                                    <h5 className="mt-3">
                                        Confirm Fine Payment?
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Are you sure you want to mark this
                                        fine payment as paid?
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            setShowFinePayModal(false);
                                            setSelectedFine(null);
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={confirmFinePayment}
                                    >
                                        <i className="bi bi-check-lg me-1"></i>
                                        Confirm Payment
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </>
    );
}

export default FinePayments;