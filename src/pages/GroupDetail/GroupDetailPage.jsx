import { React } from "react";
import { Row, Col, Space } from "antd";
import GroupInfoCard from "../../components/GroupInfoCard";
import DashboardLayout from "../../components/DashboardLayout";
import GroupMemberCard from "../../components/GroupMemberCard";
import "./GroupDetailPage.css";

export default function GroupDetailPage() {
  return (
    <DashboardLayout>
      <Row justify="center">
        <Col span={18}>
          <Space direction="vertical" size={32} style={{ width: "100%" }}>
            <GroupInfoCard />
            <GroupMemberCard />
          </Space>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
