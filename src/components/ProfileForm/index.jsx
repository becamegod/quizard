import { Button, Card, Form, Input, DatePicker, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React from "react";

export default function ProfileForm() {
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
          label="Name"
          name="name"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Please input your E-mail!"
            },
            {
              max: 200,
              message: "Name must be less than 200 characters long!"
            }
          ]}
        >
          <Input className="round" />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select
            className="round"
            defaultValue=""
            style={{ width: "100%", borderRadius: "5px" }}
            options={[
              {
                value: "",
                label: "-----"
              },
              {
                value: "male",
                label: "Male"
              },
              {
                value: "female",
                label: "Female"
              }
            ]}
          />
        </Form.Item>
        <Form.Item label="Date of birth" name="dob">
          <DatePicker style={{ width: "100%", borderRadius: "5px" }} />
        </Form.Item>
        <Form.Item>
          <Content className="register-container">
            <Button
              type="primary"
              size="large"
              className="round register-btn"
              htmlType="submit"
            >
              Register
            </Button>
          </Content>
        </Form.Item>
      </Form>
    </Card>
  );
}
