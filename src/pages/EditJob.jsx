import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import {
    getJobById,
    updateJob
} from "../services/recruiterJobService";

function EditJob() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        companyName: "",
        location: "",
        description: "",
        salary: "",
        jobType: "FULL_TIME"
    });

    useEffect(() => {
        loadJob();
    }, []);

    const loadJob = async () => {

        try {

            const data = await getJobById(jobId);

            setFormData({
                title: data.title,
                companyName: data.companyName,
                location: data.location,
                description: data.description,
                salary: data.salary,
                jobType: data.jobType
            });

        } catch (error) {

            console.error(error);
            toast.error("Failed to load job");

        } finally {

            setLoading(false);
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            await updateJob(
                jobId,
                formData
            );

            toast.success(
                "Job updated successfully"
            );

            navigate("/recruiter/jobs");

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to update job"
            );

        } finally {

            setSaving(false);
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
                    Loading job details...
                </p>

            </div>
        );
    }

    return (

        <div className="container py-4">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">
                                    Edit Job
                                </h2>

                                <p className="text-muted">
                                    Update your job posting information.
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
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-warning"
                                        disabled={saving}
                                    >
                                        {saving
                                            ? "Updating..."
                                            : "Update Job"}
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

export default EditJob;