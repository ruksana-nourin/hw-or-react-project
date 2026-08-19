import { Link, useNavigate } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Member } from "../../../interfaces/Member";

function AddMember() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<
        Omit<Member, "id">
    >({
        memberCode: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        membershipType: "Regular",
        registrationFee: 500,
        paymentStatus: "Unpaid",
        registrationDate: new Date().toISOString().split("T")[0],
        status: "Active"
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "registrationFee"
                    ? Number(value)
                    : value
        }));
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        console.log("New Member:", formData);

        navigate("/members");
    };

    return (
        <>
            <main className="dashboard-content">
                <div className="container-fluid">

                    <PageHeading
                        icon="person-plus"
                        subtitle="Members"
                        title="Register Member"
                        desc="Register a new library member"
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

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    {/* Member Code */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Member Code
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="memberCode"
                                            placeholder="Example: MEM-0004"
                                            value={formData.memberCode}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Member Name */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Enter member name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Email */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Enter email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Phone */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Phone
                                        </label>

                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Membership Type */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Membership Type
                                        </label>

                                        <select
                                            className="form-select"
                                            name="membershipType"
                                            value={formData.membershipType}
                                            onChange={handleChange}
                                        >
                                            <option value="Regular">
                                                Regular
                                            </option>

                                            <option value="Premium">
                                                Premium
                                            </option>
                                        </select>

                                    </div>

                                    {/* Registration Fee */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Registration Fee
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">
                                                ৳
                                            </span>

                                            <input
                                                type="number"
                                                className="form-control"
                                                name="registrationFee"
                                                min="0"
                                                value={formData.registrationFee}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>

                                    {/* Payment Status */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Payment Status
                                        </label>

                                        <select
                                            className="form-select"
                                            name="paymentStatus"
                                            value={formData.paymentStatus}
                                            onChange={handleChange}
                                        >
                                            <option value="Paid">
                                                Paid
                                            </option>

                                            <option value="Unpaid">
                                                Unpaid
                                            </option>

                                            <option value="Partial">
                                                Partial
                                            </option>
                                        </select>

                                    </div>

                                    {/* Registration Date */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Registration Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            name="registrationDate"
                                            value={formData.registrationDate}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Address */}
                                    <div className="col-12">

                                        <label className="form-label">
                                            Address
                                        </label>

                                        <textarea
                                            className="form-control"
                                            name="address"
                                            rows={4}
                                            placeholder="Enter member address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>

                                    </div>

                                    {/* Status */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Member Status
                                        </label>

                                        <select
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Active">
                                                Active
                                            </option>

                                            <option value="Inactive">
                                                Inactive
                                            </option>
                                        </select>

                                    </div>

                                </div>

                                <hr className="my-4" />

                                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

                                    <Link
                                        to="/members"
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-person-plus me-1"></i>
                                        Register Member
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

export default AddMember;