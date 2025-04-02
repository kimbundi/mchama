import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

const getAdminToken = () => {
  const token = localStorage.getItem("adminToken");
  console.log("Stored Admin Token:", token); // Debugging
  return token;
};

// Axios instance with dynamic token handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token dynamically to every request
api.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No admin token found. Unauthorized requests may fail.");
  }
  return config;
}, (error) => Promise.reject(error));

// Get all loans
export const getAllLoans = async () => {
  try {
    const response = await api.get("/loan/all");
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching loans:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch loans");
  }
};
export const getAll = async () => {
  
  try {
    const response = await api.get("/group/list");
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching group:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch group");
  }
};




// Remove loan
export const removeLoan = async (loanId) => {
  try {
    const response = await api.post("/loan/remove", { id: loanId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete loan");
  }
};
export const updateLoanStatus = async (loanId, status, approvedLoanAmount, userId) => {
    try {
        const response = await api.post("/loan/update", { 
            id: loanId, 
            status, 
            approvedLoanAmount,
            userId // Ensure userId is sent
        });
        return response.data;
    } catch (error) {
        console.error("Error updating loan:", error);
        throw new Error(error.response?.data?.message || "Failed to update loan status");
    }
};
export const deleteGroup = async (groupId) => {
  try {
    const response = await api.delete(`/group/${groupId}/delete`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete group");
  }
};


