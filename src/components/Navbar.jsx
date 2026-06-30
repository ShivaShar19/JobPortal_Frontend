import { Link, useNavigate,NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
    const { token, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

            <div className="container">

                <Link className="navbar-brand fw-bold fs-4" to="/">
                    💼 JobPortal
                </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                <li className="nav-item">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? "nav-link active fw-semibold" : "nav-link"
                        }
                    >
                        Home
                    </NavLink>
                </li>

                {!token && (
                    <>
                        <li className="nav-item">
                            <NavLink
                                to="/login"
                                end
                                className={({ isActive }) =>
                                    isActive ? "nav-link active fw-semibold" : "nav-link"
                                }
                            >
                                Login
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/register"
                                end
                                className={({ isActive }) =>
                                    isActive ? "nav-link active fw-semibold" : "nav-link"
                                }
                            >   
                                Register
                            </NavLink>
                        </li>
                    </>
                )}

                {token && role === "JOB_SEEKER" && (
                    <li className="nav-item">
                        <NavLink
                            to="/applications"
                            end
                            className={({ isActive }) =>
                                isActive ? "nav-link active fw-semibold" : "nav-link"
                            }
                        >
                            My Applications
                        </NavLink>
                    </li>
                )}

                {token && role === "RECRUITER" && (
                    <>
                        <li className="nav-item">
                            <NavLink
                                to="/recruiter/dashboard"
                                end
                                className={({ isActive }) =>
                                    isActive ? "nav-link active fw-semibold" : "nav-link"
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/recruiter/jobs"
                                end
                                className={({ isActive }) =>
                                    isActive ? "nav-link active fw-semibold" : "nav-link"
                                }
                            >
                                Manage Jobs
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/recruiter/jobs/create"
                                end
                                className={({ isActive }) =>
                                    isActive ? "nav-link active fw-semibold" : "nav-link"
                                }
                            >
                                Post Job
                            </NavLink>
                        </li>
                    </>
                )}

                {token && (
                    <li className="nav-item">
                        <button
                            className="btn btn-outline-light"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                )}

            </ul>

            </div>

        </div>    

        </nav>
    );
}

export default Navbar;