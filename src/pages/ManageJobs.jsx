import { useEffect, useState } from "react";
import {
    getRecruiterJobs,
    deleteJob
} from "../services/recruiterJobService";
import { useNavigate } from "react-router-dom";

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

            alert("Job deleted successfully");

        } catch (error) {

            console.error(error);
            alert("Failed to delete job");
        }
    };

    if (loading) {
        return <h3 className="text-center mt-4">Loading...</h3>;
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