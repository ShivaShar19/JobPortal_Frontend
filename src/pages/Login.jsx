import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

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
            toast.error("Login failed. Please check your credentials.");
        }
    };
    

    return (
        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>

                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;