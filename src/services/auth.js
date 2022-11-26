import axios from "axios";

const instance = axios.create({
  baseURL: "https://quizardbackend-production.up.railway.app",
  headers: { "Access-Control-Allow-Origin": "*" }
});

const register = (user) => {
  return instance.post("/auth/register", user);
};

export default { register };
