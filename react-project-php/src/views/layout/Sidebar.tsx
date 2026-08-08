import { Link, NavLink } from "react-router"

function Sidebar() {
    return (
        <>
            <input type="checkbox" className="d-none" id="sidebarToggle" />

            <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
                <div className="sidebar-header">
                    <Link className="brand-mark" to="/" aria-label="adminHMD dashboard">
                        <span className="brand-icon"><i className="bi bi-grid-1x2-fill" aria-hidden="true"></i></span>
                        <span className="brand-copy">
                            <span className="brand-title">adminHMD</span>
                            <span className="brand-subtitle">Admin Template</span>
                        </span>
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    <NavLink className="nav-link " to="/" aria-current="page">
                        <span className="nav-icon"><i className="bi bi-speedometer2" aria-hidden="true"></i></span>
                        <span className="nav-text">Dashboard</span>
                    </NavLink>


                    <small className="text-muted d-flex align-items-center nav-header">Sales <hr className="w-100 ms-2 my-0" /></small>
                    <NavLink className="nav-link" to="/sales">
                        <span className="nav-icon"><i className="bi bi-cart" aria-hidden="true"></i></span>
                        <span className="nav-text">Sales</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/sales-returns">
                        <span className="nav-icon"><i className="bi bi-bag-check" aria-hidden="true"></i></span>
                        <span className="nav-text">Sales returns</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/purchases">
                        <span className="nav-icon"><i className="bi bi-bag" aria-hidden="true"></i></span>
                        <span className="nav-text">Purchases</span>
                    </NavLink>
                    
                    <small className="text-muted d-flex align-items-center nav-header">Products <hr className="w-100 ms-2 my-0" /></small>
                    <NavLink className="nav-link" to="/products">
                        <span className="nav-icon"><i className="bi bi-people" aria-hidden="true"></i></span>
                        <span className="nav-text">Products</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/categories">
                        <span className="nav-icon"><i className="bi bi-list-ul" aria-hidden="true"></i></span>
                        <span className="nav-text">Categories</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/brands">
                        <span className="nav-icon"><i className="bi bi-tags" aria-hidden="true"></i></span>
                        <span className="nav-text">Brands</span>
                    </NavLink>
                    
                    <small className="text-muted d-flex align-items-center nav-header">Inventory <hr className="w-100 ms-2 my-0" /></small>
                    <NavLink className="nav-link" to="/inventory">
                        <span className="nav-icon"><i className="bi bi-box" aria-hidden="true"></i></span>
                        <span className="nav-text">Inventory Reports</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/inventory-transactions">
                        <span className="nav-icon"><i className="bi bi-exclamation-triangle" aria-hidden="true"></i></span>
                        <span className="nav-text">Inventory Transactions</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/inventory-adjustment">
                        <span className="nav-icon"><i className="bi bi-pencil" aria-hidden="true"></i></span>
                        <span className="nav-text">Inventory Adjustment</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/adjustment-types">
                        <span className="nav-icon"><i className="bi bi-tools" aria-hidden="true"></i></span>
                        <span className="nav-text">Adjustment Types</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/transaction-types">
                        <span className="nav-icon"><i className="bi bi-clipboard" aria-hidden="true"></i></span>
                        <span className="nav-text">Transaction Types</span>
                    </NavLink>




                    <small className="text-muted d-flex align-items-center nav-header">Auth <hr className="w-100 ms-2 my-0" /></small>
                    <NavLink className="nav-link" to="/user">
                        <span className="nav-icon"><i className="bi bi-people" aria-hidden="true"></i></span>
                        <span className="nav-text">Users</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/add-user">
                        <span className="nav-icon"><i className="bi bi-person-plus" aria-hidden="true"></i></span>
                        <span className="nav-text">Add User</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/role">
                        <span className="nav-icon"><i className="bi bi-person-plus" aria-hidden="true"></i></span>
                        <span className="nav-text">Role</span>
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