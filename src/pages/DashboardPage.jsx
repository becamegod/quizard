import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tabs } from "antd";
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import GroupList from "../components/GroupList";
import "./DashboardPage.css";

export default function RegisterPage() {
  const [visible, setVisible] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { TabPane } = Tabs;
  const createGroup = () => {
    setVisible(true);
  };

  return (
    <>
      <Modal
        centered
        title="Create a new group"
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        okText="Create"
      >
        <Form layout="vertical">
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <DashboardLayout>
        <Row justify="end">
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
            >
              <TabPane tab="All Groups" key="1">
                <GroupList category="all" />
              </TabPane>
              <TabPane tab="Owned" key="2">
                <GroupList category="owned" />
              </TabPane>
              <TabPane tab="Joined" key="3">
                <GroupList category="joined" />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </DashboardLayout>
    </>
  );
}
