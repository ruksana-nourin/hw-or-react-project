import { Link } from "react-router";
import { useTheme } from "../../hooks/useTheme";

function Error() {
    const { theme, toggleTheme } = useTheme();
    const nextTheme = theme === "dark" ? "light" : "dark";
    return (
        <>

            <div className="d-flex pe-3 py-3">
                <button
                    className="icon-button theme-toggle ms-auto"
                    type="button"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${nextTheme} mode`}
                    title={`Switch to ${nextTheme} mode`}
                >
                    <i
                        className={theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars"}
                        aria-hidden="true"
                    ></i>
                </button>
            </div>
            <main className="error-page">
                <section className="error-card">
                    <a className="auth-brand justify-content-center" href="index.html"><span className="brand-icon"><i className="bi bi-grid-1x2-fill" aria-hidden="true"></i></span><span><strong>adminHMD</strong><small>Error Center</small></span></a>
                    <img className="error-illustration" src="../assets/images/svg/404.svg" alt="Page not found illustration" />
                    <div className="error-code">404</div>
                    <h1 className="h3 mb-2">Page Not Found</h1>
                    <p className="text-muted mb-4">The page you are looking for does not exist or has been moved.</p>
                    <div className="d-flex flex-wrap justify-content-center gap-2"><Link className="btn btn-primary" to="/"><i className="bi bi-speedometer2" aria-hidden="true"></i> Back to Dashboard</Link>
                    <a className="btn btn-outline-secondary" href="login.html">Sign In</a></div>
                </section>
            </main>
        </>
    );
}

export default Error;