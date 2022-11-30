import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Space } from "antd";
import GroupInfoCard from "../components/GroupInfoCard";
import DashboardLayout from "../components/DashboardLayout";
import GroupMemberCard from "../components/GroupMemberCard";

export default function GroupDetailPage() {
  const { groupId } = useParams();
  useEffect(() => {
    console.log(groupId);
  }, [groupId]);
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
