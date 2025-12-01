// import axios from "axios";

// const API_BASE_URL = "http://192.168.2.17:8000"; // your real IPv4

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// src/services/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.2.17:8000"; // your backend IP

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 🔥 Add token automatically to every request
api.interceptors.request.use(async (config) => {
  // Do NOT attach token for login or signup
  if (
    config.url !== "/auth/login" &&
    config.url !== "/auth/signup"
  ) {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});



export default api;

