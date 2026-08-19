import { Link, useParams } from "react-router";
import PageHeading from "../../../components/PageHeading";
import type { Member } from "../../../interfaces/Member";

function ViewMember() {

    const { id } = useParams();

    const members: Member[] = [
        {
            id: 1,
            memberCode: "MEM-0001",
            name: "Ruksana Nourin",
            email: "ruksana@example.com",
            phone: "01700000001",
            address: "Dhaka, Bangladesh",
            membershipType: "Regular",
            registrationFee: 500,
            paymentStatus: "Paid",
            registrationDate: "2026-08-01",
            status: "Active"
        },
        {
            id: 2,
            memberCode: "MEM-0002",
            name: "Nusrat Jahan",
            email: "nusrat@example.com",
            phone: "01700000002",
            address: "Sylhet, Bangladesh",
            membershipType: "Premium",
            registrationFee: 1000,
            paymentStatus: "Paid",
            registrationDate: "2026-08-03",
            status: "Active"
        },
        {
            id: 3,
            memberCode: "MEM-0003",
            name: "Sadia Rahman",
            email: "sadia@example.com",
            phone: "01700000003",
            address: "Chittagong, Bangladesh",
            membershipType: "Regular",
            registrationFee: 500,
            paymentStatus: "Unpaid",
            registrationDate: "2026-08-05",
            status: "Inactive"
        }
    ];

    const member = members.find(
        (member) => member.id === Number(id)
    );

    /*
     * Frontend demo data
     * Later these will come from PHP + MySQL.
     */
    const issuedBooks = [
        {
            id: 1,
            memberId: 1,
            bookTitle: "Clean Code",
            isbn: "9780132350884",
            issueDate: "2026-08-01",
            dueDate: "2026-08-08",
            status: "Issued"
        },
        {
            id: 2,
            memberId: 1,
            bookTitle: "Atomic Habits",
            isbn: "9780735211292",
            issueDate: "2026-08-03",
            dueDate: "2026-08-10",
            status: "Issued"
        },
        {
            id: 3,
            memberId: 2,
            bookTitle: "The Pragmatic Programmer",
            isbn: "9780135957059",
            issueDate: "2026-08-02",
            dueDate: "2026-08-09",
            status: "Issued"
        }
    ];

    const fineHistory = [
        {
            id: 1,
            memberId: 1,
            bookTitle: "Atomic Habits",
            fineAmount: 30,
            returnDate: "2026-08-10",
            status: "Paid"
        },
        {
            id: 2,
            memberId: 1,
            bookTitle: "Clean Code",
            fineAmount: 20,
            returnDate: "2026-08-12",
            status: "Unpaid"
        },
        {
            id: 3,
            memberId: 2,
            bookTitle: "The Pragmatic Programmer",
            fineAmount: 40,
            returnDate: "2026-08-12",
            status: "Paid"
        }
    ];

    const memberIssuedBooks = issuedBooks.filter(
        (book) => book.memberId === Number(id)
    );

    const memberFineHistory = fineHistory.filter(
        (fine) => fine.memberId === Number(id)
    );

    if (!member) {
        return (
            <>
                <main className="dashboard-content">

                    <div className="container-fluid">

                        <PageHeading
                            icon="person-x"
                            subtitle="Members"
                            title="Member Not Found"
                            desc="The requested member could not be found."
                        >
                            <Link
                                className="btn btn-sm btn-outline-secondary"
                                to="/members"
                            >
                                <i className="bi bi-arrow-left me-1"></i>
                                Back to Members
                            </Link>
                        </PageHeading>

                        <div className="card shadow-sm border-0 mt-4">

                            <div className="card-body text-center py-5">

                                <i
                                    className="bi bi-person-x fs-1 text-muted"
                                    aria-hidden="true"
                                ></i>

                                <h4 className="mt-3">
                                    Member not found
                                </h4>

                                <p className="text-muted">
                                    No member exists with ID {id}.
                                </p>

                                <Link
                                    to="/members"
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-arrow-left me-1"></i>
                                    Back to Members
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
                        icon="person"
                        subtitle="Members"
                        title="Member Details"
                        desc={`View information about ${member.name}`}
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to="/members"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Members
                        </Link>
                    </PageHeading>

                    {/* Member Information + Registration Payment */}
                    <div className="row g-4 mt-1">

                        {/* Member Information */}
                        <div className="col-12 col-lg-8">

                            <div className="card shadow-sm border-0 h-100">

                                <div className="card-body">

                                    <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-3 mb-4">

                                        <div
                                            className="rounded-circle bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                                            style={{
                                                width: "100px",
                                                height: "100px"
                                            }}
                                        >
                                            <i
                                                className="bi bi-person fs-1 text-primary"
                                                aria-hidden="true"
                                            ></i>
                                        </div>

                                        <div className="text-center text-sm-start">

                                            <h3 className="fw-bold mb-1">
                                                {member.name}
                                            </h3>

                                            <div className="text-muted">
                                                {member.memberCode}
                                            </div>

                                            <span
                                                className={
                                                    member.status === "Active"
                                                        ? "badge bg-success mt-2"
                                                        : "badge bg-secondary mt-2"
                                                }
                                            >
                                                {member.status}
                                            </span>

                                        </div>

                                    </div>

                                    <hr />

                                    <div className="row g-4 mt-1">

                                        <div className="col-12 col-md-6">

                                            <div className="text-muted small">
                                                Email
                                            </div>

                                            <div className="fw-semibold">
                                                {member.email}
                                            </div>

                                        </div>

                                        <div className="col-12 col-md-6">

                                            <div className="text-muted small">
                                                Phone
                                            </div>

                                            <div className="fw-semibold">
                                                {member.phone}
                                            </div>

                                        </div>

                                        <div className="col-12 col-md-6">

                                            <div className="text-muted small">
                                                Membership Type
                                            </div>

                                            <div className="fw-semibold">
                                                {member.membershipType}
                                            </div>

                                        </div>

                                        <div className="col-12 col-md-6">

                                            <div className="text-muted small">
                                                Registration Date
                                            </div>

                                            <div className="fw-semibold">
                                                {member.registrationDate}
                                            </div>

                                        </div>

                                        <div className="col-12">

                                            <div className="text-muted small">
                                                Address
                                            </div>

                                            <div className="fw-semibold">
                                                {member.address}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Registration Payment */}
                        <div className="col-12 col-lg-4">

                            <div className="card shadow-sm border-0 h-100">

                                <div className="card-body">

                                    <h5 className="fw-bold mb-4">
                                        Registration Payment
                                    </h5>

                                    <div className="mb-4">

                                        <div className="text-muted small">
                                            Registration Fee
                                        </div>

                                        <div className="fs-3 fw-bold">
                                            ৳{member.registrationFee}
                                        </div>

                                    </div>

                                    <div className="mb-4">

                                        <div className="text-muted small mb-1">
                                            Payment Status
                                        </div>

                                        <span
                                            className={
                                                member.paymentStatus === "Paid"
                                                    ? "badge bg-success"
                                                    : member.paymentStatus === "Partial"
                                                        ? "badge bg-warning text-dark"
                                                        : "badge bg-danger"
                                            }
                                        >
                                            {member.paymentStatus}
                                        </span>

                                    </div>

                                    <hr />

                                    <div className="d-flex flex-column gap-2 mt-4">

                                        <Link
                                            to={`/member/${member.id}/edit`}
                                            className="btn btn-primary"
                                        >
                                            <i className="bi bi-pencil me-1"></i>
                                            Edit Member
                                        </Link>

                                        <Link
                                            to="/members"
                                            className="btn btn-light"
                                        >
                                            Back to Members
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Currently Issued Books */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Currently Issued Books
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Books currently borrowed by this member
                                    </p>
                                </div>

                                <span className="badge bg-primary">
                                    {memberIssuedBooks.length} Book
                                    {memberIssuedBooks.length !== 1 ? "s" : ""}
                                </span>

                            </div>

                            {memberIssuedBooks.length > 0 ? (

                                <div className="table-responsive">

                                    <table className="table align-middle text-nowrap mb-0">

                                        <thead>

                                            <tr>
                                                <th>Book</th>
                                                <th>ISBN</th>
                                                <th>Issue Date</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {memberIssuedBooks.map((book) => (

                                                <tr key={book.id}>

                                                    <td>
                                                        <div className="fw-semibold">
                                                            {book.bookTitle}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {book.isbn}
                                                    </td>

                                                    <td>
                                                        {book.issueDate}
                                                    </td>

                                                    <td>
                                                        {book.dueDate}
                                                    </td>

                                                    <td>
                                                        <span className="badge bg-primary">
                                                            {book.status}
                                                        </span>
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            ) : (

                                <div className="text-center py-5">

                                    <i
                                        className="bi bi-book fs-1 text-muted"
                                        aria-hidden="true"
                                    ></i>

                                    <p className="text-muted mt-2 mb-0">
                                        This member currently has no issued books.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* Fine History */}
                    <div className="card shadow-sm border-0 mt-4 mb-4">

                        <div className="card-body">

                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Fine History
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Previous fines and payment status
                                    </p>
                                </div>

                                <span className="badge bg-secondary">
                                    {memberFineHistory.length} Record
                                    {memberFineHistory.length !== 1 ? "s" : ""}
                                </span>

                            </div>

                            {memberFineHistory.length > 0 ? (

                                <div className="table-responsive">

                                    <table className="table align-middle text-nowrap mb-0">

                                        <thead>

                                            <tr>
                                                <th>Book</th>
                                                <th>Return Date</th>
                                                <th>Fine Amount</th>
                                                <th>Payment Status</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {memberFineHistory.map((fine) => (

                                                <tr key={fine.id}>

                                                    <td>
                                                        <div className="fw-semibold">
                                                            {fine.bookTitle}
                                                        </div>
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

                                                        {fine.status === "Paid" ? (

                                                            <span className="badge bg-success">
                                                                Paid
                                                            </span>

                                                        ) : (

                                                            <span className="badge bg-danger">
                                                                Unpaid
                                                            </span>

                                                        )}

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            ) : (

                                <div className="text-center py-5">

                                    <i
                                        className="bi bi-cash-stack fs-1 text-muted"
                                        aria-hidden="true"
                                    ></i>

                                    <p className="text-muted mt-2 mb-0">
                                        No fine history available for this member.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </main>
        </>
    );
}

export default ViewMember;