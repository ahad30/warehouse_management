import axios from "axios";
import { useToken } from "../hooks/useToken";

const token = useToken();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_PORT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
