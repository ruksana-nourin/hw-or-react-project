import { Link } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Issue } from "../../../interfaces/Issue";

function IssueBook() {

    const [formData, setFormData] = useState<
        Omit<Issue, "id">
    >({
        issueCode: "ISS-0001",

        memberId: 0,
        memberCode: "",
        memberName: "",

        bookId: 0,
        bookTitle: "",
        isbn: "",

        issueDate: new Date().toISOString().split("T")[0],

        dueDate: "",

        returnDate: "",

        status: "Issued",

        fineAmount: 0,

        fineStatus: "No Fine"
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement
        >
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "memberId" ||
                    name === "bookId"
                    ? Number(value)
                    : value
        }));
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        console.log("Book Issue:", formData);
    };

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid">

                    <PageHeading
                        icon="journal-plus"
                        subtitle="Circulation"
                        title="Issue Book"
                        desc="Issue a book to a library member"
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to="/issued-books"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Issued Books
                        </Link>
                    </PageHeading>

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    {/* Issue Code */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Issue Code
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="issueCode"
                                            value={formData.issueCode}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Issue Date */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Issue Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            name="issueDate"
                                            value={formData.issueDate}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Member */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Member
                                        </label>

                                        <select
                                            className="form-select"
                                            name="memberId"
                                            value={formData.memberId}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value={0}>
                                                Select Member
                                            </option>

                                            <option value={1}>
                                                MEM-0001 - Ruksana Nourin
                                            </option>

                                            <option value={2}>
                                                MEM-0002 - Nusrat Jahan
                                            </option>

                                            <option value={3}>
                                                MEM-0003 - Sadia Rahman
                                            </option>

                                        </select>

                                    </div>

                                    {/* Book */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Book
                                        </label>

                                        <select
                                            className="form-select"
                                            name="bookId"
                                            value={formData.bookId}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value={0}>
                                                Select Book
                                            </option>

                                            <option value={1}>
                                                Clean Code
                                            </option>

                                            <option value={2}>
                                                Atomic Habits
                                            </option>

                                        </select>

                                    </div>

                                    {/* Due Date */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Due Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            name="dueDate"
                                            value={formData.dueDate}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Status */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Status
                                        </label>

                                        <select
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >

                                            <option value="Issued">
                                                Issued
                                            </option>

                                            <option value="Returned">
                                                Returned
                                            </option>

                                            <option value="Late">
                                                Late
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <hr className="my-4" />

                                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

                                    <Link
                                        to="/issued-books"
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-journal-plus me-1"></i>
                                        Issue Book
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            </main>
        </>
    );
}

export default IssueBook;