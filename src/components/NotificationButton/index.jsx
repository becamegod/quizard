import React from "react";
import { Dropdown } from "antd";
import { BellFilled } from "@ant-design/icons";

const items = [
  {
    key: "1",
    label: "Notification 1"
  },
  {
    key: "2",
    label: "Notification 2"
  }
];

export default function UserButton() {
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <BellFilled
        style={{
          fontSize: "20px",
          color: "#ffffff"
        }}
      />
    </Dropdown>
  );
}
