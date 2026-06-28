import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getJobById,
    updateJob
} from "../services/recruiterJobService";

function EditJob() {

    const { jobId } = useParams();
    const navigate = useNavigate();

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
            alert("Failed to load job");
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

            await updateJob(
                jobId,
                formData
            );

            alert("Job updated successfully");

            navigate("/recruiter/jobs");

        } catch (error) {

            console.error(error);
            alert("Failed to update job");
        }
    };

    return (
        <div className="container mt-4">

            <h2>Edit Job</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="title"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <textarea
                    className="form-control mb-3"
                    name="description"
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                />

                <select
                    className="form-control mb-3"
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

                <button
                    type="submit"
                    className="btn btn-warning"
                >
                    Update Job
                </button>

            </form>

        </div>
    );
}

export default EditJob;