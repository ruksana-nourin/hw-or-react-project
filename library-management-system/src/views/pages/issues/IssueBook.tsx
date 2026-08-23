import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Issue } from "../../../interfaces/Issue";
import { api } from "../../../config";
function IssueBook() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<
        Omit<Issue, "id">
    >({
        issueCode: "",

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
    const [errors, setErrors] = useState<any>({});
    const [msg, setMsg] = useState(false);
    const [success, setSuccess] = useState(false);
    const [books, setBooks] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [issueCode, setIssueCode] = useState("");

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

        let newErrors: any = {};


        if (formData.memberId == 0) {
            newErrors.memberId =
                "Member is required. Please select one";
        } else {
            newErrors.memberId = "";
        }

        if (formData.bookId == 0) {
            newErrors.bookId =
                "Book is required. Please select one";
        } else {
            newErrors.bookId = "";
        }

        if (formData.issueDate == "") {
            newErrors.issueDate = "Issue Date is required";
        } else {
            newErrors.issueDate = "";
        }

        if (formData.dueDate == "") {
            newErrors.dueDate = "Due Date is required";
        } else {
            newErrors.dueDate = "";
        }

        setErrors(newErrors);

        if (

            newErrors.memberId == "" &&
            newErrors.bookId == "" &&
            newErrors.issueDate == "" &&
            newErrors.dueDate == ""
        ) {

            const issueData = {
                issueCode: issueCode,
                memberId: formData.memberId,
                bookId: formData.bookId,
                issueDate: formData.issueDate,
                dueDate: formData.dueDate
            };

            console.log(issueData);

            api.post("issue-create", issueData)
                .then((res) => {

                    console.log("Create Response:", res);

                    if (res.status == 200 || res.status == 201) {

                        setMsg(true);
                        setSuccess(true);

                        setTimeout(() => {
                            navigate("/issued-books");
                        }, 1500);
                    }
                })
                .catch((err) => {

                    console.log("Create Error:", err);

                    setMsg(true);
                    setSuccess(false);
                });
        }
    };

    useEffect(() => {

        api.get("books")
            .then((res) => {
                console.log(res);
                setBooks(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        api.get("members")
            .then((res) => {
                console.log("Members:", res.data);
                setMembers(res.data);
            })
            .catch((err) => {
                console.log("Members Error:", err);
            });

    }, []);

    useEffect(() => {

        api.get("issue-code")
            .then((res) => {

                console.log(res);

                if (res.data.success) {
                    setIssueCode(res.data.issueCode);
                }

            })
            .catch((err) => {
                console.log(err);
            });


    }, []);

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
                            {msg && (
                                <div
                                    className={`alert ${success ? "alert-success" : "alert-danger"
                                        }`}
                                    role="alert"
                                >
                                    {success
                                        ? "Issue Book successfully created."
                                        : "Failed to issue book. Please try again."}
                                </div>
                            )}

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
                                            value={issueCode}
                                            readOnly
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

                                            {members.map((member) => (
                                                <option
                                                    key={member.id}
                                                    value={member.id}
                                                >
                                                    {member.member_code} - {member.name}
                                                </option>
                                            ))}

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

                                            {books
                                                .filter((book) => book.status === "Available")
                                                .map((book) => (
                                                    <option
                                                        key={book.id}
                                                        value={book.id}
                                                    >
                                                        {book.title} - {book.isbn}
                                                    </option>
                                                ))}

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