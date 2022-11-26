import React from "react";
import { Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
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
  return (
    // more gap between the button and the dropdown menu using antd
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <Avatar icon={<UserOutlined />} src="" />
    </Dropdown>
  );
}
