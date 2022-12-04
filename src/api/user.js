import authClient from "./authClient";

const getProfile = () => {
  return authClient.get(`/users/profile`);
};

const updateProfile = (user) => {
  return authClient.put("/users/profile", user);
};

export { getProfile, updateProfile };
