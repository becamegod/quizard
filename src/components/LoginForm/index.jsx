import { Button, Card, Divider, Form, Space, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import Link from "antd/lib/typography/Link";
import Title from "antd/lib/typography/Title";
import React from "react";
// import InputButton from "../Button";
import InputField from "../InputField";
import SocialIcon from "../SocialIcon";

export default function LoginForm() {
  return (
    <Card className="round">
      <Title>LOGIN</Title>
      <Form layout="vertical">
        <Form.Item label="Email">
          <InputField />
        </Form.Item>
        <Form.Item label="Password">
          <InputField />
        </Form.Item>
        <Form.Item>
          <Content className="register-container">
            <Space>
              <Typography.Text>Have no account yet? </Typography.Text>
              <Link href="/register">Register</Link>
            </Space>
          </Content>
        </Form.Item>
        <Form.Item>
          <Content className="login-container">
            <Button type="primary" size="large" className="round login-btn">
              Login
            </Button>
          </Content>
          {/* <InputButton label="Login" className="login-btn" /> */}
        </Form.Item>
        <Divider plain style={{ marginTop: "80px" }}>
          or you can login using social accounts
        </Divider>
        <Form.Item>
          <Space className="login-container">
            <SocialIcon src="/logo/googleLogo.png" />
            <SocialIcon src="/logo/facebookLogo.png" />
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}
