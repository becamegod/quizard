import React from "react";
import { Col, Image, Row } from "antd";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <Row justify="center" align="middle" style={{ height: "90%" }}>
      <Col span={8}>
        <Image src="/logo512.png" />
      </Col>
      <Col span={8}>
        <LoginForm />
      </Col>
    </Row>
  );
}
