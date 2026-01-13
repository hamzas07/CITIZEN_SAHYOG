import axios from "axios";

const api = axios.create({
  baseURL: "https://citizen-sahyog.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("citizen_sahyog_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
