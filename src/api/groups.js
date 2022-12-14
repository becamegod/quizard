import authClient from "./authClient";

const base = "/groups";

export default {
  list: (filter) => authClient.get(base, { params: filter }),

  create: (values) => {
    const { name, description } = values;
    return authClient.post(base, { name, description });
  },

  detail: (id) => authClient.get(`${base}/${id}`),

  changeRole: (data) => authClient.post(`${base}/changeRole/`, data),

  kick: (data) => authClient.post(`${base}/kickUser`, data),

  join: (url) => authClient.post(`${base}/join`, { url })
};
