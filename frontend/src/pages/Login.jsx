import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            await authService.login(form);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 p-lg-5">
                            <div className="text-center mb-4">
                                <div className="rounded-circle bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "56px", height: "56px" }}>
                                    <i className="bi bi-cpu fs-3"></i>
                                </div>
                                <h2 className="h4 mb-1">Welcome back</h2>
                                <p className="text-muted mb-0">Sign in to continue your document intelligence workspace.</p>
                            </div>

                            {error && <div className="alert alert-danger rounded-3">{error}</div>}

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input id="email" type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input id="password" type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
                                </div>

                                <button className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Signing In..." : "Login"}
                                </button>
                            </form>

                            <hr className="my-4" />

                            <div className="text-center text-muted">
                                Don&apos;t have an account?
                                <Link to="/register" className="ms-2 fw-semibold text-primary">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}