import { Button, Card, Form } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React from "react";
import InputField from "../InputField";
import InputPassword from "../InputPassword";

export default function RegisterForm() {
  return (
    <Card className="round">
      <Title>REGISTER</Title>
      <Form layout="vertical">
        <Form.Item label="Email">
          <InputField />
        </Form.Item>
        <Form.Item label="Password">
          <InputPassword />
        </Form.Item>
        <Form.Item label="Confirm password">
          <InputPassword />
        </Form.Item>
        <Form.Item>
          <Content className="register-container">
            <Button type="primary" size="large" className="round register-btn">
              Register
            </Button>
          </Content>
        </Form.Item>
      </Form>
    </Card>
  );
}
