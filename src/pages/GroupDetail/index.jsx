import { React } from "react";
import { Row, Col, Space } from "antd";
import GroupInfoCard from "./GroupInfoCard";
import DashboardLayout from "../Dashboard";
import GroupMemberCard from "./GroupMemberCard";
import "./index.css";
import PresentationCard from "./PresentationCard";

export default function GroupDetailPage() {
  return (
    <DashboardLayout>
      <Row justify="center">
        <Col span={18}>
          <Space direction="vertical" size={32} style={{ width: "100%" }}>
            <GroupInfoCard />
            <PresentationCard />
            <GroupMemberCard />
          </Space>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
