import { Link } from "react-router";
import { useEffect, useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Issue } from "../../../interfaces/Issue";
import { api } from "../../../config";

function IssuedBooks() {

    const [searchTerm, setSearchTerm] = useState("");

    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {

        api.get("issues")
            .then((res) => {

                console.log(res);

                const data: Issue[] = res.data.map((item: any) => {

                    const fineAmount = Number(item.fine_amount);

                    let status: "Issued" | "Returned" | "Late";

                    if (item.status_id == "1") {
                        status = "Issued";
                    } else if (item.status_id == "2") {
                        status = "Returned";
                    } else {
                        status = "Late";
                    }

                    return {
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

                        status: status,

                        fineAmount: fineAmount,
                        fineStatus:
                            fineAmount > 0
                                ? "Unpaid"
                                : "No Fine"
                    };
                });

                setIssues(data);

            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

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

                                                        <span
                                                            className={`badge ${issue.status === "Returned"
                                                                    ? "bg-success"
                                                                    : issue.status === "Late"
                                                                        ? "bg-danger"
                                                                        : "bg-primary"
                                                                }`}
                                                        >
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