import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

function MyApplications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const data = await getMyApplications();
            setApplications(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h3 className="text-center mt-4">Loading...</h3>;
    }

    return (
        <div className="container mt-4">

            <h2>My Applications</h2>

            <table className="table table-bordered mt-3">

                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Applied At</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map((application) => (
                        <tr key={application.id}>
                        <td>{application.jobTitle}</td>
                        <td>{application.companyName}</td>
                        <td>{application.status}</td>
                        <td>{new Date(application.appliedAt).toLocaleString()}</td>
                    </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default MyApplications;