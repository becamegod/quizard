import {
  Button,
  Card,
  Form,
  Input,
  notification,
  Space,
  Typography
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import authService from "../../api/auth";
import RegisterSuccess from "./RegisterSuccess";
import UserInfoForm from "./UserInfoForm";

export default function RegisterForm({ onLogin }) {
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

  // const slider = useRef();

  // return (
  //   <Carousel
  //     speed={300}
  //     on
  //     ref={(ref) => {
  //       slider.current = ref;
  //     }}
  //   >
  //     <Card className="round register-card">
  //         <Title>REGISTER</Title>
  //         <UserInfoForm />
  //       </Card>
  //     <LoginForm onLogin={() => slider.current.next()} />
  //     <RegisterSuccess />
  //   </Carousel>
  // );

  switch (stage) {
    case 1:
      return (
        <Card className="round register-card">
          <Title>REGISTER</Title>
          <UserInfoForm />
        </Card>
      );
    case 3:
      return (
        <Card className="round login-card">
          <RegisterSuccess />
        </Card>
      );
    default:
      return (
        <>
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
            <Form.Item>
              <Content className="login-link-container">
                <Space>
                  <Typography.Text>Already have an account?</Typography.Text>
                  <Button type="link" onClick={onLogin}>
                    Login
                  </Button>
                </Space>
              </Content>
            </Form.Item>
          </Form>
        </>
      );
  }
}

RegisterForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};
