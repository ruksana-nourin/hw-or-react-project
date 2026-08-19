import { Link, NavLink } from "react-router";
import { useState } from "react";

function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [libraryOpen, setLibraryOpen] = useState(false);
    const [membersOpen, setMembersOpen] = useState(false);
    const [circulationOpen, setCirculationOpen] = useState(false);

    const handleNavClick = () => {
        setSidebarOpen(false);
    };
    return (
        <>
            <input type="checkbox" className="d-none" id="sidebarToggle" checked={sidebarOpen}
                onChange={(e) => setSidebarOpen(e.target.checked)} />

            <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation ">
                <div className="sidebar-header">
                    <Link className="brand-mark" to="/" aria-label="adminHMD dashboard">
                        <span className="brand-icon"><i className="bi bi-grid-1x2-fill" aria-hidden="true"></i></span>
                        <span className="brand-copy">
                            <span className="brand-title">Library M. System</span>
                            <span className="brand-subtitle">Admin Template</span>
                        </span>
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    <NavLink className="nav-link " to="/" aria-current="page">
                        <span className="nav-icon"><i className="bi bi-speedometer2" aria-hidden="true"></i></span>
                        <span className="nav-text">Dashboard</span>
                    </NavLink>

                    {/* library */}
                    <div className="nav-group">

                        <button
                            type="button"
                            className="nav-link nav-dropdown"
                            onClick={() => setLibraryOpen(!libraryOpen)}
                        >
                            <span className="nav-icon">
                                <i className="bi bi-book"></i>
                            </span>

                            <span className="nav-text">
                                Library
                            </span>

                            <span className="ms-auto">
                                <i
                                    className={`bi ${libraryOpen
                                        ? "bi-chevron-down"
                                        : "bi-chevron-right"
                                        }`}
                                ></i>
                            </span>
                        </button>

                        {libraryOpen && (

                            <div className="submenu">

                                <NavLink className="nav-link sub-link" to="/books" onClick={handleNavClick}>
                                    <i className="bi bi-book-fill"></i>
                                    Books
                                </NavLink>

                                <NavLink className="nav-link sub-link" to="/authors" onClick={handleNavClick}>
                                    <i className="bi bi-people-fill"></i>
                                    Authors
                                </NavLink>

                                <NavLink className="nav-link sub-link" to="/categories" onClick={handleNavClick}>
                                    <i className="bi bi-tags-fill"></i>
                                    Categories
                                </NavLink>

                                <NavLink className="nav-link sub-link" to="/publishers" onClick={handleNavClick}>
                                    <i className="bi bi-person-lines-fill"></i>
                                    Publishers
                                </NavLink>

                            </div>

                        )}

                    </div>

                    {/* members */}
                    <div>
                        <button
                            type="button"
                            className="nav-link nav-dropdown"
                            onClick={() => setMembersOpen(!membersOpen)}
                        >
                            <span className="nav-icon">
                                <i className="bi bi-people"></i>
                            </span>

                            <span className="nav-text">
                                Members
                            </span>

                            <span className="ms-auto">
                                <i
                                    className={`bi ${membersOpen
                                        ? "bi-chevron-down"
                                        : "bi-chevron-right"
                                        }`}
                                ></i>
                            </span>
                        </button>

                        {membersOpen && (

                            <div className="submenu">

                                <NavLink
                                    className="nav-link sub-link ps-3"
                                    to="/members"
                                    onClick={handleNavClick}
                                >
                                    <i className="bi bi-people-fill"></i>
                                    Members
                                </NavLink>

                                <NavLink
                                    className="nav-link sub-link ps-3"
                                    to="/add-member"
                                    onClick={handleNavClick}
                                >
                                    <i className="bi bi-person-plus-fill"></i>
                                    Register Member
                                </NavLink>

                                <NavLink
                                    className="nav-link sub-link ps-3"
                                    to="/membership-payments"
                                    onClick={handleNavClick}
                                >
                                    <i className="bi bi-credit-card-fill"></i>
                                    Membership Payments
                                </NavLink>

                            </div>

                        )}

                    </div>

                    {/* circulation */}
                    <div>

                        <button
                            type="button"
                            className="nav-link nav-dropdown"
                            onClick={() => setCirculationOpen(!circulationOpen)}
                        >

                            <span className="nav-icon">
                                <i className="bi bi-arrow-left-right"></i>
                            </span>

                            <span className="nav-text">
                                Circulation
                            </span>

                            <span className="ms-auto">
                                <i
                                    className={`bi ${circulationOpen
                                        ? "bi-chevron-down"
                                        : "bi-chevron-right"
                                        }`}
                                ></i>
                            </span>

                        </button>

                        {circulationOpen && (

                            <div className="submenu">

                                <NavLink
                                    className="nav-link sub-link"
                                    to="/issues"
                                    onClick={handleNavClick}
                                >
                                    <i className="bi bi-journal-plus"></i>
                                    Issue Book
                                </NavLink>

                                <NavLink
                                    className="nav-link sub-link"
                                    to="/issued-books"
                                    onClick={handleNavClick}
                                >
                                    <i className="bi bi-journals"></i>
                                    Issued Books
                                </NavLink>

                                <NavLink
                                    className="nav-link sub-link"
                                    to="/returned-books"
                                    onClick={handleNavClick}
                                >
                                    <i className="bi bi-journal-check"></i>
                                    Returned Books
                                </NavLink>
                                <NavLink
                                    className="nav-link sub-link"
                                    to="/fine-payments"
                                    onClick={handleNavClick}
                                >
                                    <i className="bi bi-cash-coin"></i>
                                    Fine Payments
                                </NavLink>

                            </div>

                        )}

                    </div>


                    <NavLink className="nav-link" to="/settings">
                        <span className="nav-icon"><i className="bi bi-gear" aria-hidden="true"></i></span>
                        <span className="nav-text">Settings</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/user">
                        <span className="nav-icon"><i className="bi bi-person" aria-hidden="true"></i></span>
                        <span className="nav-text">User</span>
                    </NavLink>
                </nav>

                <div className="sidebar-user">
                    <img className="avatar-img avatar-md sidebar-user-avatar" src="https://i.pravatar.cc/50?img=20" alt="R. Nourin" />
                    <strong>R. Nourin</strong>
                    <small>Active Workspace</small>
                </div>

                <div className="sidebar-footer">
                    <span className="status-dot"></span>
                    <span className="sidebar-footer-text">System running smoothly</span>
                </div>
            </aside>
            <label htmlFor="sidebarToggle" className="sidebar-backdrop"></label>

        </>
    )
};
export default Sidebar