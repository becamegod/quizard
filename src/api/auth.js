import axios from "axios";
import authClient from "./authClient";
import api from "./index";

const instance = axios.create({
  baseURL: api,
  headers: { "Access-Control-Allow-Origin": "*" }
});

const login = (user) => {
  return instance.post("/auth/login", user);
};

const check = () => {
  return authClient.post("/auth/check");
};

const register = (user) => {
  return instance.post("/auth/register", user);
};

const verify = (token) => {
  return instance.get(`/auth/confirm/${token}`);
};

const googleLogin = () => {
  return instance.get("/auth/google");
};

const googleRedirect = () => {
  return instance.get("/auth/google/redirect");
};

export default { login, register, verify, googleLogin, googleRedirect, check };
