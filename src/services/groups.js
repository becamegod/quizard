import axios from "axios";

const instance = axios.create({
  baseURL: "https://quizardbackend-production.up.railway.app"
});

const list = (filter) => {
  return instance.get("/groups", { params: filter });
};

export default { list };
