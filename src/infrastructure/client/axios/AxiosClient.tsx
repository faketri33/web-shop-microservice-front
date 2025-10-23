import axios from 'axios';


export function createAxiosInstance(auth: any) {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL || '/',
        timeout: 15000
    });

    // Attach Authorization header
    instance.interceptors.request.use(async config => {
        const token = auth.getAccessToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    // Response interceptor to refresh token on 401 and retry once
    instance.interceptors.response.use(
        res => res,
        async err => {
            const originalRequest = err.config;
            if (!originalRequest || originalRequest._retry) {
                return Promise.reject(err);
            }

            if (err.response && err.response.status === 401) {
                // attempt refresh
                try {
                    await auth.refreshTokens();
                    originalRequest._retry = true;
                    const token = auth.getAccessToken();
                    if (token) originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return instance(originalRequest);
                } catch (refreshError) {
                    // refresh failed — logout
                    try { await auth.logout(); } catch (e) {
                        console.error(e);
                    }
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(err);
        }
    );

    return instance;
}
