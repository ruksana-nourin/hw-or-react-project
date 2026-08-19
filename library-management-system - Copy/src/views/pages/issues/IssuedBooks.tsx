import { Link } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Issue } from "../../../interfaces/Issue";

function IssuedBooks() {

    const [searchTerm, setSearchTerm] = useState("");

    const issues: Issue[] = [
        {
            id: 1,
            issueCode: "ISS-0001",

            memberId: 1,
            memberCode: "MEM-0001",
            memberName: "Ruksana Nourin",

            bookId: 1,
            bookTitle: "Clean Code",
            isbn: "9780132350884",

            issueDate: "2026-08-10",
            dueDate: "2026-08-17",
            returnDate: "",

            status: "Issued",

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

            issueDate: "2026-08-08",
            dueDate: "2026-08-15",
            returnDate: "",

            status: "Issued",

            fineAmount: 0,
            fineStatus: "No Fine"
        }
    ];

    const filteredIssues = issues.filter((issue) =>
        issue.issueCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.memberCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.isbn.includes(searchTerm)
    );

    return (
        <>
            <main className="dashboard-content">
        <div className="container-fluid">

            <PageHeading
                icon="journals"
                subtitle="Circulation"
                title="Issued Books"
                desc="Manage books currently issued to members"
            >
                <Link
                    className="btn btn-sm btn-primary"
                    to="/issues"
                >
                    <i className="bi bi-journal-plus me-1"></i>
                    Issue Book
                </Link>
            </PageHeading>

            {/* Search */}
            <div className="card shadow-sm border-0 mt-4">

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-12 col-md-6">

                            <label className="form-label">
                                Search Issued Books
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

            {/* Issued Books Table */}
            <div className="card shadow-sm border-0 mt-4">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table align-middle text-nowrap">

                            <thead>

                                <tr>
                                    <th>Issue Code</th>
                                    <th>Member</th>
                                    <th>Book</th>
                                    <th>Issue Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th className="text-end">
                                        Action
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredIssues.length > 0 ? (

                                    filteredIssues.map((issue) => (

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
                                                {issue.issueDate}
                                            </td>

                                            <td>
                                                {issue.dueDate}
                                            </td>

                                            <td>

                                                <span className="badge bg-primary">
                                                    {issue.status}
                                                </span>

                                            </td>

                                            <td className="text-end">

                                                <Link
                                                    to={`/issue/${issue.id}`}
                                                    className="btn btn-sm btn-outline-primary me-1"
                                                    title="View"
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </Link>

                                                <Link
                                                    to={`/issue/${issue.id}/return`}
                                                    className="btn btn-sm btn-outline-success"
                                                    title="Return Book"
                                                >
                                                    <i className="bi bi-arrow-return-left"></i>
                                                </Link>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="text-center py-5"
                                        >
                                            No issued books found.
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

export default IssuedBooks;