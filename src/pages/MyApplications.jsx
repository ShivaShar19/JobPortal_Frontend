import { useEffect, useState } from "react";
// import { getMyApplications } from "../services/applicationService";
import { toast } from "react-toastify";
import { getMyApplications, withdrawApplication} from "../services/applicationService";

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
            toast.error("Failed to load applications");
            console.error(error);
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
                Loading applications...
            </p>
        </div>
    );
}

const handleWithdraw = async (applicationId) => {

toast.info("Please confirm application withdrawal");

const confirmed = window.confirm(
    "Are you sure you want to withdraw this application?"
);

    if (!confirmed) return;

    try {
        await withdrawApplication(applicationId);

        setApplications(
            applications.filter(
                app => app.id !== applicationId
            )
        );

        toast.success("Application withdrawn successfully");
    } catch (error) {
        console.error(error);
        toast.error("Failed to withdraw application");
    }
};

    return (
        <div className="container mt-4">

            <h2>My Applications</h2>

            <table className="table table-bordered mt-3 text-center">

                <thead className="table-success">
                    <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Applied At</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map((application) => (
                        <tr key={application.id}>
                        <td>{application.jobTitle}</td>
                        <td>{application.companyName}</td>
                        <td>{application.status}</td>
                        <td>{new Date(application.appliedAt).toLocaleString()}</td>
                        <td>
                            <button className="btn btn-danger btn-sm"
                                onClick={() => handleWithdraw(application.id)}
                            >
                                Withdraw
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default MyApplications;