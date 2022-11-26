import React from "react";
import { Image, Row, Col, Input, Space } from "antd";
import "./NavBar.css";
import { SearchOutlined } from "@ant-design/icons";
import UserButton from "../UserButton";
import NotificationButton from "../NotificationButton";

function search(e) {
  console.log(e.target.value);
}

export default function NavBar() {
  return (
    <nav className="navbar">
      <Row align="middle" justify="space-around">
        <Col>
          <Image preview={false} height={50} src="/logo/quizardLogo.png" />
        </Col>
        <Col span={5} align="left">
          <Input
            className="search"
            placeholder="Search"
            allowClear
            prefix={<SearchOutlined className="search-icon" />}
            onPressEnter={search}
          />
        </Col>
        <Col align="right">
          <Space direction="horizontal" size={32}>
            <NotificationButton />
            <UserButton />
          </Space>
        </Col>
      </Row>
    </nav>
  );
}
