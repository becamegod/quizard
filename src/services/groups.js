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

const list = (filter) => {
  return instance.get("/groups", { params: filter });
};

const create = (values) => {
  const { name, description } = values;
  return instance.post("/groups/create", { name, description });
};

export default { list, create };
