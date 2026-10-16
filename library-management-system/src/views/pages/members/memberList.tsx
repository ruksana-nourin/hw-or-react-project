import { Link } from "react-router";
import { useState, useEffect } from "react";
import PageHeading from "../../../components/PageHeading";
import type { Member } from "../../../interfaces/Member";
import { api } from "../../../config";

function MemberList() {

    const [members, setMembers] = useState<Member[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteMember, setDeleteMember] = useState<Member | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const getMembers = () => {

        api.get("members")
        .then((res) => {

            console.log("Members:", res.data);

            const mappedMembers: Member[] = res.data.map(
                (item: any) => ({

                    id: Number(item.id),

                    memberCode: item.member_code,

                    name: item.name,

                    email: item.email,

                    phone: item.phone,

                    address: "",

                    membershipType: "Regular",

                    registrationFee: 0,

                    paymentStatus: "Unpaid",

                    registrationDate: "",

                    status:
                        Number(item.status_id) === 1
                            ? "Active"
                            : "Inactive"
                })
            );

            setMembers(mappedMembers);

        })
        .catch((err) => {

            console.log(
                "Members Error:",
                err
            );

        });

    };
    useEffect(() => {

        getMembers();

    }, []);

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