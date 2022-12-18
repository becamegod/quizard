import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Image, notification, Row } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../../constants";
import "./index.css";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state === constants.unauthorized) {
      location.state = null;
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

    const accessToken = localStorage.getItem(constants.accessToken);
    if (accessToken) navigate("/dashboard");
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
