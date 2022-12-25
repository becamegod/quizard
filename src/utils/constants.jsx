export default {
  accessToken: "accessToken",
  unauthorized: "unauthorized",
  baseUrl: "localhost:3000",
  user: "user",
  // baseUrl: "quizard.vercel.app",
  editPresentationUrl: (groupId, presentationId) =>
    `/groups/${groupId}/${presentationId}`,
  joinPresentationUrl: (presentationId) => `/presentations/${presentationId}`,
  groupsUrl: "/groups",
  presentationsUrl: "/presentations",
  homeUrl: "/groups"
};
