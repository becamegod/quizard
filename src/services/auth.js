import axios from "axios";

const instance = axios.create({
  baseURL: "https://quizardbackend-production.up.railway.app",
  // baseURL: "https://localhost:3001",
  headers: { "Access-Control-Allow-Origin": "*" }
});

const login = (user) => {
  return instance.post("/auth/login", user);
};

const register = (user) => {
  return instance.post("/auth/register", user);
};

const verify = (token) => {
  return instance.get(`/auth/confirm/${token}`);
};

export default { login, register, verify };
