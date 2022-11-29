import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Image, notification, Row } from "antd";
import React from "react";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

export default function LoginPage() {
  if (localStorage.getItem("unauthorized")) {
    localStorage.removeItem("unauthorized");
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
