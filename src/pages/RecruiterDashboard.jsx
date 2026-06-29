import { useEffect, useState } from "react";
import { getDashboard } from "../services/recruiterService";
import { toast } from "react-toastify";

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

            <h2>Recruiter Dashboard</h2>

            <div className="row mt-4">

                <div className="col-md-4">
                    <div className="card p-3 shadow">
                        <h5>Total Jobs</h5>
                        <h2>{dashboard.totalJobs}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-3 shadow">
                        <h5>Total Applications</h5>
                        <h2>{dashboard.totalApplications}</h2>
                    </div>
                </div>

            </div>

            <div className="card mt-4 p-3 shadow">

                <h4>Applications By Status</h4>

                <ul>
                    <li>Applied: {dashboard.applicationsByStatus.APPLIED}</li>
                    <li>Reviewed: {dashboard.applicationsByStatus.REVIEWED}</li>
                    <li>Shortlisted: {dashboard.applicationsByStatus.SHORTLISTED}</li>
                    <li>Rejected: {dashboard.applicationsByStatus.REJECTED}</li>
                    <li>Hired: {dashboard.applicationsByStatus.HIRED}</li>
                </ul>

            </div>

        </div>
    );
}

export default RecruiterDashboard;