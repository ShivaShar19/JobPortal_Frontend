import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    getMyApplications,
    withdrawApplication
} from "../services/applicationService";

function MyApplications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const data = await getMyApplications();
            setApplications(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async (applicationId) => {

        const confirmed = window.confirm(
            "Are you sure you want to withdraw this application?"
        );

        if (!confirmed) return;

        try {

            await withdrawApplication(applicationId);

            setApplications(
                applications.filter(
                    app => app.id !== applicationId
                )
            );

            toast.success(
                "Application withdrawn successfully"
            );

        } catch (error) {

            console.error(error);
            toast.error(
                "Failed to withdraw application"
            );
        }
    };

    const getStatusBadge = (status) => {

        switch (status) {

            case "APPLIED":
                return "bg-primary";

            case "REVIEWED":
                return "bg-warning text-dark";

            case "SHORTLISTED":
                return "bg-info";

            case "HIRED":
                return "bg-success";

            case "REJECTED":
                return "bg-danger";

            default:
                return "bg-secondary";
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

                <p className="mt-3">
                    Loading applications...
                </p>
            </div>
        );
    }

    return (
        <div className="container py-4">

            <div className="mb-4">
                <h2 className="fw-bold">
                    My Applications
                </h2>

                <p className="text-muted">
                    Track the status of all jobs you have applied for.
                </p>
            </div>

            {applications.length === 0 ? (

                <div className="card shadow-sm border-0">
                    <div className="card-body text-center py-5">

                        <h1 className="display-4">
                            📭
                        </h1>

                        <h4 className="mt-3">
                            No Applications Yet
                        </h4>

                        <p className="text-muted">
                            Start applying for jobs to see them here.
                        </p>

                    </div>
                </div>

            ) : (

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr className="text-center">
                                        <th>Job Title</th>
                                        <th>Company</th>
                                        <th>Status</th>
                                        <th>Applied At</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {applications.map((application) => (

                                        <tr
                                            key={application.id}
                                            className="text-center"
                                        >

                                            <td className="fw-semibold">
                                                {application.jobTitle}
                                            </td>

                                            <td>
                                                {application.companyName}
                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${getStatusBadge(
                                                        application.status
                                                    )}`}
                                                >
                                                    {application.status}
                                                </span>

                                            </td>

                                            <td>
                                                {new Date(
                                                    application.appliedAt
                                                ).toLocaleString()}
                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() =>
                                                        handleWithdraw(
                                                            application.id
                                                        )
                                                    }
                                                >
                                                    Withdraw
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default MyApplications;