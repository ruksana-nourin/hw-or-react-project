import { Link } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Member } from "../../../interfaces/Member";

function MemberList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [deleteMember, setDeleteMember] = useState<Member | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);



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

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.memberCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm)
    );

    const handleDeleteClick = (member: Member) => {
        setDeleteMember(member);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteMember) return;

        console.log("Delete member:", deleteMember);

        setShowDeleteModal(false);
        setDeleteMember(null);
    };



    return (
        <>
            <main className="dashboard-content">

                <div className="container-fluid">

                    <PageHeading
                        icon="people"
                        subtitle="Library"
                        title="Members"
                        desc="Manage library members"
                    >
                        <Link
                            className="btn btn-sm btn-primary"
                            to="/add-member"
                        >
                            <i className="bi bi-person-plus me-1"></i>
                            Register Member
                        </Link>
                    </PageHeading>

                    {/* Search */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="row g-3">

                                <div className="col-12 col-md-6">

                                    <label className="form-label">
                                        Search Members
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name, member code, email or phone..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Members Table */}
                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table align-middle text-nowrap">

                                    <thead>

                                        <tr>
                                            <th>Member</th>
                                            <th>Contact</th>
                                            <th>Membership</th>
                                            <th>Registration Fee</th>
                                            <th>Payment</th>
                                            <th>Status</th>
                                            <th className="text-end">
                                                Action
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredMembers.length > 0 ? (

                                            filteredMembers.map((member) => (

                                                <tr key={member.id}>

                                                    <td>

                                                        <div className="fw-semibold">
                                                            {member.name}
                                                        </div>

                                                        <small className="text-muted">
                                                            {member.memberCode}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <div>
                                                            {member.email}
                                                        </div>

                                                        <small className="text-muted">
                                                            {member.phone}
                                                        </small>

                                                    </td>

                                                    <td>
                                                        {member.membershipType}
                                                    </td>

                                                    <td>
                                                        ৳{member.registrationFee}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                member.paymentStatus === "Paid"
                                                                    ? "badge bg-success"
                                                                    : member.paymentStatus === "Partial"
                                                                        ? "badge bg-warning text-dark"
                                                                        : "badge bg-danger"
                                                            }
                                                        >
                                                            {member.paymentStatus}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                member.status === "Active"
                                                                    ? "badge bg-success"
                                                                    : "badge bg-secondary"
                                                            }
                                                        >
                                                            {member.status}
                                                        </span>

                                                    </td>

                                                    <td className="text-end">

                                                        <Link
                                                            to={`/member/${member.id}`}
                                                            className="btn btn-sm btn-outline-primary me-1"
                                                            title="View"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </Link>

                                                        <Link
                                                            to={`/member/${member.id}/edit`}
                                                            className="btn btn-sm btn-outline-secondary me-1"
                                                            title="Edit"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            title="Delete"
                                                            onClick={() => handleDeleteClick(member)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>



                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan={7}
                                                    className="text-center py-5"
                                                >
                                                    No members found.
                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>
                {showDeleteModal && deleteMember && (
                    <div
                        className="modal fade show d-block"
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5 className="modal-title">
                                        Delete Member
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => {
                                            setShowDeleteModal(false);
                                            setDeleteMember(null);
                                        }}
                                        aria-label="Close"
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <p className="mb-2">
                                        Are you sure you want to delete this member?
                                    </p>

                                    <div className="alert alert-warning mb-0">

                                        <strong>
                                            {deleteMember.name}
                                        </strong>

                                        <br />

                                        <small>
                                            {deleteMember.memberCode}
                                        </small>

                                        <br />

                                        {deleteMember.email}

                                    </div>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => {
                                            setShowDeleteModal(false);
                                            setDeleteMember(null);
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleDeleteConfirm}
                                    >
                                        <i className="bi bi-trash me-1"></i>
                                        Delete Member
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="modal-backdrop fade show"></div>
                )}

            </main>
        </>

    );
}

export default MemberList;