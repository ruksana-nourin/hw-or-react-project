import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading";

function Usercreate() {
  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
            <PageHeading
              icon="person-plus"
              subtitle="Management"
              title="Add User"
              desc="Create a new user account with role and team assignments."
            >


              <Link className="btn btn-outline-secondary btn-sm" to="/user">
                <i className="bi bi-arrow-left" aria-hidden="true"></i> Back to Users
              </Link>

            </PageHeading>

          <section className="row g-3">
            <div className="col-12 col-xl-12">
              <form className="panel needs-validation" noValidate>
                
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label" htmlFor="firstName">First name</label><input
                    className="form-control" id="firstName" type="text" required />
                    <div className="invalid-feedback">First name is required.</div>
                  </div>
                  <div className="col-md-6"><label className="form-label" htmlFor="lastName">Last name</label><input
                    className="form-control" id="lastName" type="text" required />
                    <div className="invalid-feedback">Last name is required.</div>
                  </div>
                  <div className="col-md-6"><label className="form-label" htmlFor="email">Email</label><input className="form-control"
                    id="email" type="email" required />
                    <div className="invalid-feedback">Enter a valid email.</div>
                  </div>
                  <div className="col-md-6"><label className="form-label" htmlFor="phone">Phone</label><input className="form-control"
                    id="phone" type="tel" required />
                    <div className="invalid-feedback">Phone number is required.</div>
                  </div>
                  <div className="col-md-6"><label className="form-label" htmlFor="role">Role</label><select className="form-select"
                    id="role" required>
                    <option value="">Choose role</option>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                    <div className="invalid-feedback">Choose a role.</div>
                  </div>
                  <div className="col-md-6"><label className="form-label" htmlFor="team">Team</label><select className="form-select"
                    id="team" required>
                    <option value="">Choose team</option>
                    <option>Operations</option>
                    <option>Sales</option>
                    <option>Content</option>
                    <option>Finance</option>
                  </select>
                    <div className="invalid-feedback">Choose a team.</div>
                  </div>
                  <div className="col-12"><label className="form-label" htmlFor="notes">Notes</label><textarea className="form-control"
                    id="notes" rows={4} placeholder="Optional onboarding notes"></textarea></div>
                </div>
                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                  <Link className="btn btn-outline-secondary"
                    to="/user">Back to User
                  </Link>
                  <button className="btn btn-primary" type="submit"><i
                    className="bi bi-person-check" aria-hidden="true"></i> Create User</button></div>
              </form>
            </div>

          </section>
        </div>
      </main>
    </>
  );
}

export default Usercreate;