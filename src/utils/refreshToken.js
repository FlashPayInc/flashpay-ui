import mem from "mem";
import axiosJs from "axios";
import { BASE_URL } from "./constants";

export const axios = axiosJs.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshTokenFn = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  try {
    const response = await axios.post("/token/refresh", {
      refresh_token: refreshToken,
    });

    if (!response.data?.data?.access_token) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }

    localStorage.setItem("access_token", response.data?.data?.access_token);

    return response.data?.data?.access_token;
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge: 10000,
});
