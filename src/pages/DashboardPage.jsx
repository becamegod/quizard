import React from "react";
import { Space, Tabs, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DashboardLayout from "../components/DashboardLayout";
import GroupList from "../components/GroupList";
import "./DashboardPage.css";

export default function RegisterPage() {
  const { TabPane } = Tabs;
  const createGroup = () => {
    console.log("Create group");
  };

  return (
    <DashboardLayout>
      <Space direction="vertical" size={24}>
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
              <GroupList />
            </TabPane>
            <TabPane tab="Owned" key="2">
              <GroupList />
            </TabPane>
            <TabPane tab="Joined" key="3">
              <GroupList />
            </TabPane>
          </Tabs>
        </Row>
      </Space>
    </DashboardLayout>
  );
}
