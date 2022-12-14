export default {
  accessToken: "accessToken",
  unauthorized: "unauthorized",
  user: "user",
  baseUrl: process.env.REACT_APP_BASE_URL,
  editPresentationUrl: (presentationId) =>
    `/presentations/edit/${presentationId}`,
  joinPresentationUrl: (presentationId) => `/presentations/${presentationId}`,
  collaboratorsPresentationUrl: (presentationId) =>
    `/presentations/collaborators/${presentationId}`,
  groupsUrl: "/groups",
  presentationsUrl: "/presentations",
  presentationEndUrl: "/presentations/end",
  homeUrl: "/groups",
  presentationHistoryUrl: "/presentation-histories",
  resultDetailsUrl: (sessionId) => `/result-details/${sessionId}`,
  getMainColor: () => {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue("--main-color");
  }
};
