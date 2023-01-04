import React, { useState, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import auth from "../../api/auth";
import constants from "../../utils/constants";

export default function AuthGate() {
  const [content, setContent] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = () => {
      navigate("/", { state: constants.unauthorized });
    };
    const foo = async () => {
      const accessToken = document.cookie.replace(
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
        localStorage.setItem(constants.accessToken, accessToken);
        localStorage.setItem(constants.user, user);
      }
      if (!localStorage.getItem(constants.accessToken)) {
        redirect();
      } else {
        try {
          await auth.check();
        } catch (error) {
          redirect();
        }
      }
      setContent(<Outlet />);
    };
    foo();
  }, []);
  return content;
}
