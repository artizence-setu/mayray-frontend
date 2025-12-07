import axios from "axios";
import { useAuthStore } from "@/store/auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
});

// ✅ Add Token Before Every Request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ❗ Handle API errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const error = err?.response?.data;

    // message: "Something"
    if (error?.message) {
      throw new Error(error.message);
    }

    // { email: ["Email already exists"] }
    if (typeof error === "object") {
      const firstKey = Object.keys(error)[0];
      if (Array.isArray(error[firstKey])) {
        throw new Error(error[firstKey][0]);
      }
    }

    throw new Error("Something went wrong. Try again.");
  }
);
