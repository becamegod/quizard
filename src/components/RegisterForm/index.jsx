import {
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  notification,
  Row,
  Typography
  // Col
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import { React, useState, useEffect } from "react";
import moment from "moment";
import authService from "../../api/auth";

export default function RegisterForm() {
  const [stage, setStage] = useState(0);
  const [user, setUser] = useState({});
  const onFinish = (values) => {
    const dob = moment(values.dob).format("DD-MM-YYYY");
    setUser({ ...user, ...values, dob });
    setStage(stage + 1);
  };
  const onFinishFailed = (errorInfo) => {
    throw new Error(errorInfo);
  };

  useEffect(() => {
    if (stage === 2) {
      authService
        .register(user)
        .then(() => {
          // if (res.status === 201) {
          //   notification.success({
          //     message: "Register Success",
          //     description: "Please check your email to verify your account"
          //   });
          // }
          setStage(stage + 1);
        })
        .catch((err) => {
          notification.error({
            message: "Register Failed",
            description: err.response.data.message || "Unknown Error"
          });
          setStage(0);
        });
    }
  }, [stage]);

  switch (stage) {
    case 1:
      return (
        <Card className="round register-card">
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
                  message: "Please input your name!"
                },
                {
                  max: 200,
                  message: "Name must be less than 200 characters long!"
                }
              ]}
            >
              <Input className="round" />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please select your gender!"
                }
              ]}
            >
              <Select
                className="round input-field"
                style={{ width: "100%", borderRadius: "5px" }}
                options={[
                  {
                    value: "Male",
                    label: "Male"
                  },
                  {
                    value: "Female",
                    label: "Female"
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Date of birth"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!"
                },
                () => ({
                  validator(rule, value) {
                    if (value && value.isAfter(new Date())) {
                      // eslint-disable-next-line prefer-promise-reject-errors
                      return Promise.reject(
                        "Date of birth must be in the past!"
                      );
                    }
                    return Promise.resolve();
                  }
                })
              ]}
            >
              <DatePicker className="round input-field" value={new Date()} />
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
    case 3:
      return (
        <Card className="round register-card">
          <Row justify="center">
            <CheckCircleOutlined
              style={{
                fontSize: "64px",
                color: "#7ED957"
              }}
            />
          </Row>
          <Row justify="center">
            <Typography.Title level={3}>Register Successfully</Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Title level={5}>
              Please check your email to verify your account
            </Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Text>
              Did not receive mail?
              <Button type="link">Resend it</Button>
            </Typography.Text>
          </Row>
        </Card>
      );
    default:
      return (
        <Card className="round register-card">
          <Title>REGISTER</Title>
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
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
            <Form.Item
              label="Password"
              name="password"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  min: 8,
                  max: 16,
                  message: "Password must be between 8 and 16 characters long!"
                }
              ]}
            >
              <Input.Password className="round" />
            </Form.Item>
            <Form.Item
              label="Confirm password"
              name="confirm-password"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  }
                })
              ]}
            >
              <Input.Password className="round" />
            </Form.Item>
            <Form.Item>
              <Content className="register-container">
                <Button
                  htmlType="submit"
                  type="primary"
                  className="round register-btn"
                  size="large"
                >
                  Continue
                </Button>
              </Content>
            </Form.Item>
          </Form>
        </Card>
      );
  }
}
