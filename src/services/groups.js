import authClient from "../api/authClient";

const list = (filter) => {
  return authClient.get("/groups", { params: filter });
};

const create = (values) => {
  const { name, description } = values;
  return authClient.post("/groups/create", { name, description });
};

export default { list, create };
