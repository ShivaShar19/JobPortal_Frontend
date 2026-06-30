import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/recruiterJobService";
import { toast } from "react-toastify";

function PostJob() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        companyName: "",
        location: "",
        description: "",
        salary: "",
        jobType: "FULL_TIME"
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await createJob(formData);

            toast.success(
                "Job created successfully"
            );

            navigate("/recruiter/jobs");

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to create job"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container py-4">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4">

                            <div className="mb-4 text-center">

                                <h2 className="fw-bold">
                                    Post New Job
                                </h2>

                                <p className="text-muted">
                                    Create a new job posting and start receiving applications.
                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Job Title
                                    </label>

                                    <input
                                        className="form-control"
                                        name="title"
                                        placeholder="e.g. Java Developer"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Company Name
                                    </label>

                                    <input
                                        className="form-control"
                                        name="companyName"
                                        placeholder="e.g. Infosys"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Location
                                    </label>

                                    <input
                                        className="form-control"
                                        name="location"
                                        placeholder="e.g. Pune"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Salary
                                    </label>

                                    <input
                                        className="form-control"
                                        type="number"
                                        name="salary"
                                        placeholder="Enter salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Job Type
                                    </label>

                                    <select
                                        className="form-select"
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                    >
                                        <option value="FULL_TIME">
                                            Full Time
                                        </option>

                                        <option value="PART_TIME">
                                            Part Time
                                        </option>

                                        <option value="INTERNSHIP">
                                            Internship
                                        </option>
                                    </select>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Job Description
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="6"
                                        name="description"
                                        placeholder="Describe the role, responsibilities, skills required, etc."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="d-flex gap-2">

                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Creating..."
                                            : "Create Job"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() =>
                                            navigate("/recruiter/jobs")
                                        }
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

export default PostJob;