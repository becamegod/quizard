import React from "react";
import { Layout, Col, Row } from "antd";
import "./SlideEditorPage.css";
import ListSlide from "../../components/ListSlide";
import NavBar from "../../components/NavBar";
import ChoiceCard from "../../components/ChoiceCard";

const { Header } = Layout;
export default function SlideEditorPage() {
  return (
    <>
      <Header style={{ background: "none", padding: "0px" }}>
        <NavBar />
      </Header>
      <Row className="slide-editor-container">
        <Col className="list-slide-container" span={3}>
          <ListSlide />
        </Col>
        <Col className="main-editor" span={13}></Col>
        <Col className="choice-container" span={7}>
          <ChoiceCard />
        </Col>
      </Row>
    </>
  );
}
