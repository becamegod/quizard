import authClient from "./authClient";

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

const live = (id) => {
  return authClient.post("/presentations/live", { id });
};

const join = (_id) => {
  return authClient.get("/presentations/join", { _id });
};

const getSlides = (_id) => {
  return authClient.get("/presentations/slides", { _id });
};

export default { list, create, detail, remove, join, getSlides, live };
