import { Button, Form, Input } from "antd";
import React from "react";

export default function InviteEmailForm() {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form onFinish={onFinish} size="large">
      <Form.Item
        label="Emails"
        name="emails"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Button
        type="primary"
        size="large"
        className="round login-btn"
        htmlType="submit"
      >
        Invite
      </Button>
    </Form>
  );
}
