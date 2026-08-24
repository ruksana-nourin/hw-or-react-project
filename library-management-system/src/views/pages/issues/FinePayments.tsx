import { useEffect, useState } from "react";
import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading";
import type { Issue } from "../../../interfaces/Issue";
import { api } from "../../../config";

function FinePayments() {
    const [showFinePayModal, setShowFinePayModal] = useState(false);
    const [selectedFine, setSelectedFine] = useState<Issue | null>(null);


    const [fines, setFines] = useState<Issue[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [successMessage, setSuccessMessage] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);


    useEffect(
        () => {

            api.get("issues")
                .then((res) => {

                    console.log("Fine API Response:", res.data);

                    const data = res.data;

                    const fineRecords = data.filter(
                        (item: any) =>
                            Number(item.fine_amount) > 0
                    );

                    console.log(
                        "FINE RECORDS:",
                        fineRecords
                    );

                    const mappedFines: Issue[] =
                        fineRecords.map((item: any) => ({

                            id: Number(item.id),

                            issueCode: item.issue_code,

                            memberId:
                                Number(item.member_id),

                            memberCode:
                                item.member_code,

                            memberName:
                                item.member_name,

                            bookId:
                                Number(item.book_id),

                            bookTitle:
                                item.book_title,

                            isbn:
                                item.isbn,

                            issueDate:
                                item.issue_date,

                            dueDate:
                                item.due_date,

                            returnDate:
                                item.return_date || "",

                            status:
                                Number(item.status_id) === 3
                                    ? "Late"
                                    : Number(item.status_id) === 2
                                        ? "Returned"
                                        : "Issued",

                            fineAmount:
                                Number(item.fine_amount),

                            fineStatus:
                                item.payment_status_name === "Paid"
                                    ? "Paid"
                                    : item.payment_status_name === "Partial"
                                        ? "Partial"
                                        : "Unpaid"

                        }));

                    console.log(
                        "MAPPED FINE RECORDS:",
                        mappedFines
                    );

                    setFines(mappedFines);

                })
                .catch((err) => {

                    console.log(
                        "Fine API Error:",
                        err
                    );

                });

        }, []);

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

        api.post("fine-payment", {
            issueId: selectedFine.id,
            paidAmount: selectedFine.fineAmount,
            paymentDate: new Date().toISOString().split("T")[0],
            receivedBy: null,
            notes: "Fine payment"
        })
            .then((res) => {

                console.log("Payment Response:", res.data);

                if (res.data.success) {

                    handleFinePayment(selectedFine.id);

                    setShowFinePayModal(false);
                    setSelectedFine(null);

                    alert("Fine payment successful");

                } else {

                    alert(
                        res.data.message ||
                        "Fine payment failed"
                    );
                }

            })
            .catch((err) => {

                console.log("Payment Error:", err);

                alert("Failed to process fine payment");

            });
    };



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
                                                        ) : fine.fineStatus === "Partial" ? (
                                                            <span className="badge bg-warning text-dark">
                                                                Partial
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