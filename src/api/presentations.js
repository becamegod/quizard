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

const save = (presentation) => {
  return authClient.post("/presentations/save", { presentation });
};

const live = (id) => {
  return authClient.post("/presentations/live", { id });
};

const join = (id) => {
  return authClient.post("/presentations/join", { id });
};

const getSlides = (_id) => {
  return authClient.get("/presentations/slides", { _id });
};

const choose = (id, slideIndex, optionIndex) => {
  return authClient.post("/presentations/choose", {
    id,
    slideIndex,
    optionIndex
  });
};

export default {
  list,
  create,
  detail,
  remove,
  join,
  getSlides,
  save,
  live,
  choose
};
