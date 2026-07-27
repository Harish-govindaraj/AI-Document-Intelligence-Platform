import { NavLink, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        authService.logout();
        navigate("/login");
    };

    const navLinks = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/upload", label: "Upload" },
        { to: "/history", label: "History" }
    ];

    return (
        <nav className="navbar navbar-expand-lg sticky-top border-bottom">
            <div className="container">
                <NavLink className="navbar-brand fw-bold d-flex align-items-center gap-2 me-4" to="/dashboard">
                    <span className="brand-mark">
                        <i className="bi bi-cpu"></i>
                    </span>
                    <span className="text-dark">DocMind AI</span>
                </NavLink>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto gap-1">
                        {navLinks.map((link) => (
                            <li className="nav-item" key={link.to}>
                                <NavLink
                                    className={({ isActive }) => `nav-link px-3 py-2 fw-semibold ${isActive ? "text-primary" : "text-muted"}`}
                                    to={link.to}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                        <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-light border">
                            <i className="bi bi-person-circle fs-5 text-primary"></i>
                            <span className="small fw-semibold text-dark">Workspace</span>
                        </div>
                        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}