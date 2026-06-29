import api from "../api/axiosConfig";

export const getMyApplications = async () => {

    const response = await api.get(
        "/api/jobseeker/applications"
    );

    return response.data;
};

export const applyForJob = async (
    jobId,
    resume
) => {

    const formData = new FormData();

    formData.append(
        "resume",
        resume
    );

    const response = await api.post(
        `/api/jobseeker/jobs/${jobId}/apply`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        }
    );

    return response.data;
};