import { Link, useParams } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Member } from "../../../interfaces/Member";

function EditMember() {

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

    const [formData, setFormData] = useState<Member | null>(
        member || null
    );

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => {

            if (!prev) return prev;

            return {
                ...prev,
                [name]:
                    name === "registrationFee"
                        ? Number(value)
                        : value
            };
        });
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        console.log("Member ID:", id);
        console.log("Updated Member:", formData);
    };

    if (!formData) {
        return (
            <div className="container-fluid">

                <PageHeading
                    icon="person-x"
                    subtitle="Members"
                    title="Edit Member"
                    desc="Member not found"
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
        );
    }

    return (
        <>
            <main className="dashboard-content">


                <div className="container-fluid">

                    <PageHeading
                        icon="person-gear"
                        subtitle="Members"
                        title="Edit Member"
                        desc={`Update information for ${formData.name}`}
                    >
                        <Link
                            className="btn btn-sm btn-outline-secondary"
                            to={`/member/${formData.id}`}
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Member
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
                                            value={formData.memberCode}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Name */}
                                    <div className="col-12 col-md-6">

                                        <label className="form-label">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
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
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>

                                    </div>

                                    {/* Member Status */}
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
                                        to={`/member/${formData.id}`}
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-check-lg me-1"></i>
                                        Update Member
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

export default EditMember;