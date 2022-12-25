import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  notification,
  Space,
  Typography
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import PropTypes from "prop-types";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../api/auth";
import MyButton from "../../components/UI/MyButton";
import constants from "../../utils/constants";
import reuseables from "../../utils/reuseables";
import SocialIcon from "./SocialIcon";

export default function LoginForm({ onRegister, isUnauthorized }) {
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

      if (isUnauthorized === true) {
        navigate(-2, { replace: true });
      } else {
        navigate(constants.homeUrl, { replace: true });
      }
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
    <>
      <Title className="login-title">LOGIN</Title>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          className="tight-bottom"
          name="email"
          validateTrigger="onBlur"
          rules={reuseables.emailRule}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item className="tight-bottom" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Content className="register-link-container">
            <Space>
              <Typography.Text>Have no account yet?</Typography.Text>
              <Button type="link" onClick={onRegister}>
                Register
              </Button>
            </Space>
          </Content>
        </Form.Item>
        <Form.Item>
          <Content className="login-container">
            <MyButton primary submit>
              Login
            </MyButton>
          </Content>
        </Form.Item>
        <Form.Item>
          <Content style={{ display: "flex", justifyContent: "center" }}>
            <Space>
              <Link to="/forgot-password">Forgot password?</Link>
            </Space>
          </Content>
        </Form.Item>
        <Divider plain style={{ marginTop: "40px" }}>
          or logging in using social accounts
        </Divider>
        <Form.Item>
          <Space className="login-container">
            <SocialIcon src="/logo/googleLogo.png" />
            <SocialIcon src="/logo/facebookLogo.png" />
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

LoginForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
  isUnauthorized: PropTypes.bool.isRequired
};
