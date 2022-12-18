import { LoadingOutlined } from "@ant-design/icons";
import { Row, Spin } from "antd";
import React from "react";

export default function Loading() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 72,
        color: "white"
      }}
      spin
    />
  );
  return (
    <Row
      justify="space-evenly"
      align="middle"
      style={{ width: "100%", height: "100%" }}
    >
      <Spin indicator={antIcon} />
    </Row>
  );
}
