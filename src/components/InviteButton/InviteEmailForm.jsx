import { Button, Form, Input, notification } from "antd";
import React from "react";
import PropTypes from "prop-types";
import inviteLink from "../../api/InviteLinks";

export default function InviteEmailForm({ link }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await inviteLink.sendToEmail(values.email, link);
      form.setFieldsValue({ email: "" });
      notification.success({
        message: `An invitation sent to ${values.email}`
      });
    } catch (error) {
      notification.error({
        message: "Something's wrong. Please try again later."
      });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} size="large">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Button
        type="primary"
        size="large"
        className="round login-btn"
        htmlType="submit"
      >
        Invite
      </Button>
    </Form>
  );
}

InviteEmailForm.propTypes = {
  link: PropTypes.string.isRequired
};
