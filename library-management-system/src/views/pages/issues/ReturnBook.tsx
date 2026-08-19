import { Link, useParams } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Issue } from "../../../interfaces/Issue";

function ReturnBook() {

    const { id } = useParams();

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

    const issue = issues.find(
        (item) => item.id === Number(id)
    );

    const [returnDate, setReturnDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [fineAmount, setFineAmount] = useState(0);

    const [fineStatus, setFineStatus] = useState<
        "No Fine" | "Unpaid" | "Paid"
    >("No Fine");

    const calculateFine = (
        selectedReturnDate: string
    ) => {

        if (!issue) return;

        const due = new Date(issue.dueDate);
        const returned = new Date(selectedReturnDate);

        const difference =
            returned.getTime() - due.getTime();

        const lateDays = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

        if (lateDays > 0) {

            const dailyFine = 10;
            const totalFine = lateDays * dailyFine;

            setFineAmount(totalFine);
            setFineStatus("Unpaid");

        } else {

            setFineAmount(0);
            setFineStatus("No Fine");
        }
    };

    const handleReturnDateChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const value = e.target.value;

        setReturnDate(value);

        calculateFine(value);
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        console.log("Return Book:", {
            issue,
            returnDate,
            fineAmount,
            fineStatus
        });
    };

    if (!issue) {

        return (
            <>
                <main className="dashboard-content">
                    <div className="container-fluid">

                        <PageHeading
                            icon="journal-x"
                            subtitle="Circulation"
                            title="Issue Not Found"
                            desc="The requested issue record could not be found."
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

                            <div className="card-body text-center py-5">

                                <i
                                    className="bi bi-journal-x fs-1 text-muted"
                                    aria-hidden="true"
                                ></i>

                                <h4 className="mt-3">
                                    Issue record not found
                                </h4>

                                <Link
                                    to="/issued-books"
                                    className="btn btn-primary"
                                >
                                    Back to Issued Books
                                </Link>

                            </div>

                        </div>

                    </div>
                </main>
            </>
        );
    }

    return (
        <div className="container-fluid">

            <PageHeading
                icon="arrow-return-left"
                subtitle="Circulation"
                title="Return Book"
                desc={`Return ${issue.bookTitle}`}
            >
                <Link
                    className="btn btn-sm btn-outline-secondary"
                    to="/issued-books"
                >
                    <i className="bi bi-arrow-left me-1"></i>
                    Issued Books
                </Link>
            </PageHeading>

            <div className="row g-4 mt-1">

                {/* Issue Information */}
                <div className="col-12 col-lg-7">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h5 className="fw-bold mb-4">
                                Issue Information
                            </h5>

                            <div className="row g-4">

                                <div className="col-12 col-md-6">

                                    <div className="text-muted small">
                                        Issue Code
                                    </div>

                                    <div className="fw-semibold">
                                        {issue.issueCode}
                                    </div>

                                </div>

                                <div className="col-12 col-md-6">

                                    <div className="text-muted small">
                                        Member
                                    </div>

                                    <div className="fw-semibold">
                                        {issue.memberName}
                                    </div>

                                    <small className="text-muted">
                                        {issue.memberCode}
                                    </small>

                                </div>

                                <div className="col-12 col-md-6">

                                    <div className="text-muted small">
                                        Book
                                    </div>

                                    <div className="fw-semibold">
                                        {issue.bookTitle}
                                    </div>

                                    <small className="text-muted">
                                        ISBN: {issue.isbn}
                                    </small>

                                </div>

                                <div className="col-12 col-md-6">

                                    <div className="text-muted small">
                                        Issue Date
                                    </div>

                                    <div className="fw-semibold">
                                        {issue.issueDate}
                                    </div>

                                </div>

                                <div className="col-12 col-md-6">

                                    <div className="text-muted small">
                                        Due Date
                                    </div>

                                    <div className="fw-semibold">
                                        {issue.dueDate}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Return Information */}
                <div className="col-12 col-lg-5">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h5 className="fw-bold mb-4">
                                Return Information
                            </h5>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Return Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={returnDate}
                                        onChange={
                                            handleReturnDateChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Fine Amount
                                    </label>

                                    <div className="input-group">

                                        <span className="input-group-text">
                                            ৳
                                        </span>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={fineAmount}
                                            readOnly
                                        />

                                    </div>

                                    <small className="text-muted">
                                        Fine: ৳10 per late day
                                    </small>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Fine Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={fineStatus}
                                        onChange={(e) =>
                                            setFineStatus(
                                                e.target.value as
                                                "No Fine" |
                                                "Unpaid" |
                                                "Paid"
                                            )
                                        }
                                    >

                                        <option value="No Fine">
                                            No Fine
                                        </option>

                                        <option value="Unpaid">
                                            Unpaid
                                        </option>

                                        <option value="Paid">
                                            Paid
                                        </option>

                                    </select>

                                </div>

                                {fineAmount > 0 && (

                                    <div className="alert alert-warning">

                                        <i className="bi bi-exclamation-triangle me-2"></i>

                                        This book was returned late.

                                        <strong className="d-block mt-1">
                                            Fine: ৳{fineAmount}
                                        </strong>

                                    </div>

                                )}

                                {fineAmount === 0 && (

                                    <div className="alert alert-success">

                                        <i className="bi bi-check-circle me-2"></i>

                                        No late return fine.

                                    </div>

                                )}

                                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

                                    <Link
                                        to="/issued-books"
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        <i className="bi bi-arrow-return-left me-1"></i>
                                        Confirm Return
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ReturnBook;