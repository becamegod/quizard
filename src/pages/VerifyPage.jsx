import { React, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Row, Typography, Button, Card, Col, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import authService from "../services/auth";

export default function VerifyPage() {
  const [verify, setVerify] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("VerifyPage");
    if (verify !== 0) return;
    authService
      .verify(searchParams.get("token"))
      .then((res) => {
        console.log("res", res);
        setVerify(1);
      })
      .catch((err) => {
        console.log("err", err);
        setVerify(2);
      });
  }, []);

  switch (verify) {
    case 1:
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
    case 2:
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
    default:
      return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col span={6}>
            <Card className="round">
              <Row justify="center">
                <Spin />
              </Row>
              <Row justify="center">
                <Typography.Title level={3}>Verifying...</Typography.Title>
              </Row>
            </Card>
          </Col>
        </Row>
      );
  }
}
