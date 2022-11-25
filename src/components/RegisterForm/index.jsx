import { Card, Form, Input, Button, Select, DatePicker, Alert } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React from "react";
import authService from "../../services/auth";

export default function RegisterForm() {
  const [finish, setFinish] = React.useState(false);
  const [error, setError] = React.useState("");
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: ""
  });

  const alert =
    error !== "" ? (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        className="round alert"
      />
    ) : null;

  const onFinish = (values) => {
    console.log("Success:", values);
    setUser({ ...user, ...values });
    if (finish) {
      console.log("registering...", user);
      authService
        .register(user)
        .then((res) => {
          console.log("res ", res);
          localStorage.setItem("user", res.user);
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          setError(err.message);
          console.log("err ", err);
          setFinish(false);
        });
      return;
    }
    setFinish(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (finish) {
    return (
      <Card className="round">
        {alert}
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
                    return Promise.reject("Date of birth must be in the past!");
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
  }
  return (
    <Card className="round">
      {alert}
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
