import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedJobType, setSelectedJobType] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const data = await getAllJobs();
            setJobs(data);
        } catch (error) {
            console.log("Error fetching jobs", error);
        } finally {
            setLoading(false);
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

const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
        selectedLocation === "" ||
        job.location === selectedLocation;

    const matchesJobType =
        selectedJobType === "" ||
        job.jobType === selectedJobType;

    return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType
    );
});
    const locations = [...new Set(
    jobs.map(job => job.location)
)];

const jobTypes = [...new Set(
    jobs.map(job => job.jobType)
)];
    return (
        <div className="container mt-4">

            <div className="text-center mb-5">
                <h1 className="fw-bold">Find Your Dream Job</h1>
                    <p className="text-muted">
                        Explore opportunities from top companies.
                    </p>
            </div>

            <div className="row mb-4">

    <div className="col-md-6">
        <select
            className="form-select"
            value={selectedLocation}
            onChange={(e) =>
                setSelectedLocation(e.target.value)
            }
        >
            <option value="">
                All Locations
            </option>

            {locations.map((location) => (
                <option
                    key={location}
                    value={location}
                >
                    {location}
                </option>
            ))}
        </select>
    </div>

    <div className="col-md-6">
        <select
            className="form-select"
            value={selectedJobType}
            onChange={(e) =>
                setSelectedJobType(e.target.value)
            }
        >
            <option value="">
                All Job Types
            </option>

            {jobTypes.map((type) => (
                <option
                    key={type}
                    value={type}
                >
                    {type}
                </option>
            ))}
        </select>
    </div>

</div>

            <div className="mb-4 shadow-sm">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title, company, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="row">

                {filteredJobs.length === 0 && (
<div className="text-center py-5">
    <h1>📭</h1>

    <h4>No Jobs Found</h4>

    <p className="text-muted">
        Try changing your search or filters.
    </p>
</div>
                    )}                

                {filteredJobs.map((job) => (

                    <div
                        className="col-12 col-md-6 col-lg-4 mb-4"
                        key={job.id}
                    >

                        <div className="card h-100 shadow-sm job-card">

<div className="card-body d-flex flex-column">

    <h5 className="card-title fw-bold mb-3">
        {job.title}
    </h5>

    <p className="mb-2">
        🏢 <strong>{job.companyName}</strong>
    </p>

    <p className="mb-2">
        📍 {job.location}
    </p>

    <p className="mb-2">
        💰 {job.salary}
    </p>

    <p className="mb-3">
        🧾 {job.jobType}
    </p>

    <p className="text-muted flex-grow-1">
        {job.description?.substring(0, 100)}...
    </p>

    <button
        className="btn btn-primary mt-auto"
        onClick={() => navigate(`/jobs/${job.id}`)}
    >
        View Details
    </button>

</div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Home;