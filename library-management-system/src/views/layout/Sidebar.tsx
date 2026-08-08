import { Link, NavLink } from "react-router";
import { useState } from "react";

function Sidebar() {
    const [libraryOpen, setLibraryOpen] = useState(false);
    return (
        <>
            <input type="checkbox" className="d-none" id="sidebarToggle" />

            <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
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

                                <NavLink className="nav-link sub-link" to="/books">
                                    <i className="bi bi-book-fill"></i>
                                    Books
                                </NavLink>

                                <NavLink className="nav-link sub-link" to="/authors">
                                    <i className="bi bi-people-fill"></i>
                                    Authors
                                </NavLink>

                                <NavLink className="nav-link sub-link" to="/categories">
                                    <i className="bi bi-tags-fill"></i>
                                    Categories
                                </NavLink>

                                <NavLink className="nav-link sub-link" to="/publishers">
                                    <i className="bi bi-person-lines-fill"></i>
                                    Publishers
                                </NavLink>

                            </div>

                        )}

                    </div>
                    <NavLink className="nav-link" to="profile.html">
                        <span className="nav-icon"><i className="bi bi-person-badge" aria-hidden="true"></i></span>
                        <span className="nav-text">Profile</span>
                    </NavLink>
                    <NavLink className="nav-link" to="charts.html">
                        <span className="nav-icon"><i className="bi bi-bar-chart-line" aria-hidden="true"></i></span>
                        <span className="nav-text">Charts</span>
                    </NavLink>
                    <NavLink className="nav-link" to="tables.html">
                        <span className="nav-icon"><i className="bi bi-table" aria-hidden="true"></i></span>
                        <span className="nav-text">Tables</span>
                    </NavLink>
                    <NavLink className="nav-link" to="forms.html">
                        <span className="nav-icon"><i className="bi bi-ui-checks-grid" aria-hidden="true"></i></span>
                        <span className="nav-text">Forms</span>
                    </NavLink>
                    <NavLink className="nav-link" to="components.html">
                        <span className="nav-icon"><i className="bi bi-grid-3x3-gap" aria-hidden="true"></i></span>
                        <span className="nav-text">Components</span>
                    </NavLink>
                    <NavLink className="nav-link" to="alerts.html">
                        <span className="nav-icon"><i className="bi bi-exclamation-triangle" aria-hidden="true"></i></span>
                        <span className="nav-text">Alerts</span>
                    </NavLink>
                    <NavLink className="nav-link" to="modals.html">
                        <span className="nav-icon"><i className="bi bi-window-stack" aria-hidden="true"></i></span>
                        <span className="nav-text">Modals</span>
                    </NavLink>
                    <NavLink className="nav-link" to="settings.html">
                        <span className="nav-icon"><i className="bi bi-gear" aria-hidden="true"></i></span>
                        <span className="nav-text">Settings</span>
                    </NavLink>
                    <NavLink className="nav-link" to="blank.html">
                        <span className="nav-icon"><i className="bi bi-file-earmark" aria-hidden="true"></i></span>
                        <span className="nav-text">Blank Page</span>
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