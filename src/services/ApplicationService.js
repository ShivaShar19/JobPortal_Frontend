import api from "../api/axiosConfig";

export const getMyApplications = async () => {
    const response = await api.get("/api/jobseeker/applications");
    return response.data;
};