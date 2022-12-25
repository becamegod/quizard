import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, notification, Row, Tabs } from "antd";
import React, { useState } from "react";
import GroupList from "./GroupList";
import Groups from "../../api/groups";
import "./index.css";

export default function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();
  const [reload, setReload] = useState(0);

  const createGroup = () => {
    setShowCreateModal(true);
  };

  const submitForm = () => {
    form.submit();
    setShowCreateModal(false);
  };

  const onFinish = async (values) => {
    try {
      const res = await Groups.create(values);
      console.log(res);
      if (res.status === 201)
        notification.success({ message: "Group created successfully" });
      setReload(reload + 1);
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
      <Row justify="end" style={{ marginBottom: "32px" }}>
        <Col>
          <Button
            shape="round"
            icon={<PlusOutlined />}
            size="large"
            onClick={createGroup}
          >
            Create Group
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Tabs
            className="content-holder"
            tabBarStyle={{
              background: "rgba(255, 255, 255, 0.40)",
              borderRadius: "10px",
              padding: "10px",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold"
            }}
            tabPosition="left"
            defaultActiveKey="1"
            // key={reload}
            items={[
              {
                key: "1",
                label: "All Groups",
                children: <GroupList category="all" key={reload} />
              },
              {
                key: "2",
                label: "My Groups",
                children: <GroupList category="owned" key={reload} />
              },
              {
                key: "3",
                label: "Joined Groups",
                children: <GroupList category="joined" key={reload} />
              }
            ]}
          />
        </Col>
      </Row>
    </>
  );
}
