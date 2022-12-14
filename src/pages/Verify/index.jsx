import { React, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Row, Typography, Button, Card, Col } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import authService from "../../api/auth";
import LoadingIcon from "../../components/LoadingIcon";

export default function VerifyPage() {
  const [verify, setVerify] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (verify !== 0) return;
    authService
      .verify(searchParams.get("token"))
      .then(() => {
        setVerify(1);
      })
      .catch(() => {
        setVerify(2);
      });
  }, []);

  switch (verify) {
    case 1:
      return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col span={6}>
            <Card>
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
                  <Button type="primary">Login</Button>
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
            <Card>
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
            <Card>
              <Row justify="center">
                <LoadingIcon />
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
