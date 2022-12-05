import authClient from "../api/authClient";

const list = (groupId) => {
  return authClient.get("/presentations", { groupId });
};

const create = (groupId) => {
  return authClient.post("/presentations/create", { groupId });
};

const detail = (id) => {
  return authClient.get(`/groups/detail/${id}`);
};

const changeRole = (data) => {
  return authClient.post("/groups/changeRole/", data);
};

const kick = (data) => {
  return authClient.post("/groups/kickUser", data);
};

const join = (url) => {
  return authClient.post("/groups/join", { url });
};

export default { list, create, detail, changeRole, delete: kick, join };
