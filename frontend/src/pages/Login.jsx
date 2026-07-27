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
        <div className="auth-shell">
            <div className="container py-5">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-12 col-lg-10">
                        <div className="card border-0 rounded-4 auth-card overflow-hidden">
                            <div className="row g-0 align-items-stretch">
                                <div className="col-lg-6 d-none d-lg-flex">
                                    <div className="w-100 p-5 d-flex flex-column justify-content-between auth-illustration">
                                        <div>
                                            <div className="section-pill mb-3">Secure AI access</div>
                                            <h2 className="h3 fw-semibold mb-3">Welcome back to your intelligent workspace.</h2>
                                            <p className="text-muted mb-4">
                                                Sign in to continue exploring documents, summaries, and AI-powered insights.
                                            </p>
                                        </div>
                                        <div className="rounded-4 p-4 bg-white/70 border border-white/60">
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <div className="rounded-circle bg-primary-subtle p-2">
                                                    <i className="bi bi-shield-check text-primary"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-semibold">Protected workspace</div>
                                                    <div className="small text-muted">Your documents stay secure and private.</div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-circle bg-success-subtle p-2">
                                                    <i className="bi bi-lightning-charge text-success"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-semibold">Fast analysis</div>
                                                    <div className="small text-muted">Instant summaries and extracted insights.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-6">
                                    <div className="card-body p-4 p-lg-5">
                                        <div className="text-center mb-4">
                                            <div className="brand-mark mb-3">
                                                <i className="bi bi-cpu fs-3"></i>
                                            </div>
                                            <h2 className="h4 mb-1 fw-semibold">Welcome back</h2>
                                            <p className="text-muted mb-0">Sign in to continue your document intelligence workspace.</p>
                                        </div>

                                        {error && (
                                            <div className="alert alert-danger rounded-4 border-0 shadow-sm" role="alert">
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="bi bi-exclamation-triangle"></i>
                                                    <span>{error}</span>
                                                </div>
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit} noValidate>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold" htmlFor="email">Email</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0 text-muted">
                                                        <i className="bi bi-envelope"></i>
                                                    </span>
                                                    <input id="email" type="email" className="form-control border-start-0" name="email" value={form.email} onChange={handleChange} required />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label fw-semibold" htmlFor="password">Password</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-end-0 text-muted">
                                                        <i className="bi bi-lock"></i>
                                                    </span>
                                                    <input id="password" type="password" className="form-control border-start-0" name="password" value={form.password} onChange={handleChange} required />
                                                </div>
                                            </div>

                                            <button className="btn btn-primary w-100 py-2" disabled={loading}>
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
                </div>
            </div>
        </div>
    );
}