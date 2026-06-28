import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ManageJobs from "./pages/ManageJobs";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      
<Routes>

  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* JOB SEEKER ONLY */}
  <Route
    path="/applications"
    element={
      <RoleRoute allowedRoles={["JOB_SEEKER"]}>
        <MyApplications />
      </RoleRoute>
    }
  />

  {/* RECRUITER ONLY */}
  <Route
    path="/recruiter/dashboard"
    element={
      <RoleRoute allowedRoles={["RECRUITER"]}>
        <RecruiterDashboard />
      </RoleRoute>
    }
  />

  <Route
    path="/recruiter/jobs"
    element={
      <RoleRoute allowedRoles={["RECRUITER"]}>
        <ManageJobs />
      </RoleRoute>
    }
  />

</Routes>

    </BrowserRouter>
  );
}

export default App;