export default {
  accessToken: "accessToken",
  unauthorized: "unauthorized",
  // baseUrl: "http://localhost:3000",
  user: "user",
  baseUrl: "https://master--vermillion-jelly-ab6018.netlify.app",
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
