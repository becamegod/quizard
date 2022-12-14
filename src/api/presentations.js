import authClient from "./authClient";

const base = "/presentations";

export default {
  getPresentations: (filter) => authClient.get(base, { params: filter }),

  create: () => authClient.post(base),

  detail: (id) => authClient.get(`${base}/${id}`),

  delete: (id) =>
    authClient.delete(`${base}/delete`, { headers: {}, data: { id } }),

  save: (presentation) => authClient.post(`${base}/save`, { presentation }),

  live: (presentation, groupId) =>
    authClient.post(`${base}/live`, { presentation, groupId }),

  getCurrentSession: (id) => authClient.get(`${base}/current-session/${id}`),

  join: (id) => authClient.post(`${base}/join`, { id }),

  getSlides: (id) => authClient.get(`${base}/slides`, { id }),

  vote: (id, slideIndex, optionIndex) =>
    authClient.post(`${base}/vote`, {
      id,
      slideIndex,
      optionIndex
    }),

  end: (id) => authClient.post(`${base}/end`, { id }),

  getChartData: (sessionId, slideIndex) =>
    authClient.get(
      `${base}/chart?sessionId=${sessionId}&slideIndex=${slideIndex}`
    ),

  getLatestChartData: (id, slideIndex) =>
    authClient.get(`${base}/latestChart?id=${id}&slideIndex=${slideIndex}`),

  updateSlideIndex: (id, slideIndex) =>
    authClient.post(`${base}/updateSlideIndex`, { id, slideIndex }),

  getCollaborators: (presentationId) =>
    authClient.get(`${base}/collaborators`, { params: presentationId }),
  addCollaborator: (presentationId, email) =>
    authClient.post(`${base}/addCollaborator`, { presentationId, email }),
  deleteCollaborator: (presentationId, collaboratorId) =>
    authClient.delete(`${base}/collaborator`, {
      headers: {},
      data: { presentationId, collaboratorId }
    })
};
