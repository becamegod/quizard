import { Card, Row, Typography, Col } from "antd";
import React from "react";
import MyButton from "../../components/UI/MyButton";

export default function NotifyPresentingCard() {
  return (
    <Card className="notify-card">
      <Row justify="space-between">
        <Typography.Title level={3} style={{ color: "red" }}>
          The group is having a presentation.
        </Typography.Title>
        <Col>
          <MyButton primary>Join now</MyButton>
        </Col>
      </Row>
    </Card>
  );
}
