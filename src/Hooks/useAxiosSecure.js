// hooks/useAxiosSecure.js
import { useEffect } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  // Create an instance of axios
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, // Use your base URL here
  });

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // Add any request headers here (e.g., authorization token)
        const token = localStorage.getItem("token"); // Adjust this according to how you store tokens
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle errors (e.g., logging out the user if the token is invalid)
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error (logout user, refresh token, etc.)
          // Example: logout the user or redirect to login
          // logoutUser(); // Implement your logout functionality
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors when the component unmounts
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosSecure;
