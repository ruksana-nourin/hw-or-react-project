import { Link } from "react-router";
import { useEffect, useState } from "react";
import PageHeading from "../../../components/PageHeading";
import { api } from "../../../config";
import { defaultUser } from "../../../interfaces/User";
import type { User } from "../../../interfaces/User";
import type { Role } from "../../../interfaces/Role";

function AddUser() {

  const [user, setUser] = useState<User>(defaultUser);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role_id: "",
    status_id: "",
    department_id: "",
    address: "",
    notes: "",
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [msg, setMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  


  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {

    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Handle form submit
  function handleSubmit() {

    let newErrors: any = {};

    // Name validation
    if (user.name === "") {
      newErrors.name = "Name is required";
    } else if (user.name.length < 3 || user.name.length > 100) {
      newErrors.name = "Name must be between 3 and 100 characters";
    } else {
      newErrors.name = "";
    }

    // Email validation
    if (user.email === "") {
      newErrors.email = "Email is required";
    } else {
      newErrors.email = "";
    }

    // Phone validation
    if (user.phone === "") {
      newErrors.phone = "Phone number is required";
    } else {
      newErrors.phone = "";
    }

    // Password validation
    if (user.password === "") {
      newErrors.password = "Password is required";
    } else {
      newErrors.password = "";
    }

    // Role validation
    if (user.role_id === 0) {
      newErrors.role_id = "Role is required. Please select one";
    } else {
      newErrors.role_id = "";
    }

    // Status validation
    if (user.status_id === 0) {
      newErrors.status_id = "Status is required. Please select one";
    } else {
      newErrors.status_id = "";
    }

    // Department validation
    if (user.department_id === 0) {
      newErrors.department_id =
        "Department is required. Please select one";
    } else {
      newErrors.department_id = "";
    }

    setErrors(newErrors);

    // Check validation
    if (
      newErrors.name === "" &&
      newErrors.email === "" &&
      newErrors.phone === "" &&
      newErrors.password === "" &&
      newErrors.role_id === "" &&
      newErrors.status_id === "" &&
      newErrors.department_id === ""
    ) {
      console.log("New User:", user);

      api.post("user-create", user)
        .then((res) => {
          console.log(res);

          if (res.status === 200 || res.status === 201) {
            setMsg(true);
            setSuccess(true);
            setUser(defaultUser);
          }
        })
        .catch((err) => {
          console.log(err);

          setMsg(true);
          setSuccess(false);
        });
    }
  };


  // Reset form
  // Reset form
  const handleReset = () => {
    setUser(defaultUser);
    setErrors({
      name: "",
      email: "",
      phone: "",
      password: "",
      role_id: "",
      status_id: "",
      department_id: "",
      address: "",
      notes: "",
    });
  };


  return (
    <>
      <main className="dashboard-content">

        <div className="container-fluid px-3 px-lg-4 py-4">

          {/* =========================
                        PAGE HEADING
                    ========================== */}

          <PageHeading
            icon="person-plus"
            subtitle="Management"
            title="Add User"
            desc="Create a new user account with role and access information."
          >

            <Link
              className="btn btn-outline-secondary btn-sm"
              to="/user"
            >
              <i
                className="bi bi-arrow-left me-1"
                aria-hidden="true"
              ></i>

              Back to Users
            </Link>

          </PageHeading>


          {/* =========================
                        FORM
                    ========================== */}

          <section className="row g-3">

            <div className="col-12">

              {/* message */}
              {msg && (

                <div className={`alert alert-${success ? "success" : "danger"} alert-dismissible fade show mb-3`} role="alert">
                  {success ? "Data saved successfully!" : "Somthing went wrong! try later"}

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setMsg(false)}
                  ></button>
                </div>
              )}

              <form className="panel needs-validation">


                {/* =========================
                                    BASIC INFORMATION
                                ========================== */}

                <div className="panel-header mb-4">

                  <div>

                    <h2 className="h5 mb-1 section-title">

                      <i
                        className="bi bi-person-vcard me-2"
                        aria-hidden="true"
                      ></i>

                      <span>
                        Basic Information
                      </span>

                    </h2>

                    <p className="text-muted mb-0">
                      Enter the user's personal
                      and contact information.
                    </p>

                  </div>

                </div>


                <div className="row g-3">


                  {/* Full Name */}

                  <div className="col-md-6">

                    <label
                      className="form-label"
                      htmlFor="name"
                    >
                      Full Name
                    </label>

                    <input
                      className="form-control"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter full name"
                      value={user.name}
                      onChange={handleChange}
                      required
                    />

                    <div className="invalid-feedback">
                      Full name is required.
                    </div>

                  </div>


                  {/* Email */}

                  <div className="col-md-6">

                    <label
                      className="form-label"
                      htmlFor="email"
                    >
                      Email
                    </label>

                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />

                    <div className="invalid-feedback">
                      Enter a valid email.
                    </div>

                  </div>


                  {/* Phone */}

                  <div className="col-md-6">

                    <label
                      className="form-label"
                      htmlFor="phone"
                    >
                      Phone
                    </label>

                    <input
                      className="form-control"
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={user.phone}
                      onChange={handleChange}
                      required
                    />

                    <div className="invalid-feedback">
                      Phone number is required.
                    </div>

                  </div>


                  {/* Address */}

                  <div className="col-md-6">

                    <label
                      className="form-label"
                      htmlFor="address"
                    >
                      Address
                    </label>

                    <input
                      className="form-control"
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Dhaka, Bangladesh"
                      value={user.address}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                {/* =========================
                                    ACCOUNT INFORMATION
                                ========================== */}

                <hr className="my-4" />

                <div className="mb-4">

                  <h2 className="h5 mb-1 section-title">

                    <i
                      className="bi bi-shield-lock me-2"
                      aria-hidden="true"
                    ></i>

                    Account Information

                  </h2>

                  <p className="text-muted mb-0">
                    Assign a role and account status
                    to the new user.
                  </p>

                </div>


                <div className="row g-3">


                  {/* Role */}

                  <div className="col-md-6">

                    <label
                      className="form-label"
                      htmlFor="role"
                    >
                      Role
                    </label>

                    <select
                      className="form-select"
                      id="role_id"
                      name="role_id"
                      value={user.role_id}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          role_id: Number(e.target.value),
                        })
                      }
                      required
                    >
                      <option value={0}>
                        Choose role
                      </option>

                      <option value={1}>
                        Admin
                      </option>

                      <option value={2}>
                        Librarian
                      </option>

                      <option value={3}>
                        Staff
                      </option>
                    </select>

                    <small className="text-danger">
                      {errors.role_id}
                    </small>

                  </div>


                  {/* Status */}

                  <div className="col-md-6">

                    <label
                      className="form-label"
                      htmlFor="status"
                    >
                      Account Status
                    </label>

                    <select
                      className="form-select"
                      id="status_id"
                      name="status_id"
                      value={user.status_id}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          status_id: Number(e.target.value),
                        })
                      }
                      required
                    >
                      <option value={0}>
                        Choose status
                      </option>

                      <option value={1}>
                        Active
                      </option>

                      <option value={2}>
                        Inactive
                      </option>
                    </select>

                    <small className="text-danger">
                      {errors.status_id}
                    </small>

                  </div>


                  {/* Department */}

                  <div className="col-md-6">

                    <label
                      className="form-label"
                      htmlFor="department"
                    >
                      Department
                    </label>

                    <select
                      className="form-select"
                      id="department_id"
                      name="department_id"
                      value={user.department_id}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          department_id: Number(e.target.value),
                        })
                      }
                      required
                    >
                      <option value={0}>
                        Choose department
                      </option>

                      <option value={1}>
                        Library Operations
                      </option>

                      <option value={2}>
                        Administration
                      </option>

                      <option value={3}>
                        Circulation
                      </option>

                      <option value={4}>
                        Accounts
                      </option>
                    </select>

                    <small className="text-danger">
                      {errors.department_id}
                    </small>

                  </div>

                  {/* Password */}
                  <div className="col-md-6">

                    <label
                      className="form-label"
                      htmlFor="password"
                    >
                      Password
                    </label>

                    <input
                      className="form-control"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="******"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />

                    <small className="text-danger">
                      {errors.password}
                    </small>

                  </div>

                </div>


                {/* =========================
                                    NOTES
                                ========================== */}

                <hr className="my-4" />

                <div className="mb-3">

                  <label
                    className="form-label"
                    htmlFor="notes"
                  >
                    Notes
                  </label>

                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    rows={4}
                    placeholder="Add optional notes about this user"
                    value={user.notes}
                    onChange={handleChange}
                  ></textarea>

                </div>


                {/* =========================
                                    ACTION BUTTONS
                                ========================== */}

                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">


                  {/* Reset */}

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleReset}
                  >
                    <i className="bi bi-arrow-counterclockwise me-1"></i>
                    Reset
                  </button>


                  {/* Cancel */}

                  <Link
                    className="btn btn-outline-secondary"
                    to="/user"
                  >
                    Cancel
                  </Link>


                  {/* Create User */}

                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSubmit}
                  >

                    <i
                      className="bi bi-person-check me-1"
                      aria-hidden="true"
                    ></i>

                    Create User

                  </button>

                </div>

              </form>

            </div>

          </section>

        </div>

      </main>
    </>
  );
}

export default AddUser;