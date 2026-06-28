import api from "../api/axiosConfig";

export const getRecruiterJobs = async () => {
    const response = await api.get("/api/recruiter/jobs");
    return response.data;
};

export const deleteJob = async (jobId) => {
    return await api.delete(`/api/recruiter/jobs/${jobId}`);
};

export const createJob = async (jobData) => {
    const response = await api.post(
        "/api/recruiter/jobs",
        jobData
    );

    return response.data;
};

export const getApplicantsForJob = async (jobId) => {
    const response = await api.get(
        `/api/recruiter/jobs/${jobId}/applications`
    );

    return response.data;
};

export const updateApplicationStatus = async (
    applicationId,
    status
) => {

    const response = await api.put(
        `/api/recruiter/jobs/applications/${applicationId}/status`,
        {
            status
        }
    );

    return response.data;
};

export const getJobById = async (jobId) => {
    const response = await api.get(`/api/jobs/${jobId}`);
    return response.data;
};

export const updateJob = async (jobId, jobData) => {
    const response = await api.put(
        `/api/recruiter/jobs/${jobId}`,
        jobData
    );

    return response.data;
};