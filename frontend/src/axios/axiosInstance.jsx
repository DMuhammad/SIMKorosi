import axios from "axios";

const backendURI = import.meta.env.VITE_APP_HOST;

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: backendURI,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const { accessToken } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return new Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (
        error.response.status === 401 &&
        error.response.data.error === "Request is not authorized"
      ) {
        const { accessToken } = localStorage.getItem("auth")
          ? JSON.parse(localStorage.getItem("auth"))
          : {};

        if (accessToken) {
          try {
            const res = await instance.get(`/api/auth/token`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            localStorage.removeItem("auth");
            return localStorage.setItem("auth", JSON.stringify(res.data.data));
          } catch (refreshError) {
            localStorage.removeItem("auth");
            return window.location.replace("/auth/login");
          }
        } else {
          return window.location.replace("/auth/login");
        }
      } else {
        return new Promise.reject(error);
      }
    }
  );

  return instance;
};

export default AxiosInstance;
