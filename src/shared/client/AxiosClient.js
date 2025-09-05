// src/shared/client/AxiosClient.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const _axios = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

// Добавляем access токен из localStorage
_axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("access");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Обновляем токен по refresh
_axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 403 && !originalRequest?._retry) {
            originalRequest._retry = true;
            try {
                const resp = await _axios.post("/auth/access", {
                    refreshToken: localStorage.getItem("refresh"),
                });
                localStorage.setItem("access", resp.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${resp.data.accessToken}`;
                return _axios(originalRequest);
            } catch (err) {
                console.error("AUTH ERROR", err);
            }
        }
        throw error;
    }
);

export const $axios = _axios;
