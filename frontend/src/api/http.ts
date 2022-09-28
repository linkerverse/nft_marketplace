import axios from "axios";
import { getToken } from "./GetToken";

const http = axios.create({
  // baseURL: "http://192.168.50.235:8000",
  baseURL: process.env.REACT_APP_BACKEND_SERVER_ADDRESS,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();

    config.headers = {
      Authorization: `${token ? token : ""}`,
      ...config.headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
