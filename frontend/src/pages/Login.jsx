import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await login(form);

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/dashboard");

        } catch (err) {

            setError("Invalid email or password.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">

                                DocMind AI

                            </h2>

                            <h5 className="text-center text-secondary mb-4">

                                Login

                            </h5>

                            {error &&

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            }

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input

                                        type="email"

                                        name="email"

                                        className="form-control"

                                        value={form.email}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Password

                                    </label>

                                    <input

                                        type="password"

                                        name="password"

                                        className="form-control"

                                        value={form.password}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <button

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                            ? "Logging in..."

                                            : "Login"

                                    }

                                </button>

                            </form>

                            <hr />

                            <p className="text-center">

                                Don't have an account?

                            </p>

                            <Link

                                to="/register"

                                className="btn btn-outline-success w-100"

                            >

                                Register

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}