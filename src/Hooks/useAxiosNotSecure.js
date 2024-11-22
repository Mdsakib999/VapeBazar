import axios from "axios";

const useAxiosNotSecure = () => {
  const axiosNotSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, // Use your base URL here
  });

  // Add an interceptor to attach token to headers
  axiosNotSecure.interceptors.request.use(
    (config) => {
      const auth = localStorage.getItem("auth"); // Replace with your token storage logic
      const { token } = JSON.parse(auth);
      console.log(token);
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return { axiosNotSecure };
};

export default useAxiosNotSecure;
