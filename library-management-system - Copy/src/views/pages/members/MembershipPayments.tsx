import { useState } from "react";
import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading";

function MembershipPayments() {

    const [showPayModal, setShowPayModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<{ id: number } | null>(null);

    const [payments, setPayments] = useState([
        {
            id: 1,
            memberId: 1,
            memberCode: "MEM-0001",
            memberName: "Ruksana Nourin",
            membershipType: "Regular",
            registrationDate: "2026-08-01",
            fee: 500,
            status: "Paid"
        },
        {
            id: 2,
            memberId: 2,
            memberCode: "MEM-0002",
            memberName: "Nusrat Jahan",
            membershipType: "Premium",
            registrationDate: "2026-08-03",
            fee: 1000,
            status: "Paid"
        },
        {
            id: 3,
            memberId: 3,
            memberCode: "MEM-0003",
            memberName: "Sadia Rahman",
            membershipType: "Regular",
            registrationDate: "2026-08-05",
            fee: 500,
            status: "Unpaid"
        },
        {
            id: 4,
            memberId: 4,
            memberCode: "MEM-0004",
            memberName: "Ayesha Rahman",
            membershipType: "Regular",
            registrationDate: "2026-08-07",
            fee: 500,
            status: "Unpaid"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    const handlePayment = (id: number) => {

        setPayments((currentPayments) =>
            currentPayments.map((payment) =>
                payment.id === id
                    ? {
                        ...payment,
                        status: "Paid"
                    }
                    : payment
            )
        );
    };

    const filteredPayments = payments.filter((payment) =>
        payment.memberName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||

        payment.memberCode
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const totalPaid = payments
        .filter((payment) => payment.status === "Paid")
        .reduce((total, payment) => total + payment.fee, 0);

    const totalUnpaid = payments
        .filter((payment) => payment.status === "Unpaid")
        .reduce((total, payment) => total + payment.fee, 0);

    const confirmPayment = () => {

        if (!selectedPayment) return;

        handlePayment(selectedPayment.id);

        setShowPayModal(false);
        setSelectedPayment(null);
    };

    return (
        <main className="dashboard-content">

            <div className="container-fluid">

                <PageHeading
                    icon="cash-coin"
                    subtitle="Members"
                    title="Membership Payments"
                    desc="Manage member registration fees and payments"
                >
                    <Link
                        to="/members"
                        className="btn btn-sm btn-outline-secondary"
                    >
                        <i className="bi bi-arrow-left me-1"></i>
                        Members
                    </Link>
                </PageHeading>


                {/* Summary Cards */}
                <div className="row g-3 mt-1">

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <div className="text-muted small">
                                    Total Payments
                                </div>

                                <div className="fs-3 fw-bold mt-1">
                                    ৳{totalPaid + totalUnpaid}
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <div className="text-muted small">
                                    Paid
                                </div>

                                <div className="fs-3 fw-bold text-success mt-1">
                                    ৳{totalPaid}
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <div className="text-muted small">
                                    Unpaid
                                </div>

                                <div className="fs-3 fw-bold text-danger mt-1">
                                    ৳{totalUnpaid}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Search */}
                <div className="card border-0 shadow-sm mt-4">

                    <div className="card-body">

                        <label className="form-label">
                            Search Member
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by member name or member code..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>

                </div>


                {/* Payment Table */}
                <div className="card border-0 shadow-sm mt-4 mb-4">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table align-middle text-nowrap mb-0">

                                <thead>

                                    <tr>
                                        <th>Member</th>
                                        <th>Membership Type</th>
                                        <th>Registration Date</th>
                                        <th>Fee</th>
                                        <th>Status</th>
                                        <th className="text-end">
                                            Action
                                        </th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredPayments.length > 0 ? (

                                        filteredPayments.map((payment) => (

                                            <tr key={payment.id}>

                                                <td>

                                                    <div className="fw-semibold">
                                                        {payment.memberName}
                                                    </div>

                                                    <small className="text-muted">
                                                        {payment.memberCode}
                                                    </small>

                                                </td>

                                                <td>
                                                    {payment.membershipType}
                                                </td>

                                                <td>
                                                    {payment.registrationDate}
                                                </td>

                                                <td>

                                                    <span className="fw-semibold">
                                                        ৳{payment.fee}
                                                    </span>

                                                </td>

                                                <td>

                                                    {payment.status === "Paid" ? (

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

                                                    <Link
                                                        to={`/member/${payment.memberId}`}
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                        title="View Member"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </Link>

                                                    {payment.status === "Unpaid" && (

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => {
                                                                setSelectedPayment(payment);
                                                                setShowPayModal(true);
                                                            }}
                                                        >
                                                            <i className="bi bi-cash-coin me-1"></i>
                                                            Pay
                                                        </button>

                                                    )}

                                                    {payment.status === "Paid" && (

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
                                                colSpan={6}
                                                className="text-center py-5"
                                            >
                                                No payment records found.
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
            {showPayModal && (
    <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
    >
        <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content bg-secondary-subtle">

                <div className="modal-header">

                    <h5 className="modal-title">
                        Confirm Payment
                    </h5>

                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => {
                            setShowPayModal(false);
                            setSelectedPayment(null);
                        }}
                    ></button>

                </div>

                <div className="modal-body">

                    <div className="text-center">

                        <i className="bi bi-question-circle text-warning fs-1"></i>

                        <h5 className="mt-3">
                            Confirm Payment?
                        </h5>

                        <p className="text-muted mb-0">
                            Are you sure you want to mark this
                            membership payment as paid?
                        </p>

                    </div>

                </div>

                <div className="modal-footer">

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                            setShowPayModal(false);
                            setSelectedPayment(null);
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={confirmPayment}
                    >
                        <i className="bi bi-check-lg me-1"></i>
                        Confirm Payment
                    </button>

                </div>

            </div>

        </div>
    </div>
)}

        </main>
    );
}

export default MembershipPayments;