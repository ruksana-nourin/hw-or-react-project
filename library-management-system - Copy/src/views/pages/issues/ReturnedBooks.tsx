import { Link } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Issue } from "../../../interfaces/Issue";

function ReturnedBooks() {

    const [searchTerm, setSearchTerm] = useState("");

    const returnedBooks: Issue[] = [
        {
            id: 1,
            issueCode: "ISS-0001",

            memberId: 1,
            memberCode: "MEM-0001",
            memberName: "Ruksana Nourin",

            bookId: 1,
            bookTitle: "Clean Code",
            isbn: "9780132350884",

            issueDate: "2026-08-01",
            dueDate: "2026-08-08",
            returnDate: "2026-08-07",

            status: "Returned",

            fineAmount: 0,
            fineStatus: "No Fine"
        },
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
            id: 3,
            issueCode: "ISS-0003",

            memberId: 3,
            memberCode: "MEM-0003",
            memberName: "Sadia Rahman",

            bookId: 3,
            bookTitle: "The Pragmatic Programmer",
            isbn: "9780135957059",

            issueDate: "2026-07-20",
            dueDate: "2026-07-27",
            returnDate: "2026-07-27",

            status: "Returned",

            fineAmount: 0,
            fineStatus: "No Fine"
        }
    ];

    const filteredBooks = returnedBooks.filter((issue) =>
        issue.issueCode
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        issue.memberName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        issue.memberCode
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        issue.bookTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        issue.isbn.includes(searchTerm)
    );

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid">

                    <PageHeading
                        icon="journal-check"
                        subtitle="Circulation"
                        title="Returned Books"
                        desc="View returned books and fine information"
                    >
                        <Link
                            className="btn btn-sm btn-outline-primary"
                            to="/issued-books"
                        >
                            <i className="bi bi-journals me-1"></i>
                            Issued Books
                        </Link>
                    </PageHeading>

                    {/* Search */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="row g-3">

                                <div className="col-12 col-md-6">

                                    <label className="form-label">
                                        Search Returned Books
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by member, book, ISBN or issue code..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Returned Books */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table align-middle text-nowrap">

                                    <thead>

                                        <tr>
                                            <th>Issue Code</th>
                                            <th>Member</th>
                                            <th>Book</th>
                                            <th>Due Date</th>
                                            <th>Return Date</th>
                                            <th>Fine</th>
                                            <th>Payment</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredBooks.length > 0 ? (

                                            filteredBooks.map((issue) => (

                                                <tr key={issue.id}>

                                                    <td>
                                                        <span className="fw-semibold">
                                                            {issue.issueCode}
                                                        </span>
                                                    </td>

                                                    <td>

                                                        <div className="fw-semibold">
                                                            {issue.memberName}
                                                        </div>

                                                        <small className="text-muted">
                                                            {issue.memberCode}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <div className="fw-semibold">
                                                            {issue.bookTitle}
                                                        </div>

                                                        <small className="text-muted">
                                                            ISBN: {issue.isbn}
                                                        </small>

                                                    </td>

                                                    <td>
                                                        {issue.dueDate}
                                                    </td>

                                                    <td>
                                                        {issue.returnDate}
                                                    </td>

                                                    <td>

                                                        {issue.fineAmount > 0 ? (
                                                            <span className="fw-semibold text-danger">
                                                                ৳{issue.fineAmount}
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted">
                                                                ৳0
                                                            </span>
                                                        )}

                                                    </td>

                                                    <td>

                                                        {issue.fineStatus === "Paid" && (
                                                            <span className="badge bg-success">
                                                                Paid
                                                            </span>
                                                        )}

                                                        {issue.fineStatus === "Unpaid" && (
                                                            <span className="badge bg-danger">
                                                                Unpaid
                                                            </span>
                                                        )}

                                                        {issue.fineStatus === "No Fine" && (
                                                            <span className="badge bg-secondary">
                                                                No Fine
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
                                                    No returned books found.
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
        </>
    );
}

export default ReturnedBooks;