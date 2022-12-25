import { Col, Row, Space } from "antd";
import { React } from "react";
import GroupInfoCard from "./GroupInfoCard";
import GroupMemberCard from "./GroupMemberCard";
import "./index.css";

export default function GroupDetailPage() {
  return (
    <Row justify="center">
      <Col span={18}>
        <Space direction="vertical" size={32} style={{ width: "100%" }}>
          <GroupInfoCard />
          <GroupMemberCard />
        </Space>
      </Col>
    </Row>
  );
}
