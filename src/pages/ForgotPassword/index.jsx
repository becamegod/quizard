import {
  Card,
  Image,
  Typography,
  Row,
  Input,
  Button,
  Form,
  notification,
  Modal
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React from "react";
import auth from "../../api/auth";
import constants from "../../utils/constants";
import "./index.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const handleOnClickBackButton = () => {
    navigate("/");
  };
  const success = () => {
    Modal.success({
      title: "Change password successfully",
      content: "Your password is changed",
      onOk: () => handleOnClickBackButton()
    });
  };

  const onFinish = async (values) => {
    try {
      const body = {
        ...values,
        link: `http://${constants.baseUrl}/reset-password`
      };
      success();
      await auth.forgotPassword(body);
    } catch (err) {
      const { status } = err.request;
      let description;
      switch (status) {
        case 404:
          description = "Email not found";
          break;

        default:
          description = "Something's wrong. Please try again later.";
          break;
      }
      notification.error({
        message: "Error",
        description,
        icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
        style: {
          backgroundColor: "#FFF1F0",
          borderRadius: "10px"
        }
      });
    }
  };

  const onFinishFailed = () => {
    notification.error({
      message: "Error",
      description: "Something went wrong, please try again",
      icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
      style: {
        backgroundColor: "#FFF1F0",
        borderRadius: "10px"
      }
    });
  };

  return (
    <div className="forgot-password-layout">
      <Card className="forgot-password-card">
        <Row className="lock-image-container">
          <Image src="/img/lock.png" preview={false} height="100px" />
        </Row>
        <Typography.Text>
          Enter your email and we will send you a link to reset your password.
        </Typography.Text>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item name="email">
            <Input className="round" placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Send mail reset password</Button>
          </Form.Item>
        </Form>

        <Typography.Text>OR</Typography.Text>
        <Row>
          <Typography.Text>
            <Link to="/register">Create your account</Link>
          </Typography.Text>
        </Row>
        <Row>
          <Button onClick={handleOnClickBackButton}>Back to login</Button>
        </Row>
      </Card>
    </div>
  );
}
