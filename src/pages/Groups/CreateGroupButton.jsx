import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Modal, notification } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Groups from "../../api/groups";
import MyButton from "../../components/UI/MyButton";

export default function CreateGroupButton({ onCreate }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await Groups.create(values);
      console.log(res);
      if (res.status === 201)
        notification.success({ message: "Group created successfully" });
      onCreate();
    } catch (error) {
      notification.error({
        message: "Group created failed",
        description: "Server error. Please try again later.",
        icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
        style: {
          backgroundColor: "#FFF1F0",
          borderRadius: "10px"
        }
      });
    }
  };

  const submitForm = () => {
    form.submit();
    setShowCreateModal(false);
  };

  const createGroup = () => {
    setShowCreateModal(true);
  };

  return (
    <>
      <Modal
        centered
        title="Create a new group"
        open={showCreateModal}
        onOk={submitForm}
        onCancel={() => setShowCreateModal(false)}
        okText="Create"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <MyButton primary onClick={createGroup} icon={<PlusOutlined />}>
        Create Group
      </MyButton>
    </>
  );
}

CreateGroupButton.propTypes = {
  onCreate: PropTypes.func.isRequired
};
