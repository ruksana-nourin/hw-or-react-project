import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading.tsx";
import { useEffect, useState } from "react";
import type { User } from "../../../interfaces/User.ts";
import { api } from "../../../config.ts";

function UserManage() {

  const [users, setUsers] = useState<User[]>([]);
  const [deleteItem, setDeleteItem] = useState({ id: 0, name: "" });
  // const [msg, setMsg] = useState(false);
  // const [success, setSuccess] = useState(false);
  const getUsers = () => {
    api.get("users")
      .then(res => {
        console.log(res.data);
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []
  );

  function handleDelete(id: number) {
    api.delete("user-delete?id=" + id)
      .then(res => {
        if(res.status==200){
          getUsers();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading icon="people" subtitle="Management" title="Users">
            <Link to="/user-create" className="btn btn-primary">
              <i className="bi bi-plus-lg me-1"></i> Add New
            </Link>
          </PageHeading>

          <section className="row g-3 mt-1" aria-label="User summary">
            <div className="col-12">
              <article className="metric-card metric-primary">
                <div className="metric-top">
                  <span className="metric-label">Total Users</span>
                  <span className="metric-icon"><i className="bi bi-people" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">{users.length}</div>
              </article>
            </div>


          </section>

          <section className="panel mt-3">
            <div className="table-responsive">
              <table className="table align-middle mb-0" id="usersTable" data-searchable-table="">
                <thead>
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col" className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item,index) => (
                    <tr key={item.id}>
                      <td>{index+1}</td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td><span className="badge text-bg-success">{item.role}</span></td>
                      <td>
                        <div className="d-flex gap-1 justify-content-end">
                          <Link
                            to={`/user-details/${item.id}`}
                            className="btn btn-sm btn-outline-success">
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/user-edit/${item.id}`}
                            className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              setDeleteItem({
                                id: Number(item.id),
                                name: item.name
                              })
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                          ><i className="bi bi-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
              <p className="text-muted small mb-0">Showing 1 to 5 of 124 users</p>
              <nav aria-label="Users pagination"><ul className="pagination pagination-sm mb-0"><li className="page-item disabled"><a className="page-link" href="#">Previous</a></li><li className="page-item active"><a className="page-link" href="#">1</a></li><li className="page-item"><a className="page-link" href="#">2</a></li><li className="page-item"><a className="page-link" href="#">Next</a></li></ul></nav>
            </div>
          </section>
        </div>
      </main>


      {/* Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete User
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body text-center">
              <div className="badge border border-danger fs-5 bg-danger"> User: {deleteItem.name}</div>
              <h3 className="text-center">Are you sure?</h3>
              <p className="mb-2 text-center">
                Do you want to delete this user?
              </p>
            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(deleteItem.id)}
                data-bs-dismiss="modal"
              >
                <i className="bi bi-trash me-1"></i>
                Delete User
              </button>

            </div>

          </div>
        </div>
      </div>

    </>
  );
}
export default UserManage;
