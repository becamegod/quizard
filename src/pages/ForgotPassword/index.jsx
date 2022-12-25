import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Card,
  Form,
  Image,
  Input,
  Modal,
  notification,
  Row,
  Space,
  Typography
} from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../api/auth";
import ExpandRow from "../../components/UI/ExpandRow";
import MyButton from "../../components/UI/MyButton";
import constants from "../../utils/constants";
import reuseables from "../../utils/reuseables";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const handleOnClickBackButton = () => {
    navigate("/");
  };

  const success = () => {
    Modal.success({
      title: "Reset password",
      content:
        "Please check your email. We have sent an email to reset your password",
      onOk: () => handleOnClickBackButton()
    });
  };

  const onFinish = async (values) => {
    try {
      const body = {
        ...values,
        link: `${constants.baseUrl}/reset-password`
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
    <div className="center-base">
      <Card>
        <Row className="lock-image-container" style={{ height: "100px" }}>
          <Image src="/img/forgotPassword.png" preview={false} height="100%" />
        </Row>
        <Row justify="center">
          <Title>Forgot password</Title>
        </Row>
        <Space direction="vertical">
          <Typography.Text>
            Enter your email and we will send you a link to reset your password.
          </Typography.Text>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item name="email" rules={reuseables.emailRule}>
              <Input className="round" placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item>
              <ExpandRow gutter={0}>
                <MyButton onClick={handleOnClickBackButton}>
                  Back to login
                </MyButton>
                <MyButton primary submit>
                  Send mail reset password
                </MyButton>
              </ExpandRow>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
