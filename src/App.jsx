import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ManageJobs from "./pages/ManageJobs";
// ProtectedRoute import removed because it's not used in this file
import RoleRoute from "./components/RoleRoute";
import EditJob from "./pages/EditJob";
import PostJob from "./pages/PostJob";
import ViewApplicants from "./pages/ViewApplicants";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import "./styles/Global.css";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>

      <Navbar />
      
<Routes>

  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/jobs/:jobId" element={<JobDetails />} />
  
  {/* JOB SEEKER ONLY */}
  <Route
    path="/applications"
    element={
      <RoleRoute allowedRoles={["JOB_SEEKER"]}>
        <MyApplications />
      </RoleRoute>
    }
  />

  <Route
    path="/apply/:jobId"
    element={
        <RoleRoute allowedRoles={["JOB_SEEKER"]}>
            <ApplyJob />
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

  <Route
    path="/recruiter/jobs/create"
    element={
        <RoleRoute allowedRoles={["RECRUITER"]}>
            <PostJob />
        </RoleRoute>
    }
/>
  <Route
    path="/recruiter/jobs/:jobId/applicants"
    element={
        <RoleRoute allowedRoles={["RECRUITER"]}>
            <ViewApplicants />
        </RoleRoute>
    }
/>
<Route
    path="/recruiter/jobs/edit/:jobId"
    element={
        <RoleRoute allowedRoles={["RECRUITER"]}>
            <EditJob />
        </RoleRoute>
    }
/>

</Routes>

    </BrowserRouter>
  );
}

export default App;