import authClient from "./authClient";

const base = "/presentations";

export default {
  list: (groupId) => authClient.get(base, { groupId }),

  create: (groupId) => authClient.post(base, { groupId }),

  detail: (id) => authClient.get(`${base}/${id}`),

  delete: (_id) =>
    authClient.delete(`${base}/delete`, { headers: {}, data: { _id } }),

  save: (presentation) => authClient.post(`${base}/save`, { presentation }),

  live: (id) => authClient.post(`${base}/live`, { id }),

  join: (id) => authClient.post(`${base}/join`, { id }),

  getSlides: (_id) => authClient.get(`${base}/slides`, { _id }),

  choose: (id, slideIndex, optionIndex) =>
    authClient.post(`${base}/choose`, {
      id,
      slideIndex,
      optionIndex
    })
};
