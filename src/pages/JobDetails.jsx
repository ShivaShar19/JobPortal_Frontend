import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { useAuth } from "../context/AuthContext";

function JobDetails() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const { token, role } = useAuth();

    const [job, setJob] = useState(null);

    useEffect(() => {
        loadJob();
    }, []);

    const loadJob = async () => {

        try {

            const data = await getJobById(jobId);

            setJob(data);

        } catch (error) {

            console.error(error);
        }
    };

    const handleApply = () => {

        if (!token) {

            alert("Please login first");
            navigate("/login");
            return;
        }

        if (role !== "JOB_SEEKER") {

            alert("Only Job Seekers can apply");
            return;
        }

        navigate(`/apply/${job.id}`);
    };

    if (!job) {

        return (
            <div className="container mt-4">
                Loading...
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