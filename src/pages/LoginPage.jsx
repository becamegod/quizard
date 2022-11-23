import React from "react";
import { Col, Image, Row } from "antd";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <Row justify="center" align="middle" style={{ height: "90%" }}>
      <Col span={10}>
        <Image preview={false} src="/logo/quizardLogo.png" />
      </Col>
      <Col span={6}>
        <LoginForm />
      </Col>
    </Row>
  );
}
