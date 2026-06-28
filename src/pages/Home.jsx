import { useAuth } from "../context/AuthContext";

function Home() {

    const { token, role } = useAuth();

    return (
        <div className="container mt-5">
            <h2>Home Page</h2>

            <p>Token: {token || "Not Logged In"}</p>
            <p>Role: {role || "No Role"}</p>
        </div>
    );
}

export default Home;