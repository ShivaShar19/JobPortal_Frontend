import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function JobDetails() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const { token, role } = useAuth();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJob();
    }, []);

    const loadJob = async () => {
        setLoading(true);
        try {

            const data = await getJobById(jobId);

            setJob(data);

        } catch (error) {

            console.error(error);
            toast.error("Failed to load job details");
        } finally {
            setLoading(false);
        }
    };

    const handleApply = () => {

        if (!token) {

            toast.error("Please login first");
            navigate("/login");
            return;
        }

        if (role !== "JOB_SEEKER") {

            toast.error("Only Job Seekers can apply");
            return;
        }

        navigate(`/apply/${job.id}`);
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
                Loading job details...
            </p>
        </div>
    );
}

    return (
        <div className="container mt-4">

            <div className="card">

                <div className="card-body">

                    <h2>{job.title}</h2>

                    <h5>{job.companyName}</h5>

                    <p>
                        <strong>Location:</strong>{" "}
                        {job.location}
                    </p>

                    <p>
                        <strong>Salary:</strong>{" "}
                        ₹{job.salary}
                    </p>

                    <p>
                        <strong>Job Type:</strong>{" "}
                        {job.jobType}
                    </p>

                    <hr />

                    <h5>Description</h5>

                    <p>{job.description}</p>

                    <button
                        className="btn btn-success"
                        onClick={handleApply}
                    >
                        Apply Now
                    </button>

                </div>

            </div>

        </div>
    );
}

export default JobDetails;