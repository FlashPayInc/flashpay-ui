import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { memoizedRefreshToken } from "./utils/refreshToken";

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config;

    // console.log(config, error);

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const result = await memoizedRefreshToken();

      if (result) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

const axiosGet = axios.get;
const axiosPost = axios.post;

export { axiosGet, axiosPost };
