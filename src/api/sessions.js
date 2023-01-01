import authClient from "./authClient";

const base = "/sessions";

export default {
  list: () => authClient.get(base),

  create: (presentation, groupId = null) =>
    authClient.post(base, { presentation, groupId })
};
