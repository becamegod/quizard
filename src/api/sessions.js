import authClient from "./authClient";

const base = "/sessions";

export default {
  list: () => authClient.get(base),

  create: (presentation, groupId = null) =>
    authClient.post(base, { presentation, groupId }),
  getQuestions: (sessionId) =>
    authClient.get(`${base}/questions`, { params: sessionId }),
  getResults: (sessionId) =>
    authClient.get(`${base}/results`, { params: sessionId }),
  getChats: (sessionId) =>
    authClient.get(`${base}/chats`, { params: sessionId }),
  sendMessage: (sessionId, message) =>
    authClient.post(`${base}/chat`, { sessionId, message })
};
