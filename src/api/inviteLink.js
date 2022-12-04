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

export default { get, sendToEmail };
