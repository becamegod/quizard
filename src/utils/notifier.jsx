import { ExclamationCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React from "react";

export default {
  notifyError: (message = "Something's wrong. Please try again later") =>
    notification.error({
      message: "Error",
      description: message,
      icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
      style: {
        backgroundColor: "#FFF1F0",
        borderRadius: "10px"
      }
    })
};
