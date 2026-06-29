import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { applyForJob } from "../services/applicationService";

function ApplyJob() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const [resume, setResume] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!resume) {

            toast.error("Please select a resume");
            return;
        }

        try {

            await applyForJob(
                jobId,
                resume
            );

            toast.success("Application submitted successfully");

            navigate("/applications");

        } catch (error) {
            toast.error(
                error.response?.data ||
                "Failed to apply"
            );
        }
    };

    return (

        <div className="container mt-4">

            <div className="card">

                <div className="card-body">

                    <h2>Apply For Job</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Upload Resume
                            </label>

                            <input
                                type="file"
                                className="form-control"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) =>
                                    setResume(
                                        e.target.files[0]
                                    )
                                }
                            />

                        </div>

                        <button
                            className="btn btn-success"
                            type="submit"
                        >
                            Submit Application
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ApplyJob;