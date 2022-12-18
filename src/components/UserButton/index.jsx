import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    label: <Link to="/profile">Profile</Link>,
    icon: <UserOutlined />
  },
  {
    key: "2",
    label: <Link to="/logout">Logout</Link>,
    icon: <LogoutOutlined />
  }
];

export default function UserButton() {
  // const user = localStorage.getItem("user");
  // const { name } = JSON.parse(user);
  const name = "Test";

  return (
    // more gap between the button and the dropdown menu using antd
    <Space>
      <Typography.Text>{name}</Typography.Text>
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <Avatar icon={<UserOutlined />} src="" />
      </Dropdown>
    </Space>
  );
}
