import authClient from "../api/authClient";

const list = (filter) => {
  return authClient.get("/groups", { params: filter });
};

const create = (values) => {
  const { name, description } = values;
  return authClient.post("/groups/create", { name, description });
};

const detail = (id) => {
  return authClient.get(`/groups/detail/${id}`);
};

const changeRole = (data) => {
  return authClient.post("/groups/changeRole/", data);
};

const kick = (data) => {
  return authClient.post("/groups/kickUser/", data);
};

export default { list, create, detail, changeRole, kick };
