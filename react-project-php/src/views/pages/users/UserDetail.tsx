import { Link, useParams } from "react-router";
import Dash from "../../../assets/img/dasher-ui-bootstrap-5.jpg";
import PageHeading from "../../../components/PageHeading";
function UserDetail() {
    const { id } = useParams();
    return (
        <>
            <main className="dashboard-content">
                {/* <h1>{id}</h1> */}
                <div className="container-fluid px-3 px-lg-4 py-4">
                    <PageHeading
                        icon="person-lines-fill"
                        subtitle="Management"
                        title="User Details"
                        desc="Inspect account status, profile data, permissions, and recent activity."
                    >
                        <Link to="/add-user" className="btn btn-primary btn-sm">
                            <i className="bi bi-person-plus" aria-hidden="true"></i> Add User
                        </Link>
                        <Link to="/user" className="btn btn-outline-secondary btn-sm">
                            <i className="bi bi-person-plus" aria-hidden="true"></i> Back to Users
                        </Link>
                    </PageHeading>

                    <section className="row g-3">
                        <div className="col-12 col-xl-4">
                            <div className="panel h-100 text-center profile-card">
                                <div className="profile-cover"><img src={Dash} alt="User workspace preview" /></div>
                                <div className="profile-hero">
                                    <img className="avatar-img avatar-xl profile-photo" src="https://i.pravatar.cc/50?img=24" alt="Sarah Ahmed" />
                                    <h2 className="h5 mb-1">Sarah Ahmed</h2>
                                    <p className="text-muted mb-3">Senior Administrator</p>
                                    <span className="badge text-bg-success">Active Account</span>
                                </div>
                                <div className="info-list mt-4 text-start">
                                    <div><span>Email</span><strong>sarah@example.com</strong></div>
                                    <div><span>Phone</span><strong>+1 555 0184</strong></div>
                                    <div><span>Team</span><strong>Operations</strong></div>
                                    <div><span>Location</span><strong>New York, USA</strong></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-8">
                            <div className="panel mb-3">
                                <div className="panel-header">
                                    <div>
                                        <h2 className="h5 mb-1 section-title">
                                            <i className="bi bi-person-lines-fill" aria-hidden="true"></i><span>Account Overview</span>
                                        </h2>
                                        <p className="text-muted mb-0">
                                            Permissions, plan, and current access details.
                                        </p>
                                    </div>
                                    <Link to={`/user-edit/${id}`} className="btn btn-primary btn-sm" type="button">Edit User</Link>
                                </div>
                                <div className="row g-3">
                                    <div className="col-md-4"><div className="mini-card"><span>Role</span><strong>Admin</strong></div></div>
                                    <div className="col-md-4"><div className="mini-card"><span>Last Login</span><strong>Today</strong></div></div>
                                    <div className="col-md-4"><div className="mini-card"><span>Projects</span><strong>14 Active</strong></div></div>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-header"><div><h2 className="h5 mb-1 section-title"><i className="bi bi-clock-history" aria-hidden="true"></i><span>Recent Activity</span></h2><p className="text-muted mb-0">Latest security and workflow events.</p></div></div>
                                <div className="activity-list">
                                    <div className="activity-item"><span className="activity-dot bg-primary"></span><div><p className="mb-1 fw-semibold">Updated billing permissions</p><p className="text-muted small mb-0">2 hours ago</p></div></div>
                                    <div className="activity-item"><span className="activity-dot bg-success"></span><div><p className="mb-1 fw-semibold">Approved new teammate</p><p className="text-muted small mb-0">Yesterday</p></div></div>
                                    <div className="activity-item"><span className="activity-dot bg-warning"></span><div><p className="mb-1 fw-semibold">Changed password</p><p className="text-muted small mb-0">Apr 30, 2026</p></div></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default UserDetail;
