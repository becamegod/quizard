import { Card, Form } from "antd";
import React from "react";
import InputButton from "../Button";
import InputField from "../InputField";

export default function LoginForm() {
  return (
    <Card>
      <Form>
        <Form.Item>
          <InputField />
        </Form.Item>
        <Form.Item>
          <InputField />
        </Form.Item>
        <Form.Item>
          <InputButton label="Login" />
        </Form.Item>
      </Form>
    </Card>
  );
}
