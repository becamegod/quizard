import { Col, ConfigProvider, Image, Row, Space, Tabs } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import constants from "../../utils/constants";
import "./NavBar.css";
import NotificationButton from "./NotificationButton";
import UserButton from "./UserButton";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabItems = [
    {
      label: "Groups",
      key: constants.groupsUrl
    },
    {
      label: "Presentations",
      key: constants.presentationsUrl
    },
    {
      label: "Presentation histories",
      key: constants.presentationHistoryUrl
    }
  ];
  return (
    <nav className="navbar">
      <ConfigProvider
        theme={{
          components: {
            Tabs: { colorText: "white" },
            Typography: { colorText: "white" }
          }
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Link to="/groups">
              <Image preview={false} height={50} src="/logo/quizardLogo.png" />
            </Link>
          </Col>
          {/* <Col span={5} align="left">
          <Input
            className="search"
            placeholder="Search"
            allowClear
            prefix={<SearchOutlined className="search-icon" />}
          />
        </Col> */}
          <Col>
            <Tabs
              size="large"
              defaultActiveKey={location.pathname}
              centered
              items={tabItems}
              onTabClick={(key) => navigate(key)}
            />
          </Col>
          <Col align="right">
            <Space direction="horizontal" size={32}>
              <NotificationButton />
              <UserButton />
            </Space>
          </Col>
        </Row>
      </ConfigProvider>
    </nav>
  );
}
