import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { React } from "react";
import ExpandRow from "../../components/UI/ExpandRow";
import MyButton from "../../components/UI/MyButton";

export default function AccountForm({ onLogin, onFinish }) {
  const onFinishFailed = (errorInfo) => {
    throw new Error(errorInfo);
  };

  return (
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
        <ExpandRow>
          <MyButton onClick={onLogin}>Back to login</MyButton>
          <MyButton primary submit>
            Next
          </MyButton>
        </ExpandRow>
        {/* <Row gutter={10}>
          <Col span={12}>
            <MyButton onClick={onLogin}>Back to login</MyButton>
          </Col>
          <Col span={12}>
            <MyButton primary submit>
              Next
            </MyButton>
          </Col>
        </Row> */}
        {/* <Content className="register-container">
          <MyButton primary submit>
            Continue
          </MyButton>
        </Content> */}
      </Form.Item>
    </Form>
  );
}

AccountForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired
};
