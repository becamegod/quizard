import { notification } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import constants from "../../utils/constants";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(constants.accessToken)) {
      localStorage.removeItem(constants.accessToken);
      localStorage.removeItem(constants.user);
      notification.info({ message: "You have logged out." });
      navigate("/");
    }
  }, []);
  return <Loading />;
}
