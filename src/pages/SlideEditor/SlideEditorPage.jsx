import React from "react";
import { Col, Input, Row } from "antd";
import "./SlideEditorPage.css";
import ListSlide from "../../components/ListSlide";
import ChoiceCard from "../../components/ChoiceCard";
import ChartScreen from "../../components/ChartScreen";

export default function SlideEditorPage() {
  return (
    <>
      <Row className="slide-editor-header">
        <Input className="round" />
      </Row>
      <Row className="slide-editor-container">
        <Col className="list-slide-container" span={3}>
          <ListSlide />
        </Col>
        <Col className="chart-screen" span={13}>
          <ChartScreen />
        </Col>
        <Col className="choice-container" span={7}>
          <ChoiceCard />
        </Col>
      </Row>
    </>
  );
}
