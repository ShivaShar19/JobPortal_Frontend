import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

function Home() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

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
        return <h3 className="text-center mt-5">Loading jobs...</h3>;
    }

    return (
        <div className="container mt-4">

            <h2 className="mb-4">Latest Jobs</h2>

            <div className="row">

                {jobs.map((job) => (
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

                                <button className="btn btn-primary btn-sm">
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