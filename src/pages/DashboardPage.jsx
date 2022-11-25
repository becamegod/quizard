import React from "react";
import { Row } from "antd";
import DashboardLayout from "../components/DashboardLayout";
import GroupCard from "../components/GroupCard";

export default function RegisterPage() {
  return (
    <DashboardLayout>
      <Row justify="center">
        <GroupCard />
      </Row>
    </DashboardLayout>
  );
}
