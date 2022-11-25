import React from "react";
import { Image, Row, Col, Input } from "antd";
import "./NavBar.css";
import { SearchOutlined } from "@ant-design/icons";
import UserButton from "../UserButton";

function search(e) {
  console.log(e.target.value);
}

export default function NavBar() {
  return (
    <nav className="navbar">
      <Row align="middle" justify="space-around">
        <Col span={3}>
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
        <Col span={8} align="right">
          <UserButton />
        </Col>
      </Row>
    </nav>
  );
}
