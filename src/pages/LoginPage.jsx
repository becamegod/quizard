import React from "react";
import { Col, Image, Row } from "antd";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

export default function LoginPage() {
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
