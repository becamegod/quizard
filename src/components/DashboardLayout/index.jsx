import React from "react";
import { Layout, Row, Col } from "antd";
import NavBar from "../NavBar";
// eslint-disable-next-line no-unused-vars
const { Header, Footer, Sider, Content } = Layout;

// eslint-disable-next-line react/prop-types
export default function DashboardLayout({ children }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Layout style={{ background: "none" }}>
        <Header style={{ background: "none", padding: "0px" }}>
          <NavBar />
        </Header>
        <Content style={{ marginTop: "64px" }}>
          <Row justify="center">
            <Col span={18}> {children} </Col>
          </Row>
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </>
  );
}
