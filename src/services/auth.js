import axios from "axios";
import api from "../api/index";

const instance = axios.create({
  baseURL: api,
  headers: { "Access-Control-Allow-Origin": "*" }
});

const login = (user) => {
  return instance.post("/auth/login", user);
};

const register = (user) => {
  return instance.post("/auth/register", user);
};

export default { login, register };
