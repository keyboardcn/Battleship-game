import axios from "axios";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setAccessToken } from "../redux/accessTokenSlice";
import { tokenStore } from "./tokenStore";

export const publicApi = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


export const api = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
    const accessToken = tokenStore.get();
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});



api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error?.config;

        if (!originalRequest || error.response?.status !== 401) {
            return Promise.reject(error);
        }
        
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;
        
        try {
            const { data } = await publicApi.post('/auth/refresh-token');
            tokenStore.set(data.accessToken);
            console.log("Token refreshed:", data.accessToken);
            originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
            return api(originalRequest);    
        } catch (err) {
            tokenStore.clear();
            return Promise.reject(err);
        }
})