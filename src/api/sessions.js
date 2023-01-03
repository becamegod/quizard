import authClient from "./authClient";

const base = "/sessions";

export default {
  list: () => authClient.get(base),

  create: (presentation, groupId = null) =>
    authClient.post(base, { presentation, groupId }),
  getResults: (sessionId) =>
    authClient.get(`${base}/results`, { params: sessionId }),
  getChats: (sessionId) =>
    authClient.get(`${base}/chats`, { params: sessionId }),
  sendMessage: (sessionId, message) =>
    authClient.post(`${base}/chat`, { sessionId, message }),

  getQuestions: (sessionId) =>
    authClient.get(`${base}/questions`, { params: { sessionId } }),

  ask: (sessionId, text) =>
    authClient.post(`${base}/questions`, { sessionId, text }),

  toggleLike: (sessionId, questionIndex) =>
    authClient.post(`${base}/questions/like`, { sessionId, questionIndex }),

  toggleAnswered: (sessionId, questionIndex) =>
    authClient.post(`${base}/questions/markAnswered`, {
      sessionId,
      questionIndex
    })
};
