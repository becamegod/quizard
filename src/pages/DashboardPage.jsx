import React from "react";
import { Tabs, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DashboardLayout from "../components/DashboardLayout";
import GroupList from "../components/GroupList";
import "./DashboardPage.css";

export default function DashboardPage() {
  const createGroup = () => {
    console.log("Create group");
  };

  return (
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
  );
}
