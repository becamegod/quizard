import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Row, Typography } from "antd";
import { React } from "react";

export default function RegisterSuccess() {
  return (
    <>
      <Row justify="center">
        <CheckCircleOutlined
          style={{
            fontSize: "64px",
            color: "#7ED957"
          }}
        />
      </Row>
      <Row justify="center">
        <Typography.Title level={3}>Register Successfully</Typography.Title>
      </Row>
      <Row justify="center">
        <Typography.Title level={5}>
          Please check your email to verify your account
        </Typography.Title>
      </Row>
      <Row justify="center">
        <Typography.Text>
          Did not receive mail?
          <Button type="link">Resend it</Button>
        </Typography.Text>
      </Row>
    </>
  );
}
