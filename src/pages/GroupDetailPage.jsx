import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import GroupInfoCard from "../components/GroupInfoCard";
import DashboardLayout from "../components/DashboardLayout";

export default function GroupDetailPage() {
  const { groupId } = useParams();
  useEffect(() => {
    console.log(groupId);
  }, [groupId]);
  return (
    <DashboardLayout>
      <Row justify="center">
        <Col span={24}>
          <GroupInfoCard />
        </Col>
      </Row>
    </DashboardLayout>
  );
}
