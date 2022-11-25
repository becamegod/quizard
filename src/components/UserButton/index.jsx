import React from "react";
import { Image, Dropdown } from "antd";
import "./UserButton.css";
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
    <Dropdown
      menu={{ items }}
      placement="bottom"
      arrow
      overlayClassName="overplay"
    >
      {/*
        eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      */}
      <a onClick={(e) => e.preventDefault()}>
        <Image
          width={30}
          height={30}
          src="error"
          fallback="/img/user.png"
          preview={false}
          className="user-avatar"
        />
      </a>
    </Dropdown>
  );
}
