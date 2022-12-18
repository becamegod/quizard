import axios from "axios";
import api from "./index";
import constants from "../constants";

const authClient = axios.create({
  baseURL: api,
  headers: { "Access-Control-Allow-Origin": "*" }
});

authClient.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem(constants.accessToken);
    const c = config;
    if (accessToken) {
      c.headers.authorization = `Bearer ${accessToken}`;
      return c;
    }
    accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (accessToken) {
      const user = decodeURIComponent(
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("user"))
          ?.split("=")[1]
      );
      c.headers.authorization = `Bearer ${accessToken}`;
      localStorage.setItem(constants.accessToken, accessToken);
      localStorage.setItem(constants.user, user);
    }
    return c;
  },
  (error) => Promise.reject(error)
);

// authClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const config = error?.config;

//     if (error?.response?.status === 401 && !config?.sent) {
//       localStorage.setItem(constants.unauthorized, true);
//       window.location.href = "/";
//       // config.sent = true;
//       // const result = await memoizedRefreshToken();
//       // if (result?.accessToken) {
//       //   config.headers = {
//       //     ...config.headers,
//       //     authorization: `Bearer ${result?.accessToken}`
//       //   };
//       // }
//     }
//     return Promise.reject(error);
//   }
// );

export default authClient;
