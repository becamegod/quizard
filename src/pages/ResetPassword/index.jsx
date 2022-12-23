import {
  Card,
  Form,
  Input,
  notification,
  Button,
  Typography,
  Modal
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Link from "../../api/InviteLinks";
import auth from "../../api/auth";
import "./index.css";

export default function ResetPassword() {
  const { url } = useParams();
  const [link, setLink] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();
  const handleOnClickBackButton = () => {
    navigate("/");
  };
  const success = () => {
    Modal.success({
      title: "Reset password",
      content:
        "Please check your email. We have sent an email to reeet your password",
      onOk: () => handleOnClickBackButton()
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Link.checkLink(url);
        console.log(res);
        setLink(res.data);
      } catch (err) {
        setIsExpired(true);
      }
    }
    fetchData();
  }, []);
  const onFinish = async (values) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        notification.error({
          message: "Error",
          description: "Password and confirm password does not match",
          icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
          style: {
            backgroundColor: "#FFF1F0",
            borderRadius: "10px"
          }
        });
      }
      success();
      await auth.resetPassword(link.toEmail, values.newPassword, link.url);
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Error",
        description: "Something went wrong please try againt",
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
  if (isExpired || (link && link.status === "Invalid")) {
    return (
      <div className="reset-password-layout">
        <Typography.Title level={2}>
          This page is not available
        </Typography.Title>
      </div>
    );
  }
  return (
    <div className="reset-password-layout">
      <Card className="reset-password-card">
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item name="newPassword">
            <Input
              className="round"
              placeholder="New password"
              type="password"
              required
            />
          </Form.Item>
          <Form.Item name="confirmPassword">
            <Input
              className="round"
              placeholder="Confirm password"
              type="password"
              required
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Change password</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
