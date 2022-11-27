import { React, useEffect, useState } from "react";
import { Row, Typography, Button, Card, Col } from "antd";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function VerifyPage() {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("VerifyPage");
    // call api to verify
    setSuccess(false);
  }, []);
  if (success)
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col span={6}>
          <Card className="round">
            <Row justify="center">
              <CheckCircleOutlined
                style={{
                  fontSize: "64px",
                  color: "#7ED957"
                }}
              />
            </Row>
            <Row justify="center">
              <Typography.Title level={3}>Verify Successful</Typography.Title>
            </Row>
            <Row justify="center">
              <Typography.Title level={5}>
                Please login to continue
              </Typography.Title>
            </Row>
            <Row justify="center">
              <Link to="/">
                <Button type="primary" className="round">
                  Login
                </Button>
              </Link>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <Card className="round">
          <Row justify="center">
            <CloseCircleOutlined
              style={{
                fontSize: "64px",
                color: "#FF4D4F"
              }}
            />
          </Row>
          <Row justify="center">
            <Typography.Title level={3}>Verify Failed</Typography.Title>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
