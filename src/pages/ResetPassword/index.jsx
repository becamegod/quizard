import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Modal, notification, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../api/auth";
import Link from "../../api/InviteLinks";
import Loading from "../../components/Loading";
import MyButton from "../../components/UI/MyButton";
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
      title: "Change password successfully",
      content: "Your password is changed",
      onOk: () => handleOnClickBackButton()
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Link.checkLink(url);
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
    navigate("/404");
    return <Loading />;
  }
  return (
    <div className="reset-password-layout">
      <Card className="reset-password-card">
        <Title level={2}>Enter your new password</Title>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item name="newPassword" className="tight-bottom">
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
          <Row justify="end">
            <Col span={16}>
              <Form.Item>
                <MyButton primary submit>
                  Change password
                </MyButton>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
