import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("JOB_SEEKER");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerUser({
                name,
                email,
                password,
                role
            });

            alert("Registration successful");
            navigate("/login");

        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <div className="container mt-5">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-2"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select
                    className="form-control mb-3"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="JOB_SEEKER">Job Seeker</option>
                    <option value="RECRUITER">Recruiter</option>
                </select>

                <button className="btn btn-primary">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;