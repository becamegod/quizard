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

const register = (user, link) => {
  return instance.post("/auth/register", { ...user, link });
};

const forgotPassword = (body) => {
  return instance.post("/auth/forgotPassword", { ...body });
};

const resetPassword = (email, newPassword, url) => {
  return instance.post("/auth/resetPassword", { email, newPassword, url });
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

export default {
  login,
  register,
  verify,
  googleLogin,
  googleRedirect,
  check,
  forgotPassword,
  resetPassword
};
