import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tabs } from "antd";
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import GroupList from "../components/GroupList";
import groups from "../services/groups";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();

  const createGroup = () => {
    setShowCreateModal(true);
  };

  const submitForm = () => {
    form.submit();
    setShowCreateModal(false);
  };

  const onFinish = async (values) => {
    try {
      console.log("Values: ", values);
      const res = await groups.create(values);
      console.log("Response: ", res);
    } catch (error) {
      console.log("Error: ", error);
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
      <DashboardLayout>
        <Row justify="end" style={{ marginBottom: "32px" }}>
          <Col>
            <Button
              type="info"
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
              items={[
                {
                  key: "1",
                  label: "All Groups",
                  children: <GroupList category="all" />
                },
                {
                  key: "2",
                  label: "My Groups",
                  children: <GroupList category="owned" />
                },
                {
                  key: "3",
                  label: "Joined Groups",
                  children: <GroupList category="joined" />
                }
              ]}
            />
          </Col>
        </Row>
      </DashboardLayout>
    </>
  );
}
