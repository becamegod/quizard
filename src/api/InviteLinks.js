import authClient from "./authClient";

const get = (groupId) => {
  return authClient.post(`/invite`, { groupId });
};

const sendToEmail = (email, link) => {
  return authClient.post("/groups/inviteByEmail", { email, link });
};

// const create = (user) => {
//   return authClient.put("/users/profile", user);
// };
const checkLink = (url) => {
  return authClient.post("/auth/resetPassword/check", { url });
};
export default { get, sendToEmail, checkLink };
