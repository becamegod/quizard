import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  notification,
  Space,
  Typography
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React from "react";
import constants from "../../constants";
import auth from "../../api/auth";
import SocialIcon from "../../components/SocialIcon";

export default function LoginForm() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await auth.login(values);
      const { accessToken, user } = res.data;
      localStorage.setItem(constants.accessToken, accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      notification.success({
        message: "Login succeed"
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const { status } = err.request;
      let description;
      switch (status) {
        case 400:
          description = "Email or password incorrect.";
          break;

        case 403:
          description = "You have to verify your email before continue.";
          break;

        default:
          description = "Something's wrong. Please try again later.";
          break;
      }
      notification.error({
        message: "Login failed",
        description,
        icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
        style: {
          backgroundColor: "#FFF1F0",
          borderRadius: "10px"
        }
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    throw new Error(errorInfo);
  };

  return (
    <Card className="round login-card">
      <Title className="login-title">LOGIN</Title>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          className="login-form-item"
          name="email"
          validateTrigger="onBlur"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: `Please input your email!`
            }
          ]}
        >
          <Input className="round" placeholder="Email" />
        </Form.Item>
        <Form.Item className="login-form-item" name="password">
          <Input.Password className="round" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Content className="register-link-container">
            <Space>
              <Typography.Text>Have no account yet?</Typography.Text>
              <Link to="/register">Register</Link>
            </Space>
          </Content>
        </Form.Item>
        <Form.Item>
          <Content className="login-container">
            <Button
              type="primary"
              size="large"
              className="round login-btn"
              htmlType="submit"
            >
              Login
            </Button>
          </Content>
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
