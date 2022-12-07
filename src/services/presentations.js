import authClient from "../api/authClient";

const list = (groupId) => {
  return authClient.get("/presentations", { groupId });
};

const create = (groupId) => {
  return authClient.post("/presentations/create", { groupId });
};

const detail = (id) => {
  return authClient.get(`/presentations/detail/${id}`);
};

const remove = (_id) => {
  return authClient.post("/presentations/delete", { _id });
};

export default { list, create, detail, remove };
