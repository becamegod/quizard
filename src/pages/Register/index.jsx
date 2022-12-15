import React from "react";
import { Col, Image, Row } from "antd";
import RegisterForm from "./RegisterForm";
import "./index.css";

export default function RegisterPage() {
  return (
    <Row justify="center" align="middle" style={{ height: "90%" }}>
      <Col span={10}>
        <Image preview={false} src="/logo/quizardLogo.png" />
      </Col>
      <Col span={6}>
        <RegisterForm />
      </Col>
    </Row>
  );
}
