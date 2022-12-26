export default {
  accessToken: "accessToken",
  unauthorized: "unauthorized",
  baseUrl: "http://localhost:3000",
  user: "user",
  // baseUrl: "http://quizard.vercel.app",
  editPresentationUrl: (presentationId) =>
    `/presentations/edit/${presentationId}`,
  joinPresentationUrl: (presentationId) => `/presentations/${presentationId}`,
  groupsUrl: "/groups",
  presentationsUrl: "/presentations",
  homeUrl: "/groups"
};
