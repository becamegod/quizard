import React from "react";
import { Col, Image, Row } from "antd";
import ProfileForm from "../components/ProfileForm";
import "./RegisterPage.css";

export default function RegisterProfilePage() {
  return (
    <Row justify="center" align="middle" style={{ height: "90%" }}>
      <Col span={10}>
        <Image preview={false} src="/logo/quizardLogo.png" />
      </Col>
      <Col span={6}>
        <ProfileForm />
      </Col>
    </Row>
  );
}
