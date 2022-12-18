import React, { useState, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import auth from "../../api/auth";
import constants from "../../constants";

export default function AuthGate() {
  const [content, setContent] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = () => {
      navigate("/", { state: constants.unauthorized });
    };
    const foo = async () => {
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
