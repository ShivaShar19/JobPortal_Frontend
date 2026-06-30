import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getApplicantsForJob,
    updateApplicationStatus
} from "../services/recruiterJobService";

function ViewApplicants() {

    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplicants();
    }, []);

    const loadApplicants = async () => {

        try {

            const data =
                await getApplicantsForJob(jobId);

            setApplications(data);

        } catch (error) {

            console.error(error);
            toast.error("Failed to load applicants");

        } finally {

            setLoading(false);
        }
    };

    const handleStatusChange = async (
        applicationId,
        status
    ) => {

        try {

            await updateApplicationStatus(
                applicationId,
                status
            );

            toast.success(
                "Application status updated"
            );

            loadApplicants();

        } catch (error) {

            console.error(error);
            toast.error(
                "Failed to update status"
            );
        }
    };

    const getAvailableStatuses = (
        currentStatus
    ) => {

        switch (currentStatus) {

            case "APPLIED":
                return ["REVIEWED"];

            case "REVIEWED":
                return [
                    "SHORTLISTED",
                    "REJECTED"
                ];

            case "SHORTLISTED":
                return [
                    "HIRED",
                    "REJECTED"
                ];

            case "HIRED":
            case "REJECTED":
                return [];

            default:
                return [];
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
                    Loading applicants...
                </p>

            </div>
        );
    }

    return (
        <div className="container py-4">

            <div className="mb-4">

                <h2 className="fw-bold">
                    Applicants
                </h2>

                <p className="text-muted">
                    Review and manage candidate applications.
                </p>

            </div>

            {applications.length === 0 ? (

                <div className="card shadow-sm border-0">

                    <div className="card-body text-center py-5">

                        <h1 className="display-4">
                            📄
                        </h1>

                        <h4 className="mt-3">
                            No Applicants Yet
                        </h4>

                        <p className="text-muted">
                            Applicants will appear here once they apply.
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

                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Current Status</th>
                                        <th>Applied At</th>
                                        <th>Update Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {applications.map((app) => (

                                        <tr
                                            key={app.id}
                                            className="text-center"
                                        >

                                            <td className="fw-semibold">
                                                {app.applicantName}
                                            </td>

                                            <td>
                                                {app.applicantEmail}
                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${getStatusBadge(
                                                        app.status
                                                    )}`}
                                                >
                                                    {app.status}
                                                </span>

                                            </td>

                                            <td>
                                                {new Date(
                                                    app.appliedAt
                                                ).toLocaleString()}
                                            </td>

                                            <td>

                                                {["HIRED", "REJECTED"].includes(
                                                    app.status
                                                ) ? (

                                                    <span className="text-muted">
                                                        Final Status
                                                    </span>

                                                ) : (

                                                    <select
                                                        className="form-select form-select-sm"
                                                        defaultValue=""
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                app.id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Select Status
                                                        </option>

                                                        {getAvailableStatuses(
                                                            app.status
                                                        ).map((status) => (

                                                            <option
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status}
                                                            </option>

                                                        ))}

                                                    </select>

                                                )}

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

export default ViewApplicants;