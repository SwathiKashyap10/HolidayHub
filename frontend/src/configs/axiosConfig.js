// axiosConfig.js
import axios from "axios";

const API = import.meta.env.VITE_API_BACKEND_URL;

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API,
  timeout: 60000, // 10s timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or cookies if you prefer
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor → handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);  // properly throw the error
  }
//     {
//     if (error.response) {
//       const { status } = error.response;

//       // Handle Unauthorized → logout
//       if (status === 401) {
//         localStorage.removeItem("token");
//         window.location.href = "/login"; // redirect to login
//       }

//       // You could add global toast/notification here
//       console.error("API Error:", error.response.data?.message || error.message);
//     } else {
//       console.error("Network/Server error:", error.message);
//     }

//     return Promise.reject(error);
//   }
);

export default axiosInstance;
