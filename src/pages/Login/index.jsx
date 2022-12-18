import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Image, notification, Row } from "antd";
import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import constants from "../../constants";
import "./index.css";

export default function LoginPage() {
  useEffect(() => {
    if (localStorage.getItem(constants.accessToken)) {
      localStorage.removeItem(constants.accessToken);
      localStorage.removeItem(constants.user);
      notification.info({ message: "You have logged out." });
    }
    if (localStorage.getItem(constants.unauthorized)) {
      localStorage.removeItem(constants.unauthorized);
      notification.error({
        message: "Unauthorized",
        description: "You have to log in to view this content",
        icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
        style: {
          backgroundColor: "#FFF1F0",
          borderRadius: "10px"
        }
      });
    }
    return () => {};
  }, []);

  return (
    <div className="login-base">
      <Row justify="space-evenly" align="middle" style={{ width: "100%" }}>
        <Col span={4} className="logo">
          <Image preview={false} src="/logo/quizardLogo.png" />
        </Col>
        <Col span={4}>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
}
