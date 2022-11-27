import { ExclamationCircleOutlined } from "@ant-design/icons";
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
import Link from "antd/lib/typography/Link";
import Title from "antd/lib/typography/Title";
import React from "react";
import auth from "../../services/auth";
// import InputButton from "../Button";
import SocialIcon from "../SocialIcon";

export default function LoginForm() {
  // const [openModal, setOpenModal] = useState(false);

  // const alert = openModal ? (
  //   <Alert
  //     className="round login-alert"
  //     message="Login failed"
  //     description="Email or password incorrect."
  //     type="error"
  //     showIcon
  //   />
  // ) : null;

  const onFinish = async (values) => {
    try {
      const res = await auth.login(values);
      console.log("Success: ", res);
      notification.success({
        message: "Login succeed"
      });
    } catch (err) {
      console.log("Error: ", err);
      notification.error({
        message: "Login failed",
        description: "Email or password incorrect.",
        icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
        style: {
          backgroundColor: "#FFF1F0",
          borderRadius: "10px"
        }
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {/* {alert} */}
      <Card className="round login-card">
        <Title>LOGIN</Title>
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
                <Link href="/register">Register</Link>
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
            {/* <InputButton label="Login" className="login-btn" /> */}
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
    </>
  );
}
