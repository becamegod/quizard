import { Col, Image, Row } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";

export default function LoginLayout() {
  return (
    <div className="login-base">
      <Row justify="space-evenly" align="middle" style={{ width: "100%" }}>
        <Col className="logo">
          <Image preview={false} src="/logo/quizardLogo.png" />
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}
