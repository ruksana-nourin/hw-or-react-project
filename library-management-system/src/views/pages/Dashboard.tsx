import { Link } from "react-router";
import { useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading";
import { api } from "../../config";
import type { Issue } from "../../interfaces/Issue";
import type { Member } from "../../interfaces/Member";
function Dashboard() {
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalMembers, setTotalMembers] = useState(0);
    const [issuedBooks, setIssuedBooks] = useState(0);
    const [totalFine, setTotalFine] = useState(0);
    const [recentIssues, setRecentIssues] = useState<Issue[]>([]);
    const [recentMembers, setRecentMembers] = useState<Member[]>([]);
    const [paidFine, setPaidFine] = useState(0);
    const [unpaidFine, setUnpaidFine] = useState(0);
    const [lateReturns, setLateReturns] = useState(0);


    //books
    const getBooks = () => {

        api.get("books")
            .then((res) => {

                console.log("Books:", res.data);

                setTotalBooks(res.data.length);

            })
            .catch((err) => {

                console.log("Books Error:", err);

            });
    };
    //members
    const getMembers = () => {

        api.get("members")
            .then((res) => {

                console.log("Members:", res.data);

                const mappedMembers: Member[] = res.data.map(
                    (item: any) => ({

                        id: Number(item.id),

                        memberCode: item.member_code,

                        name: item.name,

                        email: item.email,

                        phone: item.phone,

                        status:
                            Number(item.status_id) === 1
                                ? "Active"
                                : "Inactive"

                    })
                );

                setTotalMembers(mappedMembers.length);

                setRecentMembers(
                    mappedMembers.slice(0, 5)
                );

            })
            .catch((err) => {

                console.log("Members Error:", err);

            });

    };
    //issued books
    const getIssues = () => {

        api.get("issues")
            .then((res) => {

                console.log("Issues:", res.data);

                const issues = res.data;

                const mappedIssues: Issue[] = issues.map(
                    (item: any) => ({

                        id: Number(item.id),

                        issueCode: item.issue_code,

                        memberId: Number(item.member_id),
                        memberCode: item.member_code,
                        memberName: item.member_name,

                        bookId: Number(item.book_id),
                        bookTitle: item.book_title,
                        isbn: item.isbn,

                        issueDate: item.issue_date,
                        dueDate: item.due_date,
                        returnDate: item.return_date || "",

                        status:
                            Number(item.status_id) === 2
                                ? "Returned"
                                : Number(item.status_id) === 3
                                    ? "Late"
                                    : "Issued",

                        fineAmount:
                            Number(item.fine_amount || 0),

                        fineStatus:
                            item.payment_status_name === "Paid"
                                ? "Paid"
                                : item.payment_status_name === "Partial"
                                    ? "Partial"
                                    : "Unpaid"
                    })
                );

                setRecentIssues(mappedIssues.slice(0, 5));

                const issued = issues.filter(
                    (item: any) =>
                        Number(item.status_id) === 1
                );

                const fine = issues.reduce(
                    (total: number, item: any) =>
                        total + Number(item.fine_amount || 0),
                    0
                );
                const paid = issues
                    .filter(
                        (item: any) =>
                            item.payment_status_name === "Paid"
                    )
                    .reduce(
                        (total: number, item: any) =>
                            total + Number(item.fine_amount || 0),
                        0
                    );

                const unpaid = issues
                    .filter(
                        (item: any) =>
                            item.payment_status_name === "Unpaid"
                    )
                    .reduce(
                        (total: number, item: any) =>
                            total + Number(item.fine_amount || 0),
                        0
                    );

                const late = issues.filter(
                    (item: any) =>
                        Number(item.status_id) === 3
                ).length;
                
                setIssuedBooks(issued.length);
                setTotalFine(fine);

                setPaidFine(paid);
                setUnpaidFine(unpaid);
                setLateReturns(late);


            })
            .catch((err) => {

                console.log("Issues Error:", err);

            });
    };
    //api calling
    useEffect(() => {

        getBooks();
        getMembers();
        getIssues();

    }, []);





    return (
        <>
            {/* Page Heading */}
            <PageHeading
                icon="speedometer2"
                subtitle="Overview"
                title="Dashboard"
                desc="Welcome to the Library Management System!"
            />


            {/* =========================
                SUMMARY CARDS
            ========================== */}
            <div className="row g-4 mb-4">

                {/* Total Books */}
                <div className="col-12 col-sm-6 col-xl-3">
                    <article className="metric-card metric-primary">
                        <div className="metric-top">
                            <span className="metric-label">Total Books</span>
                            <span className="metric-icon"><i className="bi bi-book" aria-hidden="true"></i></span>
                        </div>
                        <div className="metric-value"> {totalBooks}</div>
                        <div className="mt-3">
                            <Link
                                to="/books"
                                className="text-decoration-none small"
                            >
                                View all books
                                <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                        </div>
                    </article>
                </div>


                {/* Total Members */}
                <div className="col-12 col-sm-6 col-xl-3">
                    <article className="metric-card metric-success">
                        <div className="metric-top">
                            <span className="metric-label"> Total Members</span>
                            <span className="metric-icon">
                                <i className="bi bi-people fs-4 text-success"></i>

                            </span>
                        </div>
                        <div className="metric-value"> {totalMembers}
                        </div>
                        <div className="mt-3">
                            <Link to="/members" className="text-decoration-none small">
                                View all members
                                <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                        </div>
                    </article>
                </div>


                {/* Issued Books */}
                <div className="col-12 col-sm-6 col-xl-3">
                    <article className="metric-card metric-warning">
                        <div className="metric-top">
                            <span className="metric-label"> Issued Books
                            </span>
                            <span className="metric-icon">
                                <i className="bi bi-journal-arrow-up fs-4 text-warning"></i>

                            </span>
                        </div>
                        <div className="metric-value"> {issuedBooks}
                        </div>
                        <div className="mt-3">
                            <Link to="/issues" className="text-decoration-none small">
                                View issued books
                                <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                        </div>
                    </article>
                </div>


                {/* Total Fine */}
                <div className="col-12 col-sm-6 col-xl-3">
                    <article className="metric-card metric-danger">
                        <div className="metric-top">
                            <span className="metric-label"> Total Fine
                            </span>
                            <span className="metric-icon">
                                <i className="bi bi-cash-coin fs-4 text-danger"></i>


                            </span>
                        </div>
                        <div className="metric-value"> ৳{totalFine}
                        </div>
                        <div className="mt-3">
                            <Link to="/fine-payments" className="text-decoration-none small">
                                View fine payments
                                <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                        </div>
                    </article>
                </div>

            </div>


            {/* =========================
                QUICK ACTIONS
            ========================== */}
            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <h5 className="card-title mb-3">
                        Quick Actions
                    </h5>

                    <div className="row g-3">

                        <div className="col-12 col-sm-6 col-lg-3">
                            <Link
                                to="/add-book"
                                className="btn btn-outline-primary w-100 py-2"
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add Book
                            </Link>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <Link
                                to="/add-member"
                                className="btn btn-outline-success w-100 py-2"
                            >
                                <i className="bi bi-person-plus me-2"></i>
                                Register Member
                            </Link>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <Link
                                to="/issues"
                                className="btn btn-outline-warning w-100 py-2"
                            >
                                <i className="bi bi-journal-arrow-up me-2"></i>
                                Issue Book
                            </Link>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <Link
                                to="/membership-payments"
                                className="btn btn-outline-secondary w-100 py-2"
                            >
                                <i className="bi bi-credit-card me-2"></i>
                                Payments
                            </Link>
                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                RECENT ISSUES
            ========================== */}
            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="card-title mb-0">
                            Recent Book Issues
                        </h5>

                        <Link
                            to="/issues"
                            className="btn btn-sm btn-outline-primary"
                        >
                            View All
                        </Link>

                    </div>

                    <div className="table-responsive">

                        <table className="table align-middle mb-0">

                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Book</th>
                                    <th>Issue Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {recentIssues.map((issue) => (

                                    <tr key={issue.id}>

                                        <td>
                                            {issue.memberName}
                                        </td>

                                        <td>
                                            {issue.bookTitle}
                                        </td>

                                        <td>
                                            {issue.issueDate}
                                        </td>

                                        <td>
                                            {issue.dueDate}
                                        </td>

                                        <td>

                                            {issue.status === "Issued" && (
                                                <span className="badge text-bg-primary">
                                                    Issued
                                                </span>
                                            )}

                                            {issue.status === "Late" && (
                                                <span className="badge text-bg-danger">
                                                    Late
                                                </span>
                                            )}

                                            {issue.status === "Returned" && (
                                                <span className="badge text-bg-success">
                                                    Returned
                                                </span>
                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* =========================
                RECENT MEMBERS + FINE OVERVIEW
            ========================== */}
            <div className="row g-4">

                {/* Recent Members */}
                <div className="col-12 col-xl-8">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h5 className="card-title mb-0">
                                    Recent Members
                                </h5>

                                <Link
                                    to="/members"
                                    className="btn btn-sm btn-outline-primary"
                                >
                                    View All
                                </Link>

                            </div>

                            <div className="table-responsive">

                                <table className="table align-middle mb-0">

                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Joined Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {recentMembers.map((member) => (

                                            <tr key={member.id}>

                                                <td>
                                                    {member.name}
                                                </td>

                                                <td>
                                                    {member.email}
                                                </td>

                                                <td>
                                                    {member.registrationDate}
                                                </td>

                                                <td>

                                                    {member.status === "Active" ? (
                                                        <span className="badge text-bg-success">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="badge text-bg-secondary">
                                                            Inactive
                                                        </span>
                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Fine Overview */}
                <div className="col-12 col-xl-4">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <h5 className="card-title mb-4">
                                Fine Overview
                            </h5>

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <div>
                                    <span className="text-muted">
                                        Total
                                    </span>
                                </div>

                                <strong className="text-primary">
                                    ৳{totalFine}
                                </strong>

                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <div>
                                    <span className="text-muted">
                                        Paid
                                    </span>
                                </div>

                                <strong className="text-success">
                                    ৳{paidFine}
                                </strong>

                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <div>
                                    <span className="text-muted">
                                        Unpaid
                                    </span>
                                </div>

                                <strong className="text-warning">
                                    ৳{unpaidFine}
                                </strong>

                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>
                                    <span className="text-muted">
                                        Overdue
                                    </span>
                                </div>

                                <strong className="text-danger">
                                    {lateReturns}
                                </strong>

                            </div>

                            <Link
                                to="/fine-payments"
                                className="btn btn-outline-danger w-100"
                            >
                                <i className="bi bi-cash-coin me-2"></i>
                                Manage Fine Payments
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Dashboard;