import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/recruiterJobService";

function PostJob() {

    const navigate = useNavigate();

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

            await createJob(formData);

            alert("Job created successfully");

            navigate("/recruiter/jobs");

        } catch (error) {

            console.error(error);
            alert("Failed to create job");
        }
    };

    return (
        <div className="container mt-4">

            <h2>Post Job</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="title"
                    placeholder="Job Title"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="companyName"
                    placeholder="Company Name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                />

                <textarea
                    className="form-control mb-3"
                    name="description"
                    placeholder="Job Description"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="jobType"
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
                    className="btn btn-primary"
                    type="submit"
                >
                    Create Job
                </button>

            </form>

        </div>
    );
}

export default PostJob;