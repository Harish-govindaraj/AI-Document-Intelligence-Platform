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
        <div className="container py-5">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 p-lg-5">
                            <div className="text-center mb-4">
                                <div className="rounded-circle bg-success-subtle text-success d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "56px", height: "56px" }}>
                                    <i className="bi bi-person-plus fs-3"></i>
                                </div>
                                <h2 className="h4 mb-1">Create your account</h2>
                                <p className="text-muted mb-0">Join DocMind AI and start turning documents into insights.</p>
                            </div>

                            {error && <div className="alert alert-danger rounded-3">{error}</div>}
                            {success && <div className="alert alert-success rounded-3">{success}</div>}

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="fullName">Full Name</label>
                                    <input id="fullName" type="text" name="fullName" className="form-control" value={form.fullName} onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input id="email" type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input id="password" type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                    <input id="confirmPassword" type="password" name="confirmPassword" className="form-control" value={form.confirmPassword} onChange={handleChange} required />
                                </div>

                                <button className="btn btn-primary w-100" disabled={loading}>
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
    );
}