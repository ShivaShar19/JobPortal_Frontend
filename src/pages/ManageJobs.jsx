import { useEffect, useState } from "react";
import {
    getRecruiterJobs,
    deleteJob
} from "../services/recruiterJobService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {

            const data = await getRecruiterJobs();
            setJobs(data);

        } catch (error) {

            console.error(error);
            toast.error("Failed to load jobs");

        } finally {

            setLoading(false);
        }
    };

    const handleDelete = async (jobId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {

            await deleteJob(jobId);

            setJobs(
                jobs.filter(
                    job => job.id !== jobId
                )
            );

            toast.success(
                "Job deleted successfully"
            );

        } catch (error) {

            console.error(error);
            toast.error(
                "Failed to delete job"
            );
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
                    Loading jobs...
                </p>

            </div>
        );
    }

    return (
        <div className="container py-4">

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

                <div>
                    <h2 className="fw-bold">
                        Manage Jobs
                    </h2>

                    <p className="text-muted mb-0">
                        View, edit and manage all your job postings.
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/recruiter/jobs/create")
                    }
                >
                    + Post New Job
                </button>

            </div>

            {jobs.length === 0 ? (

                <div className="card shadow-sm border-0">

                    <div className="card-body text-center py-5">

                        <h1 className="display-4">
                            💼
                        </h1>

                        <h4 className="mt-3">
                            No Jobs Posted Yet
                        </h4>

                        <p className="text-muted">
                            Start by posting your first job.
                        </p>

                        <button
                            className="btn btn-primary mt-2"
                            onClick={() =>
                                navigate("/recruiter/jobs/create")
                            }
                        >
                            Post Job
                        </button>

                    </div>

                </div>

            ) : (

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr className="text-center">
                                        <th>Title</th>
                                        <th>Company</th>
                                        <th>Location</th>
                                        <th>Salary</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {jobs.map((job) => (

                                        <tr
                                            key={job.id}
                                            className="text-center"
                                        >

                                            <td className="fw-semibold">
                                                {job.title}
                                            </td>

                                            <td>
                                                {job.companyName}
                                            </td>

                                            <td>
                                                {job.location}
                                            </td>

                                            <td>
                                                ₹ {job.salary}
                                            </td>

                                            <td>

                                                <div className="d-flex justify-content-center gap-2 flex-wrap">

                                                    <button
                                                        className="btn btn-outline-warning btn-sm"
                                                        onClick={() =>
                                                            navigate(
                                                                `/recruiter/jobs/edit/${job.id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() =>
                                                            navigate(
                                                                `/recruiter/jobs/${job.id}/applicants`
                                                            )
                                                        }
                                                    >
                                                        Applicants
                                                    </button>

                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(job.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

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

export default ManageJobs;