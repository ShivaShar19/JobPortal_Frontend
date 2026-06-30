import { useEffect, useState } from "react";
import { getDashboard } from "../services/recruiterService";
import { toast } from "react-toastify";
import "../styles/RecruiterDashboard.css";

function RecruiterDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const data = await getDashboard();
            console.log(data);
            setDashboard(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load dashboard");    
        }finally {
            setLoading(false);
        }
    };

if (loading) {
    return (
        <div className="text-center mt-5">
            <div
                className="spinner-border"
                role="status"
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>

            <p className="mt-2">
                Loading Dashboard...
            </p>
        </div>
    );
}

    return (
        <div className="container mt-4">

            <div className="mb-4">
                <h2 className="fw-bold">Recruiter Dashboard</h2>
                    <p className="text-muted">
                        Overview of your jobs and applications.
                    </p>
            </div>

            <div className="col-12 col-md-6 mb-4">

<div className="row mb-4">

    <div className="col-12 col-md-6 mb-4">

        <div className="card dashboard-card shadow-sm border-0">
            <div className="card-body text-center">

                <h1 className="mb-3">💼</h1>

                <h6 className="text-muted">
                    Total Jobs
                </h6>

                <h2 className="fw-bold">
                    {dashboard.totalJobs}
                </h2>

            </div>
        </div>

    </div>

    <div className="col-12 col-md-6 mb-4">

        <div className="card dashboard-card shadow-sm border-0">
            <div className="card-body text-center">

                <h1 className="mb-3">📄</h1>

                <h6 className="text-muted">
                    Total Applications
                </h6>

                <h2 className="fw-bold">
                    {dashboard.totalApplications}
                </h2>

            </div>
        </div>

    </div>

</div>
            </div>

<div className="card border-0 shadow-sm p-4">

    <h4 className="mb-4">
        Applications By Status
    </h4>

    <div className="row g-3">

        <div className="col-6 col-md-4">
            <div className="status-card applied">
                <h6>Applied</h6>
                <h3>{dashboard.applicationsByStatus.APPLIED || 0}</h3>
            </div>
        </div>

        <div className="col-6 col-md-4">
            <div className="status-card reviewed">
                <h6>Reviewed</h6>
                <h3>{dashboard.applicationsByStatus.REVIEWED || 0}</h3>
            </div>
        </div>

        <div className="col-6 col-md-4">
            <div className="status-card shortlisted">
                <h6>Shortlisted</h6>
                <h3>{dashboard.applicationsByStatus.SHORTLISTED || 0}</h3>
            </div>
        </div>

        <div className="col-6 col-md-4">
            <div className="status-card rejected">
                <h6>Rejected</h6>
                <h3>{dashboard.applicationsByStatus.REJECTED || 0}</h3>
            </div>
        </div>

        <div className="col-6 col-md-4">
            <div className="status-card hired">
                <h6>Hired</h6>
                <h3>{dashboard.applicationsByStatus.HIRED || 0}</h3>
            </div>
        </div>

    </div>

</div>

        </div>
    );
}

export default RecruiterDashboard;