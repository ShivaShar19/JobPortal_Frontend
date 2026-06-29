import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";

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

            <h2 className="mb-4">Latest Jobs</h2>

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

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="row">

                {filteredJobs.length === 0 && (
                    <div className="text-center mt-4">
                        <h5>No jobs found</h5>
                    </div>
                    )}                

                {filteredJobs.map((job) => (

                    <div className="col-md-4 mb-3" key={job.id}>

                        <div className="card shadow-sm">

                            <div className="card-body">

                                <h5 className="card-title">
                                    {job.title}
                                </h5>

                                <p className="card-text">
                                    <strong>Company:</strong> {job.companyName}
                                </p>

                                <p className="card-text">
                                    <strong>Location:</strong> {job.location}
                                </p>

                                <p className="card-text">
                                    {job.description?.substring(0, 80)}...
                                </p>

                                <p className="card-text">
                                    <strong>Salary:</strong> {job.salary}
                                </p>

                                <button className="btn btn-primary btn-sm"
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