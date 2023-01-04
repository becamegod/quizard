import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space, Typography } from "antd";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Users from "../../api/Users";
import notifier from "../../utils/notifier";

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
  const [name, setName] = useState("...");

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await Users.getProfile();
        setName(data.name);
      } catch {
        notifier.notifyError();
      }
    };
    init();
  });

  return (
    <Space>
      <Typography.Text>{name}</Typography.Text>
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <Avatar icon={<UserOutlined />} src="" />
      </Dropdown>
    </Space>
  );
}
