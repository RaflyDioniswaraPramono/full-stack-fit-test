import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      config.headers.Authorization = `authorization ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject("Error:", error);
  }
);
