import authClient from "./authClient";

const base = "/presentations";

export default {
  getPresentations: (filter) => authClient.get(base, { params: filter }),

  create: () => authClient.post(base),

  detail: (id) => authClient.get(`${base}/${id}`),

  delete: (id) =>
    authClient.delete(`${base}/delete`, { headers: {}, data: { id } }),

  save: (presentation) => authClient.post(`${base}/save`, { presentation }),

  live: (id) => authClient.post(`${base}/live`, { id }),

  join: (id) => authClient.post(`${base}/join`, { id }),

  getSlides: (id) => authClient.get(`${base}/slides`, { id }),

  choose: (id, slideIndex, optionIndex) =>
    authClient.post(`${base}/choose`, {
      id,
      slideIndex,
      optionIndex
    }),
  getCollaborators: (presentationId) =>
    authClient.get(`${base}/collaborators`, { params: presentationId }),
  addCollaborator: (presentationId, email) =>
    authClient.post(`${base}/addCollaborator`, { presentationId, email })
};
