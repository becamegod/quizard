import React from "react";
import { Row, Col, Button } from "antd";
import "./GroupCard.css";
import { UserOutlined } from "@ant-design/icons";

export default function RegisterPage() {
  return (
    <div
      className="group-card"
      style={{
        backgroundColor: "#00B30F",
        backgroundImage: "url(/img/group_img.png)"
      }}
    >
      <Row className="group-title" align="bottom">
        <Col align="left" span={12}>
          Group Name
        </Col>
        <Col align="right" span={12}>
          <Button className="group-button" type="info">
            Join
          </Button>
        </Col>
      </Row>
      <Row className="group-description">
        <Col span={12} align="left">
          <p style={{ fontWeight: "500", fontSize: "18px" }}> Descriptions </p>
        </Col>
        <Col span={12} align="right">
          <p>
            <UserOutlined /> 4/15
          </p>
        </Col>
        <p> More group details.... </p>
      </Row>
    </div>
  );
}
