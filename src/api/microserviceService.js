import axios from "axios";

const microserviceBaseURL = process.env.REACT_APP_MICROSERVICE_URL;

const microserviceService = axios.create({
  baseURL: microserviceBaseURL,
  timeout: 15000,
});

microserviceService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default microserviceService;
