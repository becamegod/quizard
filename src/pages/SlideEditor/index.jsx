import {
  ArrowLeftOutlined,
  CaretRightOutlined,
  PlusOutlined,
  SaveOutlined
} from "@ant-design/icons";
import { Button, Col, Input, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import Loading from "../../components/Loading";
import LoadingIcon from "../../components/LoadingIcon";
import notifier from "../../utils/notifier";
import ChartScreen from "./ChartScreen";
import ChoiceCard from "./ChoiceCard";
import "./index.css";
import ListSlide from "./ListSlide";

export default function SlideEditorPage() {
  const { presentationId } = useParams();
  const [presentation, setPresentation] = useState(null);
  const [selectedId, setSelectedId] = useState(0);
  const [chartPart, setChartPart] = useState(<Loading />);

  async function fetchData() {
    try {
      return presentations.detail(presentationId);
    } catch (err) {
      throw new Error(err);
    }
  }

  useEffect(() => {
    if (!presentation) return;
    const getLatestChartData = async () => {
      const { data } = await presentations.getLatestChartData(
        presentationId,
        selectedId
      );
      setChartPart(
        <ChartScreen
          chart={data.chart}
          title={presentation.slides[selectedId].question}
        />
      );
    };
    getLatestChartData();
  }, [selectedId, presentation]);

  useEffect(() => {
    fetchData().then((res) => {
      setPresentation((prev) => {
        return {
          ...prev,
          ...res.data.presentation
        };
      });
    });
  }, []);
  const navigate = useNavigate();

  const handleSelectedSlide = (id) => {
    setSelectedId(id);
  };

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setPresentation({ ...presentation, name: newName });
  };

  const handleChangeOption = (newSlide) => {
    const newSlides = presentation.slides.map((slide) => slide);
    newSlides[selectedId] = newSlide;
    setPresentation({ ...presentation, slides: newSlides });
  };

  const handleDeleteOption = (optionIndex) => {
    const newSlides = presentation.slides.map((slide) => slide);
    newSlides[selectedId].options = presentation.slides[selectedId].options.map(
      (option) => option
    );
    newSlides[selectedId].options.splice(optionIndex, 1);
    setPresentation({ ...presentation, slides: newSlides });
  };

  const handleOnClickBackButton = () => navigate(-1);

  const onPresent = async () => {
    try {
      await presentations.live(presentation);
      navigate(`/host/${presentationId}`);
    } catch (error) {
      console.log(error);
      notifier.notifyError();
    }
  };

  const handleOnClickAddSlideButton = () => {
    const newSlide = {
      type: "Multiplechoice",
      question: "",
      options: [""],
      header: "",
      content: ""
    };
    const newSlides = presentation.slides.map((slide) => slide);
    newSlides.push(newSlide);
    setPresentation({ ...presentation, slides: newSlides });
  };

  const handleOnClickSaveButton = async () => {
    try {
      await presentations.save(presentation);
      notification.success({
        message: "Save succeed"
      });
    } catch (err) {
      notification.error({
        message: "Something went wrong, please try again"
      });
      throw new Error(err);
    }
  };

  const handleOnClickDeleteSlideButton = (index) => {
    const id = parseInt(index.key.split(" ")[1], 10);

    const newSlides = presentation.slides.map((slide) => slide);
    newSlides.splice(id, 1);
    if (selectedId === id) {
      const newSelectedId = selectedId - 1;
      setSelectedId(newSelectedId);
    }
    if (id === 0 && newSlides.length > 0) {
      setSelectedId(0);
    }
    if (selectedId === newSlides.length) {
      const newSelectedId = selectedId - 1;
      setSelectedId(newSelectedId);
    }
    setPresentation({ ...presentation, slides: newSlides });
  };

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
              className="input-name-presentation round"
              defaultValue={presentation.name}
              style={{ fontSize: "20px" }}
              onChange={(e) => handleChangeName(e)}
            />
          </div>
          <div>
            <Button
              className="button-new-slide"
              type="primary"
              onClick={handleOnClickAddSlideButton}
            >
              <PlusOutlined />
              New Slide
            </Button>
            <Button
              className="button-save"
              type="primary"
              onClick={handleOnClickSaveButton}
            >
              <SaveOutlined />
              Save
            </Button>
            <Button
              className="button-present"
              type="primary"
              onClick={onPresent}
            >
              <CaretRightOutlined />
              Present
            </Button>
          </div>
        </Row>
        <Row className="slide-editor-container">
          <Col className="list-slide-container" span={4}>
            <ListSlide
              presentation={presentation}
              selectedId={selectedId}
              handleSelectedSlide={handleSelectedSlide}
              handleOnClickDeleteSlideButton={handleOnClickDeleteSlideButton}
            />
          </Col>
          <Col className="chart-screen" span={12}>
            {chartPart}
          </Col>
          <Col className="choice-container" span={8}>
            <ChoiceCard
              presentation={presentation}
              selectedSlide={presentation.slides[selectedId]}
              handleChangeOption={handleChangeOption}
              handleDeleteOption={handleDeleteOption}
            />
          </Col>
        </Row>
      </>
    );
  }
  return <LoadingIcon />;
}
