import axios from "axios";
import api from "../api/index";

const instance = axios.create({
  baseURL: api,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
  }
});

const getProfile = () => {
  return instance.get(`/users/profile`);
};

const updateProfile = (user) => {
  return instance.put("/users/profile", user);
};

export { getProfile, updateProfile };
