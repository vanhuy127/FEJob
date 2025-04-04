import axios from "axios";
import ApiService from "./api";
import { Mutex } from "async-mutex";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // Thêm interceptor để tự động refresh token khi access token hết hạn
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // const refreshToken = localStorage.getItem("refreshToken");
//         const response = await ApiService.callRefreshToken();
//         console.log("refreshToken res ", response);

//         localStorage.setItem("accessToken", response.data.data.access_token);
//         axiosInstance.defaults.headers[
//           "Authorization"
//         ] = `Bearer ${response.data.data.access_token}`;

//         return axiosInstance(originalRequest); // Thử lại request ban đầu
//       } catch (err) {
//         console.error("Refresh token không hợp lệ", err);
//         localStorage.clear();
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Đảm bảo cookie được gửi khi gọi API
  headers: { "Content-Type": "application/json" },
});

const mutex = new Mutex();
const NO_RETRY_HEADER = "x-no-retry";

const handleRefreshToken = async () => {
  return await mutex.runExclusive(async () => {
    try {
      const response = await ApiService.callRefreshToken();
      if (response && response.data) {
        const newAccessToken = response.data.data.access_token;
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
      }
    } catch (error) {
      console.error("Refresh token không hợp lệ", error);
      localStorage.clear();
      window.location.href = "/login";
    }
    return null;
  });
};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.headers[NO_RETRY_HEADER]
    ) {
      originalRequest._retry = true;
      originalRequest.headers[NO_RETRY_HEADER] = "true";

      const newAccessToken = await handleRefreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
