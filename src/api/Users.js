import authClient from "./authClient";

const base = "/users";

export default {
  getProfile: () => authClient.get(`${base}/profile`),
  updateProfile: (user) => authClient.put(`${base}/profile`, user)
};
