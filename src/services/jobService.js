import api from "../api/axiosConfig";

export const getAllJobs = async () => {
    const response = await api.get("/api/jobs");
    return response.data;
};

export const getJobById = async (id) => {
    const response = await api.get(`/api/jobs/${id}`);
    return response.data;
};