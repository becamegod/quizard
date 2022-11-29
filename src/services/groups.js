import axios from "axios";
import api from "../api/index";

const instance = axios.create({
  // baseURL: "https://quizardbackend-production.up.railway.app"
  baseURL: api,
  headers: { "Access-Control-Allow-Origin": "*" }
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const c = config;
    if (accessToken) c.headers.authorization = `Bearer ${accessToken}`;
    return c;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      localStorage.setItem("unauthorized", true);
      window.location.href = "/login";
      // config.sent = true;

      // const result = await memoizedRefreshToken();

      // if (result?.accessToken) {
      //   config.headers = {
      //     ...config.headers,
      //     authorization: `Bearer ${result?.accessToken}`
      //   };
      // }

      // return axios(config);
    }
    return Promise.reject(error);
  }
);

const list = (filter) => {
  return instance.get("/groups", { params: filter });
};

const create = (values) => {
  const { name, description } = values;
  return instance.post("/groups/create", { name, description });
};

export default { list, create };
