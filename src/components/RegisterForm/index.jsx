import { Card, Form, Input } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React from "react";
import Link from "antd/lib/typography/Link";

export default function RegisterForm() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="round">
      <Title>REGISTER</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          validateTrigger="onBlur"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]}
        >
          <Input className="round" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            },
            {
              min: 8,
              max: 16,
              message: "Password must be between 8 and 16 characters long!"
            }
          ]}
        >
          <Input.Password className="round" />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="confirm-password"
          validateTrigger="onBlur"
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              }
            })
          ]}
        >
          <Input.Password className="round" />
        </Form.Item>
        <Form.Item>
          <Content className="register-container">
            <Link href="/register-profile"> Continue </Link>
          </Content>
        </Form.Item>
      </Form>
    </Card>
  );
}
