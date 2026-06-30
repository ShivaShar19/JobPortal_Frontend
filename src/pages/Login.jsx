import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await loginUser({
                email,
                password
            });

            login(
                response.token,
                response.role
            );

            toast.success("Login successful!");

            navigate("/");

        } catch (err) {

            console.error(err);

            toast.error(
                "Login failed. Please check your credentials."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-5">

                    <div className="card shadow border-0">

                        <div className="card-body p-4">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">
                                    Welcome Back
                                </h2>

                                <p className="text-muted">
                                    Login to continue using Job Portal
                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Email Address
                                    </label>

                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>

                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Logging In..."
                                        : "Login"}
                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0">

                                Don't have an account?

                                <Link
                                    to="/register"
                                    className="ms-2 text-decoration-none fw-semibold"
                                >
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;