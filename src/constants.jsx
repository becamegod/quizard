export default {
  accessToken: "accessToken",
  unauthorized: "unauthorized",
  baseUrl: "localhost:3000",
  // baseUrl: "quizard.vercel.app",
  editPresentationUrl: (groupId, presentationId) =>
    `/groups/${groupId}/${presentationId}`,
  joinPresentationUrl: (presentationId) => `/presentations/${presentationId}`
};
