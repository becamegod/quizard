import authClient from "../api/authClient";

const get = (groupId) => {
  console.log("Group: ", groupId);
  return authClient.post(`/invite`, { groupId });
};

// const create = (user) => {
//   return authClient.put("/users/profile", user);
// };

export default { get };
