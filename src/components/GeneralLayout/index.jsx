import { Col, Layout, Row } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./GeneralLayout.css";

const { Header, Content } = Layout;

export default function GeneralLayout() {
  return (
    <Layout
      style={{
        background: "none"
        // "linear-gradient(135deg, rgba(0, 131, 204, 1) 0%, rgba(0, 255, 209, 1) 100%)"
      }}
    >
      <Header style={{ background: "none", padding: "0px" }}>
        <NavBar />
      </Header>
      <Content style={{ marginTop: "64px" }}>
        <Row justify="center">
          <Col span={18}>
            <Outlet />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
