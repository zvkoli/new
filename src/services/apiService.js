import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.bms.behinstart.ir/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const postRequest = async (url, data) => {
  try {
    const res = await apiClient.post(url, data);
    return res;
  } catch (error) {
    throw error;
  }
};