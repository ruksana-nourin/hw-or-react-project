import { Link } from "react-router";
import { useTheme } from "../../hooks/useTheme";

function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const nextTheme = theme === "dark" ? "light" : "dark";
    return (
        <>
            <nav className="navbar admin-navbar navbar-expand bg-white">
                <div className="container-fluid px-3 px-lg-4">
                    <label htmlFor="sidebarToggle" className="btn d-lg-none">

                        <span className="sidebar-toggle" data-sidebar-toggle aria-controls="adminSidebar" aria-expanded="true" aria-label="Toggle sidebar">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </label>

                    <form className="d-none d-md-flex ms-3 flex-grow-1" role="search">
                        <input className="form-control search-input" type="search" placeholder="Search users, orders, reports" aria-label="Search" />
                    </form>

                    <div className="navbar-actions ms-auto">
                        <button
                            className="icon-button theme-toggle"
                            type="button"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${nextTheme} mode`}
                            title={`Switch to ${nextTheme} mode`}
                        >
                            <i className={theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars"} aria-hidden="true"></i>
                        </button>
                        <div className="dropdown">
                            <button className="icon-button" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Notifications">
                                <span className="notification-dot"></span>
                                <i className="bi bi-bell" aria-hidden="true"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end notification-menu">
                                <div className="dropdown-header fw-bold text-body">Notifications</div>
                                <Link className="dropdown-item" to="users.html">
                                    <span className="notification-title">New user registered</span>
                                    <span className="notification-time">4 minutes ago</span>
                                </Link >
                                <Link className="dropdown-item" to="charts.html">
                                    <span className="notification-title">Revenue target reached</span>
                                    <span className="notification-time">32 minutes ago</span>
                                </Link >
                                <Link className="dropdown-item" to="settings.html">
                                    <span className="notification-title">Security review completed</span>
                                    <span className="notification-time">1 hour ago</span>
                                </Link >
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="profile-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className="avatar-img avatar-sm" src="https://i.pravatar.cc/50?img=20" alt="Admin Hasan" />
                                <span className="profile-name d-none d-sm-inline">R. Nourin</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="profile.html">Profile</Link ></li>
                                <li><Link className="dropdown-item" to="settings.html">Account settings</Link ></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/login">Sign out</Link ></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;