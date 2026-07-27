import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        authService.logout();

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/dashboard"
                >

                    🧠 DocMind AI

                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/dashboard"
                            >

                                Dashboard

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/upload"
                            >

                                Upload

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/history"
                            >

                                History

                            </Link>

                        </li>

                        <li className="nav-item">

                            <button
                                className="btn btn-danger ms-3"
                                onClick={logout}
                            >

                                Logout

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}