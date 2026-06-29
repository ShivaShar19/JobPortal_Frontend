import { useEffect, useState } from "react";
import {getRecruiterJobs, deleteJob} from "../services/recruiterJobService";
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
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (jobId) => {

        const confirmDelete =
            window.confirm("Delete this job?");

        if (!confirmDelete) return;

        try {

            await deleteJob(jobId);

            setJobs(
                jobs.filter(
                    (job) => job.id !== jobId
                )
            );

            toast.success("Job deleted successfully");

        } catch (error) {

            console.error(error);
            toast.error("Failed to delete job");
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
                Loading jobs...
            </p>
        </div>
    );
}

    return (
        <div className="container mt-4">

            <h2>Manage Jobs</h2>

            <table className="table table-bordered mt-3">

                <thead className="table-success text-center">
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {jobs.map((job) => (

                        <tr key={job.id}>

                            <td>{job.title}</td>

                            <td>{job.companyName}</td>

                            <td>{job.location}</td>

                            <td>{job.salary}</td>

                            <td className="text-center d-flex gap-2">

                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() =>
                                         navigate(`/recruiter/jobs/edit/${job.id}`)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDelete(job.id)
                                    }
                                >
                                    Delete
                                </button>

                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() =>
                                        navigate(
                                         `/recruiter/jobs/${job.id}/applicants`)
                                    }
                                >
                                    Applicants
                                </button>

                            </td>
                            

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ManageJobs;