import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicantsForJob, updateApplicationStatus } from "../services/recruiterJobService";

function ViewApplicants() {

    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplicants();
    }, []);

    const loadApplicants = async () => {

        try {

            const data =
                await getApplicantsForJob(jobId);

            setApplications(data);

        } catch (error) {

            console.error(error);
        }
    };

    const handleStatusChange = async (
    applicationId,
    status) => {

    try {

        await updateApplicationStatus(
            applicationId,
            status
        );

        loadApplicants();

    } catch (error) {

        console.error(error);
        alert("Failed to update status");
    }
};

    return (
        <div className="container mt-4">

            <h2>Applicants</h2>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Applied At</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {applications.map(app => (

                        <tr key={app.id}>

                            <td>{app.applicantName}</td>

                            <td>{app.applicantEmail}</td>

                            <td>

                                <select className="form-select" value={app.status}
                                    onChange={(e) =>
                                        handleStatusChange(app.id, e.target.value)
                                    }
                                >

                                    <option value="APPLIED">APPLIED</option>
                                    <option value="REVIEWED">REVIEWED</option>
                                    <option value="SHORTLISTED">SHORTLISTED</option>
                                    <option value="REJECTED">REJECTED</option>
                                    <option value="HIRED">HIRED</option>
                                </select>
                            </td>

                            <td>
                                {new Date(app.appliedAt).toLocaleString()}
                            </td>

                            <td>
                                {new Date(
                                    app.appliedAt
                                ).toLocaleString()}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ViewApplicants;