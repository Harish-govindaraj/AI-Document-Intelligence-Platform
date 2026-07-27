import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await authService.register({ fullName: form.fullName, email: form.email, password: form.password });
            setSuccess("Registration successful! Redirecting to Login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="container py-5">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-12 col-lg-10">
                        <div className="card border-0 rounded-4 auth-card overflow-hidden">
                            <div className="row g-0 align-items-stretch">
                                <div className="col-lg-6 d-none d-lg-flex">
                                    <div className="w-100 p-5 d-flex flex-column justify-content-between auth-illustration auth-illustration-alt">
                                        <div>
                                            <div className="section-pill mb-3">Create account</div>
                                            <h2 className="h3 fw-semibold mb-3">Join the next generation of document AI.</h2>
                                            <p className="text-muted mb-4">
                                                Build your workspace, upload files, and turn documents into structured knowledge instantly.
                                            </p>
                                        </div>
                                        <div className="rounded-4 p-4 bg-white/70 border border-white/60">
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <div className="rounded-circle bg-success-subtle p-2">
                                                    <i className="bi bi-person-check text-success"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-semibold">Fast onboarding</div>
                                                    <div className="small text-muted">Get started in minutes with a streamlined setup.</div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-circle bg-primary-subtle p-2">
                                                    <i className="bi bi-graph-up text-primary"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-semibold">Insight-ready</div>
                                                    <div className="small text-muted">Your first upload can unlock summaries and entities right away.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-6">
                                    <div className="card-body p-4 p-lg-5">
                                        <div className="text-center mb-4">
                                            <div className="brand-mark mb-3" style={{ background: "linear-gradient(135deg, #10b981 0%, #2563eb 100%)" }}>
                                                <i className="bi bi-person-plus fs-3"></i>
                                            </div>
                                            <h2 className="h4 mb-1 fw-semibold">Create your account</h2>
                                            <p className="text-muted mb-0">Join DocMind AI and start turning documents into insights.</p>
                                        </div>

                                        {error && (
                                            <div className="alert alert-danger rounded-4 border-0 shadow-sm" role="alert">
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="bi bi-exclamation-triangle"></i>
                                                    <span>{error}</span>
                                                </div>
                                            </div>
                                        )}
                                        {success && (
                                            <div className="alert alert-success rounded-4 border-0 shadow-sm" role="alert">
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="bi bi-check2-circle"></i>
                                                    <span>{success}</span>
                                                </div>
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit} noValidate>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold" htmlFor="fullName">Full Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0 text-muted">
                                                        <i className="bi bi-person"></i>
                                                    </span>
                                                    <input id="fullName" type="text" name="fullName" className="form-control border-start-0" value={form.fullName} onChange={handleChange} required />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold" htmlFor="email">Email</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0 text-muted">
                                                        <i className="bi bi-envelope"></i>
                                                    </span>
                                                    <input id="email" type="email" name="email" className="form-control border-start-0" value={form.email} onChange={handleChange} required />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold" htmlFor="password">Password</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0 text-muted">
                                                        <i className="bi bi-lock"></i>
                                                    </span>
                                                    <input id="password" type="password" name="password" className="form-control border-start-0" value={form.password} onChange={handleChange} required />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label fw-semibold" htmlFor="confirmPassword">Confirm Password</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0 text-muted">
                                                        <i className="bi bi-lock-fill"></i>
                                                    </span>
                                                    <input id="confirmPassword" type="password" name="confirmPassword" className="form-control border-start-0" value={form.confirmPassword} onChange={handleChange} required />
                                                </div>
                                            </div>

                                            <button className="btn btn-primary w-100 py-2" disabled={loading}>
                                                {loading ? "Creating Account..." : "Register"}
                                            </button>
                                        </form>

                                        <hr className="my-4" />

                                        <div className="text-center text-muted">
                                            Already have an account?
                                            <Link to="/login" className="ms-2 fw-semibold text-primary">Login</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}