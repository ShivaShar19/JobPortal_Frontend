import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("JOB_SEEKER");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await registerUser({
                name,
                email,
                password,
                role
            });

            toast.success(
                "Registration successful!"
            );

            navigate("/login");

        } catch (err) {

            console.error(err);

            toast.error(
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-7 col-lg-6">

                    <div className="card shadow border-0">

                        <div className="card-body p-4">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">
                                    Create Account
                                </h2>

                                <p className="text-muted">
                                    Join Job Portal and start your journey
                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Full Name
                                    </label>

                                    <input
                                        className="form-control"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />

                                </div>

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

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>

                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Register As
                                    </label>

                                    <select
                                        className="form-select"
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    >
                                        <option value="JOB_SEEKER">
                                            Job Seeker
                                        </option>

                                        <option value="RECRUITER">
                                            Recruiter
                                        </option>
                                    </select>

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating Account..."
                                        : "Register"}
                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0">

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="ms-2 text-decoration-none fw-semibold"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;