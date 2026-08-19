import { Link } from "react-router";
import PageHeading from "../../components/PageHeading";

function Dashboard() {

    // Dashboard mock data
    const dashboardStats = {
        totalBooks: 250,
        totalMembers: 120,
        issuedBooks: 45,
        totalFine: 2350,
    };

    // Recent book issues
    const recentIssues = [
        {
            id: 1,
            member: "Rani",
            book: "Clean Code",
            issueDate: "10 Aug 2026",
            dueDate: "17 Aug 2026",
            status: "Issued",
        },
        {
            id: 2,
            member: "Karim",
            book: "Atomic Habits",
            issueDate: "09 Aug 2026",
            dueDate: "16 Aug 2026",
            status: "Issued",
        },
        {
            id: 3,
            member: "Nadia",
            book: "JavaScript: The Good Parts",
            issueDate: "05 Aug 2026",
            dueDate: "12 Aug 2026",
            status: "Late",
        },
        {
            id: 4,
            member: "Sakib",
            book: "The Pragmatic Programmer",
            issueDate: "03 Aug 2026",
            dueDate: "10 Aug 2026",
            status: "Returned",
        },
    ];

    // Recent members
    const recentMembers = [
        {
            id: 1,
            name: "Rani",
            email: "rani@gmail.com",
            joinedDate: "10 Aug 2026",
            status: "Active",
        },
        {
            id: 2,
            name: "Karim",
            email: "karim@gmail.com",
            joinedDate: "09 Aug 2026",
            status: "Active",
        },
        {
            id: 3,
            name: "Nadia",
            email: "nadia@gmail.com",
            joinedDate: "07 Aug 2026",
            status: "Active",
        },
        {
            id: 4,
            name: "Sakib",
            email: "sakib@gmail.com",
            joinedDate: "05 Aug 2026",
            status: "Inactive",
        },
    ];

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
                        <div className="metric-value"> {dashboardStats.totalBooks}</div>
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
                        <div className="metric-value"> {dashboardStats.totalMembers}
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
                        <div className="metric-value"> {dashboardStats.issuedBooks}
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
                        <div className="metric-value"> ৳{dashboardStats.totalFine}
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
                                            {issue.member}
                                        </td>

                                        <td>
                                            {issue.book}
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
                                                    {member.joinedDate}
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
                                        Paid
                                    </span>
                                </div>

                                <strong className="text-success">
                                    ৳1,500
                                </strong>

                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <div>
                                    <span className="text-muted">
                                        Unpaid
                                    </span>
                                </div>

                                <strong className="text-warning">
                                    ৳850
                                </strong>

                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>
                                    <span className="text-muted">
                                        Overdue
                                    </span>
                                </div>

                                <strong className="text-danger">
                                    12
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