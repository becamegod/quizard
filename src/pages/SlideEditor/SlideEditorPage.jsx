import React, { useState, useEffect } from "react";
import { Button, Col, Input, Row, Spin } from "antd";
import {
  ArrowLeftOutlined,
  CaretRightOutlined,
  PlusOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import "./SlideEditorPage.css";
import ListSlide from "../../components/ListSlide";
import ChoiceCard from "../../components/ChoiceCard";
import ChartScreen from "../../components/ChartScreen";
import Presentation from "../../api/presentations";

export default function SlideEditorPage() {
  const { presentationId } = useParams();
  const [presentation, setPresentation] = useState(null);
  const [selectedSlide, setSelectedSlide] = useState(null);

  async function fetchData() {
    try {
      return Presentation.detail(presentationId);
    } catch (err) {
      throw new Error(err);
    }
  }

  useEffect(() => {
    fetchData().then((res) => {
      setPresentation((prev) => {
        return {
          ...prev,
          ...res.data.presentation
        };
      });
      setSelectedSlide(res.data.presentation.slides[0]);
    });
  }, []);

  const navigate = useNavigate();

  const handleSelectedSlide = (slide) => {
    setSelectedSlide(slide);
  };

  const handleChangeOption = () => {
    const newPresentation = presentation;
    newPresentation.slides.forEach((slide, index) => {
      if (slide.question === selectedSlide.question) {
        newPresentation.slides[index] = selectedSlide;
      }
    });
    setSelectedSlide(selectedSlide);
    setPresentation(newPresentation);
  };
  console.log(selectedSlide);

  const handleOnClickBackButton = () => navigate(-1);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "red" }} spin />
  );
  if (presentation) {
    return (
      <>
        <Row className="slide-editor-header">
          <div style={{ width: "28%" }}>
            <ArrowLeftOutlined
              className="button-back"
              onClick={handleOnClickBackButton}
            />
            <Input
              className="input-name-presentation"
              defaultValue={presentation.name}
            />
          </div>
          <div>
            <Button className="button-new-slide" type="primary">
              <PlusOutlined />
              New Slide
            </Button>
            <Button className="button-present" type="primary">
              <CaretRightOutlined />
              Present
            </Button>
          </div>
        </Row>
        <Row className="slide-editor-container">
          <Col className="list-slide-container" span={4}>
            <ListSlide
              presentation={presentation}
              handleSelectedSlide={handleSelectedSlide}
            />
          </Col>
          <Col className="chart-screen" span={12}>
            <ChartScreen selectedSlide={selectedSlide} />
          </Col>
          <Col className="choice-container" span={7}>
            <ChoiceCard
              selectedSlide={selectedSlide}
              handleChangeOption={handleChangeOption}
            />
          </Col>
        </Row>
      </>
    );
  }
  return <Spin indicator={antIcon} />;
}
