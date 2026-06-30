import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { applyForJob } from "../services/applicationService";

function ApplyJob() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!resume) {

            toast.error("Please select a resume");
            return;
        }

        try {

            setLoading(true);

            await applyForJob(
                jobId,
                resume
            );

            toast.success(
                "Application submitted successfully"
            );

            navigate("/applications");

        } catch (error) {

            toast.error(
                error.response?.data ||
                "Failed to apply"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-6 col-md-8">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">
                                    Apply For Job
                                </h2>

                                <p className="text-muted">
                                    Upload your latest resume and submit your application.
                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Resume
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

                                    <small className="text-muted">
                                        Accepted formats: PDF, DOC, DOCX
                                    </small>

                                </div>

                                {resume && (

                                    <div className="alert alert-success">

                                        Selected File:
                                        <strong>
                                            {" "}
                                            {resume.name}
                                        </strong>

                                    </div>

                                )}

                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Submitting..."
                                            : "Submit Application"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ApplyJob;