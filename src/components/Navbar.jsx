import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { token, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-3">

            <Link className="navbar-brand" to="/">
                Job Portal
            </Link>

            <ul className="navbar-nav ms-auto flex-row gap-3">

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/">
                        Home
                    </Link>
                </li>

                {!token && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/login">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/register">
                                Register
                            </Link>
                        </li>
                    </>
                )}

                {token && role === "JOB_SEEKER" && (
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/applications">
                            My Applications
                        </Link>
                    </li>
                )}

                {token && role === "RECRUITER" && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/recruiter/dashboard">
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/recruiter/jobs">
                                Manage Jobs
                            </Link>
                        </li>
                    </>
                )}

                {token && (
                    <li className="nav-item">
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                )}

            </ul>

        </nav>
    );
}

export default Navbar;