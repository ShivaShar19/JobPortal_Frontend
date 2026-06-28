import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ children, allowedRoles }) {
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RoleRoute;