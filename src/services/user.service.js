import axios from "axios";
import api from "../api/index";

const instance = axios.create({
  baseURL: api,
  headers: { "Access-Control-Allow-Origin": "*" }
});

const getProfile = (user) => {
  return instance.get("/users/profile");
};

export default { getProfile };
