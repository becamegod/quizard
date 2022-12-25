import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { React } from "react";

import ExpandRow from "../../components/UI/ExpandRow";
import MyButton from "../../components/UI/MyButton";
import reuseables from "../../utils/reuseables";

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
        name="email"
        validateTrigger="onBlur"
        rules={reuseables.emailRule}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
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
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
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
              return Promise.reject(
                Error("The two passwords that you entered do not match!")
              );
            }
          })
        ]}
      >
        <Input.Password placeholder="Confirm password" />
      </Form.Item>
      <Form.Item>
        <ExpandRow>
          <MyButton onClick={onLogin}>Back to login</MyButton>
          <MyButton primary submit>
            Next
          </MyButton>
        </ExpandRow>
      </Form.Item>
    </Form>
  );
}

AccountForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired
};
