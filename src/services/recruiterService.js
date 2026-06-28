import api from "../api/axiosConfig";

export const getDashboard = async () => {
    const response = await api.get("/api/recruiter/dashboard");
    return response.data;
};