import { React } from "react";
import { Input, Form, Card, Typography, Button } from "antd";

export default function VerifyForm() {
  const { Title } = Typography;

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="round">
      <Title>VERIFY</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="code"
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
        <Form.Item style={{ textAlign: "center" }}>
          <Button
            htmlType="submit"
            type="primary"
            className="round"
            size="large"
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
